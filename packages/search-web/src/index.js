import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { searchWeb } from './search.js';
import { CATEGORY_LIST, SEARX_DOMAINS, SOURCE_LIST } from './constants.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-API-Key'],
}));

// Error handler
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({
    error: 'Internal Server Error',
    message: err.message,
    code: 'INTERNAL_ERROR'
  }, 500);
});

// Health check endpoint
app.get('/api/v1/health', async (c) => {
  const searxngUrl = 'http://localhost:8080';

  try {
    const startTime = Date.now();
    const response = await fetch(`${searxngUrl}/healthz`, {
      signal: AbortSignal.timeout(5000)
    });
    const responseTime = Date.now() - startTime;

    const isHealthy = response.ok;

    return c.json({
      status: isHealthy ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      searxng: {
        status: isHealthy ? 'up' : 'down',
        url: searxngUrl,
        response_time: responseTime
      }
    }, isHealthy ? 200 : 503);
  } catch (error) {
    return c.json({
      status: 'down',
      timestamp: new Date().toISOString(),
      error: error.message
    }, 503);
  }
});

// Get available categories
app.get('/api/v1/search/categories', (c) => {
  return c.json({
    categories: CATEGORY_LIST
  });
});

// Get available search engines
app.get('/api/v1/search/engines', (c) => {
  return c.json({
    engines: SOURCE_LIST.map(([name, shortcut, description]) => ({
      name,
      shortcut,
      description
    }))
  });
});

// Main search endpoint
app.get('/api/v1/search', async (c) => {
  const query = c.req.query('q');

  if (!query) {
    return c.json({
      error: 'Missing required parameter',
      message: 'Query parameter "q" is required',
      code: 'MISSING_QUERY'
    }, 400);
  }

  if (query.length > 500) {
    return c.json({
      error: 'Query too long',
      message: 'Query must be less than 500 characters',
      code: 'QUERY_TOO_LONG'
    }, 400);
  }

  // Parse and validate parameters
  const category = c.req.query('category') || 'general';
  const recency = c.req.query('recency') || undefined;
  const page = parseInt(c.req.query('page') || '1', 10);
  const safesearch = c.req.query('safesearch') === 'true';
  const lang = c.req.query('lang') || 'en-US';
  const format = c.req.query('format') || 'json';

  // Validate category
  if (!CATEGORY_LIST.includes(category)) {
    return c.json({
      error: 'Invalid category specified',
      message: `Category must be one of: ${CATEGORY_LIST.join(', ')}`,
      code: 'INVALID_CATEGORY'
    }, 400);
  }

  // Validate recency
  const RECENCY_ALLOWED = ['day', 'week', 'month', 'year'];
  if (recency && !RECENCY_ALLOWED.includes(recency)) {
    return c.json({
      error: 'Invalid recency parameter',
      message: `Recency must be one of: ${RECENCY_ALLOWED.join(', ')}`,
      code: 'INVALID_RECENCY'
    }, 400);
  }

  // Validate page
  if (page < 1 || page > 100) {
    return c.json({
      error: 'Invalid page number',
      message: 'Page must be between 1 and 100',
      code: 'INVALID_PAGE'
    }, 400);
  }

  // Validate language format
  const langRegex = /^[a-z]{2}-[A-Z]{2}$/;
  if (!langRegex.test(lang)) {
    return c.json({
      error: 'Invalid language format',
      message: 'Language must be in format: en-US, fr-FR, etc.',
      code: 'INVALID_LANGUAGE'
    }, 400);
  }

  try {
    const startTime = Date.now();

    // Get SearXNG URL from environment or use default
    const privateSearxng = process.env.SEARXNG_URL || 'http://localhost:8080';

    const results = await searchWeb(query, {
      category,
      recency,
      privateSearxng,
      page,
      safesearch,
      lang,
      maxRetries: 3
    });

    const searchTime = (Date.now() - startTime) / 1000;

    // Handle error responses
    if (results.error) {
      return c.json({
        error: 'Search failed',
        message: results.error,
        code: 'SEARCH_ERROR'
      }, 502);
    }

    // Extract metadata from results
    const uniqueEngines = results.results
      ? [...new Set(results.results.flatMap(r => r.engines || []))]
      : [];

    const response = {
      query,
      page,
      results: results.results || results,
      suggestions: results.suggestions || [],
      infoboxes: results.infoboxes || [],
      metadata: {
        total_results: results.results?.length || results.length || 0,
        search_time: searchTime,
        engines_used: uniqueEngines
      }
    };

    return c.json(response);
  } catch (error) {
    console.error('Search error:', error);

    if (error.name === 'AbortError') {
      return c.json({
        error: 'Request timeout',
        message: 'Search request took too long to complete',
        code: 'TIMEOUT'
      }, 504);
    }

    return c.json({
      error: 'Search service error',
      message: error.message,
      code: 'SERVICE_ERROR'
    }, 500);
  }
});

// Root endpoint
app.get('/', (c) => {
  return c.json({
    name: 'SearXNG API Wrapper',
    version: '1.0.0',
    description: 'Hono-based API wrapper for SearXNG metasearch engine',
    endpoints: {
      health: '/api/v1/health',
      search: '/api/v1/search?q={query}',
      categories: '/api/v1/search/categories',
      engines: '/api/v1/search/engines'
    },
    documentation: '/openapi.yaml'
  });
});

// Serve OpenAPI spec
app.get('/openapi.yaml', async (c) => {
  try {
    const fs = await import('fs/promises');
    const yaml = await fs.readFile('./openapi.yaml', 'utf-8');
    c.header('Content-Type', 'application/x-yaml');
    return c.text(yaml);
  } catch (error) {
    return c.json({
      error: 'OpenAPI spec not found',
      message: error.message
    }, 404);
  }
});

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    code: 'NOT_FOUND'
  }, 404);
});

const port = parseInt(process.env.PORT || '3000', 10);

console.log(`🚀 Server starting on http://localhost:${port}`);
console.log(`📖 API Documentation: http://localhost:${port}/openapi.yaml`);

serve({
  fetch: app.fetch,
  port
});
