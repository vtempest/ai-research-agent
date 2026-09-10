/**
 * QwkSearch implementation of the LobeHub search service.
 *
 * Phase 1.2 of the LobeHub packages migration plan: the engine's web-browsing
 * tool searches through QwkSearch's own fan-out (`search-web-api`, 100+ engines
 * across 13 categories, ranked by `domain-rank`) instead of a single upstream
 * provider.
 *
 * The fan-out lives on Worker A (`apps/qwksearch-web`) at
 * `GET /api/agent/search`, so this impl is a thin HTTP client. Configure it with:
 *
 *   SEARCH_PROVIDERS=qwksearch
 *   QWKSEARCH_SEARCH_URL=https://qwksearch.com/api/agent/search   # optional
 *
 * The endpoint takes one category per request, so multiple `searchCategories`
 * fan out in parallel and merge here, deduplicated by URL.
 *
 * Every knob the requests carry — the endpoint, the categories, the language,
 * safe search, the recency filter and the result cap — is resolved by
 * `./searchSettings`, which layers defaults under the environment under the
 * user's preferences under this call's own arguments. This file only turns the
 * resolved value into HTTP.
 */
import {
  type SearchParams,
  type UniformSearchResponse,
  type UniformSearchResult,
} from '@lobechat/types';
import { TRPCError } from '@trpc/server';
import debug from 'debug';

import { type SearchServiceImpl } from '../type';
import {
  resolveSearchSettings,
  searchOverridesFromParams,
  type SearchSettings,
  type UserSearchOverrides,
} from './searchSettings';
import { type QwkSearchResponse, type QwkSearchResult } from './type';

const log = debug('lobe-search:QwkSearch');

export { normalizeCategories } from './searchSettings';

const hostnameOf = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
};

const toUniformResult = (item: QwkSearchResult, category: string): UniformSearchResult => ({
  category: item.category || category,
  content: item.content || item.snippet || '',
  engines: item.engines?.length ? item.engines : item.source ? [item.source] : ['qwksearch'],
  iframeSrc: item.iframe_src || undefined,
  imgSrc: item.img_src || undefined,
  parsedUrl: item.domain || hostnameOf(item.url),
  publishedDate: item.date || undefined,
  score: typeof item.score === 'number' ? item.score : 0,
  thumbnail: item.thumbnail || item.thumbnail_src || undefined,
  title: item.title,
  url: item.url,
});

/**
 * Merge per-category result lists, keeping the highest-scoring copy of each URL
 * and unioning the engines that produced it.
 */
export const mergeResults = (lists: UniformSearchResult[][]): UniformSearchResult[] => {
  const byUrl = new Map<string, UniformSearchResult>();

  for (const list of lists) {
    for (const result of list) {
      if (!result.url) continue;

      const existing = byUrl.get(result.url);
      if (!existing) {
        byUrl.set(result.url, { ...result, engines: [...result.engines] });
        continue;
      }

      existing.engines = [...new Set([...existing.engines, ...result.engines])];
      if (result.score > existing.score) {
        existing.score = result.score;
      }
      // Prefer whichever copy actually carries a snippet.
      if (!existing.content && result.content) {
        existing.content = result.content;
      }
    }
  }

  return [...byUrl.values()].sort((a, b) => b.score - a.score);
};

export class QwkSearchImpl implements SearchServiceImpl {
  /**
   * QwkSearch picks engines per category from its own registry, so explicit
   * engine restrictions are never forwarded and must not trigger a retry.
   */
  readonly useAutoSearchEngineSelection = true;

  /**
   * The signed-in user's preferences, if the caller has them.
   *
   * Nothing constructs the impl with them yet — that is the storage step of
   * migration to-do § 2.2, the search-side mirror of extraction's 1.6. Until
   * then every deployment resolves to defaults under the environment, exactly
   * as before, and the seam is here for that step to fill.
   */
  constructor(private readonly overrides: UserSearchOverrides = {}) {}

  /**
   * Resolved per query, not per instance: `SearchService` holds one impl for
   * the lifetime of the process, and reading the environment lazily is what
   * lets a test set `QWKSEARCH_SEARCH_URL` after construction.
   */
  private settingsFor(params: SearchParams): SearchSettings {
    return resolveSearchSettings(
      process.env as Record<string, string | undefined>,
      this.overrides,
      searchOverridesFromParams(params),
    );
  }

  private buildUrl(query: string, category: string, settings: SearchSettings): URL {
    const url = new URL(settings.endpoint);
    url.searchParams.set('q', query);
    url.searchParams.set('cat', category);
    url.searchParams.set('lang', settings.language);

    if (settings.timeRange) url.searchParams.set('recency', settings.timeRange);
    // Both are read by the endpoint as `=== 'true'`, so send them only when on
    // rather than spelling out the default in every request.
    if (settings.safeSearch) url.searchParams.set('safesearch', 'true');
    if (settings.publicInstances) url.searchParams.set('publicInstances', 'true');

    return url;
  }

  private async queryCategory(
    query: string,
    category: string,
    settings: SearchSettings,
  ): Promise<UniformSearchResult[]> {
    const url = this.buildUrl(query, category, settings);
    const headers: Record<string, string> = { Accept: 'application/json' };
    if (settings.apiKey) headers['Authorization'] = `Bearer ${settings.apiKey}`;

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      throw new Error(
        `QwkSearch search failed for category "${category}" (${response.status}): ${body.slice(0, 200)}`,
      );
    }

    const data = (await response.json().catch(() => null)) as QwkSearchResponse | null;

    if (data?.error) {
      throw new Error(`QwkSearch search failed for category "${category}": ${data.error}`);
    }

    return (data?.results ?? [])
      .filter((item) => !!item?.url && !!item?.title)
      .map((item) => toUniformResult(item, category));
  }

  async query(query: string, params: SearchParams = {}): Promise<UniformSearchResponse> {
    const settings = this.settingsFor(params);
    const categories = settings.categories;
    log('querying %o across categories %o', query, categories);

    const startAt = Date.now();

    let lists: UniformSearchResult[][];
    try {
      lists = await Promise.all(
        categories.map((category) => this.queryCategory(query, category, settings)),
      );
    } catch (error) {
      console.error('[QwkSearchImpl] query failed', error);

      throw new TRPCError({
        code: 'SERVICE_UNAVAILABLE',
        message: (error as Error).message || 'QwkSearch search failed',
      });
    }

    const merged = mergeResults(lists);
    // Capped after the merge, so the cap counts distinct URLs rather than
    // per-category rows, and always keeps the highest-scoring ones.
    const results = settings.resultLimit ? merged.slice(0, settings.resultLimit) : merged;
    log('got %d results in %dms', results.length, Date.now() - startAt);

    return {
      costTime: Date.now() - startAt,
      query,
      resultNumbers: results.length,
      results,
    };
  }
}
