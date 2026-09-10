# trending-news-api

[![Coverage](https://codecov.io/gh/OpenSourceAGI/qwksearch-research-agent/graph/badge.svg?component=package-trending-news-api)](https://codecov.io/gh/OpenSourceAGI/qwksearch-research-agent)

React trending news widget: daily top Wikipedia pages (via the Wikimedia Pageviews API) matched
against headlines from [The News API](https://www.thenewsapi.com/), served through a bundled
Cloudflare Worker so the News API key never reaches the browser.

## Features

- Daily trending topics, ranked by Wikipedia pageviews.
- Matching headlines per topic from The News API.
- Article thumbnail images, shown alongside headlines (toggle off with `showImages={false}`).
- Single-topic headline lookup.
- Compact card row or full article-list layouts.
- `localStorage` response caching (10 minutes).
- Runs as a standalone Cloudflare Worker, or from a route your own app already serves.
- TypeScript + tsup library scaffold.

## Install

```bash
npm install trending-news-api
```

## Usage

```tsx
import { TrendingNews } from 'trending-news-api';

export default function App() {
  return (
    <TrendingNews
      compact
      maxTopics={8}
      apiEndpoint="https://trending-news-api.your-subdomain.workers.dev"
    />
  );
}
```

Pass `topic` to render headlines for a single topic instead of the daily trending list:

```tsx
<TrendingNews apiEndpoint="https://trending-news-api.your-subdomain.workers.dev" topic="Donald Trump" />
```

`apiEndpoint` may be a full URL or a path on the current origin (`/api/news/trending`), so a host
app that serves the data itself doesn't have to hardcode its own domain.

The widget renders nothing when `apiEndpoint` is unset, still loading, or errored — safe to drop
into a layout unconditionally.

## Direct API usage

```ts
import { getTrendingNews, getTrendingNewsForTopic } from 'trending-news-api';

const trending = await getTrendingNews({
  apiEndpoint: 'https://trending-news-api.your-subdomain.workers.dev',
});

const topicNews = await getTrendingNewsForTopic('Donald Trump', {
  apiEndpoint: 'https://trending-news-api.your-subdomain.workers.dev',
});
```

## Build

```bash
npm install
npm run build
```

## The worker backend

`worker/index.ts` is a Cloudflare Worker that:

- Fetches yesterday's top Wikipedia pages by pageviews (Wikimedia REST API), filtering out
  non-article pages (`Main_Page`, `Special:`, `Wikipedia:`, etc).
- For each page, searches The News API for matching headlines.
- Exposes:
  - `GET /` — trending topics with headline counts and articles (`?limit=` topics, default 25,
    capped at 50).
  - `GET /?topic=...` — headlines for a specific topic.

Topics with no matching headlines are dropped, so it looks at up to twice as many Wikipedia
entries as topics requested and stops once the quota is filled. Searches run five at a time.

### Deploying the worker

```bash
cd packages/trending-news-api
npm run worker:deploy
npx wrangler secret put THENEWSAPI_API_KEY --config worker/wrangler.jsonc
```

Use the resulting `*.workers.dev` URL (or a custom route) as `apiEndpoint`.

### Serving it from your own app instead

`trending-news-api/server` is the same request handler the worker runs, with no React and no DOM
in it, so an app that already has a backend can serve the widget from one of its own routes and
skip the second deployment. QwkSearch does this at `/api/news/trending` — see
`apps/qwksearch-web/lib/news/trending.ts`.

```ts
// e.g. app/api/news/trending/route.ts
import { handleTrendingNewsRequest } from 'trending-news-api/server';

export const GET = (request: Request) =>
  handleTrendingNewsRequest(request, { apiKey: process.env.THENEWSAPI_API_KEY });
```

The individual steps are exported too, for a route that wants to cache or reshape the data:
`getTrendingTopics({ apiKey, limit, date })`, `getTopicHeadlines(topic, { apiKey })`,
`fetchWikipediaTopPages(date, limit)` and `searchNewsForTopic(apiKey, query, limit)`. Each takes an
optional `fetchImpl` so it can be tested without network access.

## Caching

`getTrendingNews` / `getTrendingNewsForTopic` cache each response in `localStorage` for 10
minutes, keyed by the exact request URL (which includes `limit`). Call
`clearTrendingNewsCache()` to evict everything (e.g. in tests). The cache is a no-op in non-browser environments (SSR) or when `localStorage`
is unavailable/full.

## Notes

- Wikimedia's Pageviews API powers the trending topic list.
- The News API (thenewsapi.com) powers the headlines — you'll need a free or paid API key.
