import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('search-web-api/search/search-query-executor.js', () => ({
  Search: vi.fn(),
}));

import { Search } from 'search-web-api/search/search-query-executor.js';
import { MergedSearchEngine } from '../merged-engine';
import type { MergedResult } from 'search-web-api/types/search-result-types';

const mockSearch = Search as unknown as ReturnType<typeof vi.fn>;

function result(title: string, url: string): MergedResult {
  return {
    title,
    url,
    content: title,
    engines: [],
    positions: [],
    score: 0,
    priority: 'normal',
  };
}

function stubSearch(results: MergedResult[] = [result('a result', 'https://example.com')]) {
  mockSearch.mockImplementation(function () {
    return { search: vi.fn().mockResolvedValue(results) };
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  stubSearch();
});

describe('MergedSearchEngine', () => {
  it('runs a query through the pipeline and returns merged results', async () => {
    const search = vi.fn().mockResolvedValue([result('hello', 'https://example.com/hello')]);
    mockSearch.mockImplementation(function () {
      return { search };
    });

    const engine = new MergedSearchEngine();
    const results = await engine.search('hello world');

    expect(search).toHaveBeenCalledWith('hello world', 1);
    expect(results).toEqual([result('hello', 'https://example.com/hello')]);
  });

  it('passes engine names and categories to the search source', async () => {
    const search = vi.fn().mockResolvedValue([]);
    mockSearch.mockImplementation(function () {
      return { search };
    });

    const engine = new MergedSearchEngine();
    await engine.search('query', {
      engineNames: ['google', 'brave'],
      categories: ['news'],
      pageno: 2,
    });

    expect(search).toHaveBeenCalledWith('query', 2, ['google', 'brave'], ['news']);
  });

  it('supports an injected search source', async () => {
    const injected = { search: vi.fn().mockResolvedValue([result('injected', 'https://example.com/injected')]) };
    const engine = new MergedSearchEngine({ searchSource: injected as any });
    const results = await engine.search('x');

    expect(injected.search).toHaveBeenCalledWith('x', 1);
    expect(results).toEqual([result('injected', 'https://example.com/injected')]);
  });

  it('returns an empty array when the source returns nothing', async () => {
    mockSearch.mockImplementation(function () {
      return { search: vi.fn().mockResolvedValue([]) };
    });

    const engine = new MergedSearchEngine();
    const results = await engine.search('nothing');

    expect(results).toEqual([]);
  });

  it('validates the pipeline configuration', () => {
    const engine = new MergedSearchEngine();
    const validation = engine.validate();
    expect(validation.valid).toBe(true);
    expect(validation.errors).toEqual([]);
  });
});
