/**
 * @fileoverview Tests for the CORS allowlist wrapper used by the public
 * agent API routes. The allowlist is baked in at module load from
 * NODE_ENV, so under vitest (NODE_ENV=test) the localhost dev origins
 * are part of it alongside the debate-ai.com production origins.
 */
import { describe, it, expect, vi } from 'vitest'
import { withCors, corsPreflight } from '../cors'

const ALLOWED = 'https://debate-ai.com'
const ALLOWED_WWW = 'https://www.debate-ai.com'
const DENIED = 'https://evil.example.com'

/** A request carrying (or omitting) an Origin header. */
function request(origin?: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers)
  if (origin) headers.set('origin', origin)
  return new Request('http://localhost/api/agent/search', { ...init, headers })
}

describe('withCors', () => {
  it('adds the allow-origin header for an allowlisted origin', async () => {
    const handler = withCors(async () => Response.json({ ok: true }))

    const res = await handler(request(ALLOWED))

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ALLOWED)
    expect(res.headers.get('Vary')).toContain('Origin')
  })

  it('allows the www variant of the production origin', async () => {
    const handler = withCors(async () => Response.json({ ok: true }))

    const res = await handler(request(ALLOWED_WWW))

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ALLOWED_WWW)
  })

  it('allows the localhost dev origins outside production', async () => {
    const handler = withCors(async () => Response.json({ ok: true }))

    const res = await handler(request('http://localhost:3000'))

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('http://localhost:3000')
  })

  it('returns the handler response untouched for an origin off the list', async () => {
    const original = Response.json({ ok: true })
    const handler = withCors(async () => original)

    const res = await handler(request(DENIED))

    expect(res).toBe(original)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })

  it('passes same-origin requests (no Origin header) straight through', async () => {
    const original = Response.json({ ok: true })
    const handler = withCors(async () => original)

    const res = await handler(request())

    expect(res).toBe(original)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })

  it('tolerates a minimal request mock with no headers property', async () => {
    const original = Response.json({ ok: true })
    const handler = withCors(async () => original)

    const res = await handler({ url: 'http://localhost/api/agent/search' } as unknown as Request)

    expect(res).toBe(original)
  })

  it('preserves status, statusText and the handler body', async () => {
    const handler = withCors(async () =>
      new Response('rate limited', { status: 429, statusText: 'Too Many Requests' }),
    )

    const res = await handler(request(ALLOWED))

    expect(res.status).toBe(429)
    expect(res.statusText).toBe('Too Many Requests')
    expect(await res.text()).toBe('rate limited')
  })

  it('keeps the headers the handler already set', async () => {
    const handler = withCors(async () =>
      new Response('data: hi\n\n', { headers: { 'Content-Type': 'text/event-stream' } }),
    )

    const res = await handler(request(ALLOWED))

    expect(res.headers.get('Content-Type')).toBe('text/event-stream')
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ALLOWED)
  })

  it('appends to a Vary header the handler already set instead of replacing it', async () => {
    const handler = withCors(async () =>
      new Response(null, { headers: { Vary: 'Accept-Encoding' } }),
    )

    const res = await handler(request(ALLOWED))

    const vary = res.headers.get('Vary') ?? ''
    expect(vary).toContain('Accept-Encoding')
    expect(vary).toContain('Origin')
  })

  it('forwards the request and extra route args to the wrapped handler', async () => {
    const inner = vi.fn(async () => Response.json({ ok: true }))
    const handler = withCors(inner)
    const req = request(ALLOWED)
    const ctx = { params: Promise.resolve({ id: 'abc' }) }

    await handler(req, ctx)

    expect(inner).toHaveBeenCalledWith(req, ctx)
  })

  it('supports a synchronous handler', async () => {
    const handler = withCors(() => Response.json({ ok: true }))

    const res = await handler(request(ALLOWED))

    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ALLOWED)
  })

  it('lets a handler rejection propagate', async () => {
    const handler = withCors(async () => {
      throw new Error('boom')
    })

    await expect(handler(request(ALLOWED))).rejects.toThrow('boom')
  })
})

describe('corsPreflight', () => {
  it('answers an allowlisted preflight with the permitted methods and headers', () => {
    const res = corsPreflight(request(ALLOWED, { method: 'OPTIONS' }))

    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe(ALLOWED)
    expect(res.headers.get('Access-Control-Allow-Methods')).toBe('GET, POST, OPTIONS')
    expect(res.headers.get('Access-Control-Allow-Headers')).toBe('Content-Type, Authorization')
    expect(res.headers.get('Vary')).toBe('Origin')
  })

  it('answers a non-allowlisted preflight with a bare 204', () => {
    const res = corsPreflight(request(DENIED, { method: 'OPTIONS' }))

    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
    expect(res.headers.get('Access-Control-Allow-Methods')).toBeNull()
  })

  it('answers a preflight with no Origin header with a bare 204', () => {
    const res = corsPreflight(request(undefined, { method: 'OPTIONS' }))

    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBeNull()
  })
})
