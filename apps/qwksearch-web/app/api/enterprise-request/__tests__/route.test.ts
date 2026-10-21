/**
 * @fileoverview Route tests for the public enterprise request form: bad input
 * is refused before anything is stored, and a request is saved even when the
 * notification email can't be sent.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@/lib/database', () => ({ getDB: vi.fn() }))
vi.mock('@/lib/cloudflare/context', () => ({ getCloudflareContext: vi.fn() }))

import { getDB } from '@/lib/database'
import { getCloudflareContext } from '@/lib/cloudflare/context'
import { createFakeDb, type FakeDb } from '../../__tests__/helpers/fake-db'
import { POST } from '../route'

const mockGetDB = getDB as unknown as ReturnType<typeof vi.fn>
const mockGetCloudflareContext = getCloudflareContext as unknown as ReturnType<typeof vi.fn>

const send = vi.fn().mockResolvedValue({ id: 'email-1' })

const VALID = {
  name: 'Jane Doe',
  email: 'Jane@Company.com',
  businessType: 'saas',
  teamSize: '11-50',
  message: 'We need <b>white-label</b> search.',
  consent: true,
}

function setup(env: Record<string, unknown> = { EMAIL: { send } }): FakeDb {
  const db = createFakeDb({ insert: [{ id: 7 }] })
  mockGetDB.mockReturnValue(db)
  mockGetCloudflareContext.mockReturnValue({ env, cf: undefined, ctx: null })
  return db
}

const post = (body: unknown) =>
  POST(
    new Request('http://localhost/api/enterprise-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }) as any,
  )

beforeEach(() => {
  vi.clearAllMocks()
})

describe('POST /api/enterprise-request', () => {
  it('stores the request and emails the team', async () => {
    const db = setup()

    const res = await post(VALID)

    expect(res.status).toBe(201)
    expect(db.calls.values[0][0]).toMatchObject({
      name: 'Jane Doe',
      email: 'jane@company.com',
      businessType: 'saas',
      teamSize: '11-50',
      status: 'sent',
    })
    expect(send).toHaveBeenCalledTimes(1)
    const message = send.mock.calls[0][0]
    expect(message.subject).toContain('Jane Doe')
    expect(message.subject).toContain('SaaS Company')
    // User text is escaped before it goes into the email body.
    expect(message.html).toContain('&lt;b&gt;white-label&lt;/b&gt;')
    expect(db.calls.update).toBeUndefined()
  })

  it('keeps the request and marks it failed when the email cannot be sent', async () => {
    const db = setup({})

    const res = await post(VALID)

    expect(res.status).toBe(201)
    expect(db.calls.values).toHaveLength(1)
    expect(db.calls.set[0][0]).toEqual({ status: 'failed' })
  })

  it.each([
    ['a missing name', { name: '' }],
    ['an invalid email', { email: 'not-an-email' }],
    ['an unknown business type', { businessType: 'bank' }],
    ['an unknown team size', { teamSize: '5' }],
    ['no consent', { consent: false }],
    ['an overlong message', { message: 'x'.repeat(5001) }],
  ])('400s for %s without storing anything', async (_label, override) => {
    const db = setup()

    const res = await post({ ...VALID, ...override })

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBeTruthy()
    expect(db.calls.insert).toBeUndefined()
  })

  it('400s for a body that is not JSON', async () => {
    setup()
    expect((await post('nope')).status).toBe(400)
  })
})
