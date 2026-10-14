/**
 * @fileoverview Route tests for Google Drive folder sync: the folder browser
 * used by settings, the folder-tree walk behind the file tree, and the content
 * route the viewers load files from. Drive itself is a mocked `fetch`.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'

const cookieStore = {
  get: vi.fn(),
  set: vi.fn(),
}

vi.mock('next/headers', () => ({ cookies: vi.fn(async () => cookieStore) }))
vi.mock('@/lib/config/env', () => ({
  getEnv: vi.fn((key: string) => ({ GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 'secret' })[key]),
}))

import { GET as FOLDERS } from '../folders/route'
import { GET as FOLDER_TREE } from '../folder-tree/route'
import { GET as CONTENT } from '../content/route'
import { listFolderTree, servedFormat } from '@/lib/integrations/googleDrive'

const FOLDER = 'application/vnd.google-apps.folder'

function withCookies(values: Record<string, string>) {
  cookieStore.get.mockImplementation((name: string) =>
    values[name] === undefined ? undefined : { value: values[name] },
  )
}

function request(path: string) {
  const url = new URL(`http://localhost/api/doc/google-docs/${path}`)
  return { nextUrl: url, url: url.toString() } as any
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })

/** A fake Drive: metadata by ID, children by parent ID, file bytes by ID. */
function fakeDrive({
  items,
  bytes = {},
}: {
  items: Array<{ id: string; name: string; mimeType: string; parents?: string[] }>
  bytes?: Record<string, string>
}) {
  const calls: string[] = []
  const fetchMock = vi.fn(async (input: string, init?: RequestInit) => {
    const url = new URL(input)
    calls.push(url.pathname + url.search)
    const auth = (init?.headers as Record<string, string>)?.Authorization
    if (auth === 'Bearer expired') return json({ error: 'expired' }, 401)
    if (url.hostname === 'oauth2.googleapis.com') return json({ access_token: 'fresh' })

    const exportMatch = url.pathname.match(/\/files\/([^/]+)\/export$/)
    if (exportMatch) return new Response(`exported ${exportMatch[1]} as ${url.searchParams.get('mimeType')}`)

    const fileMatch = url.pathname.match(/\/files\/([^/]+)$/)
    if (fileMatch) {
      const id = decodeURIComponent(fileMatch[1])
      if (url.searchParams.get('alt') === 'media') return new Response(bytes[id] ?? '', { headers: { 'content-length': String((bytes[id] ?? '').length) } })
      const item = id === 'root' ? { id: 'root-id', name: 'Drive', mimeType: FOLDER } : items.find((i) => i.id === id)
      return item ? json(item) : json({ error: 'not found' }, 404)
    }

    // files.list: answer `'a' in parents or 'b' in parents`.
    const q = url.searchParams.get('q') ?? ''
    const parents = [...q.matchAll(/'([^']+)' in parents/g)].map((m) => m[1])
    const foldersOnly = q.includes(`mimeType = '${FOLDER}'`)
    const files = items.filter(
      (i) => i.parents?.some((p) => parents.includes(p)) && (!foldersOnly || i.mimeType === FOLDER),
    )
    return json({ files })
  })
  vi.stubGlobal('fetch', fetchMock)
  return { fetchMock, calls }
}

beforeEach(() => {
  vi.clearAllMocks()
  withCookies({ google_access_token: 'at', google_refresh_token: 'rt' })
})

describe('GET /api/doc/google-docs/folders', () => {
  it('401s before Drive is connected', async () => {
    withCookies({})
    const res = await FOLDERS(request('folders'))
    expect(res.status).toBe(401)
    expect((await res.json()).needsReauth).toBe(true)
  })

  it('lists the subfolders of My Drive by default', async () => {
    fakeDrive({
      items: [
        { id: 'A', name: 'Alpha', mimeType: FOLDER, parents: ['root-id', 'root'] },
        { id: 'f', name: 'file.pdf', mimeType: 'application/pdf', parents: ['root'] },
      ],
    })

    const body = await (await FOLDERS(request('folders'))).json()

    expect(body.folder).toEqual({ id: 'root', name: 'My Drive' })
    expect(body.folders).toEqual([{ id: 'A', name: 'Alpha' }])
  })

  it('rejects a link to a file rather than a folder', async () => {
    fakeDrive({ items: [{ id: 'f12345', name: 'x.pdf', mimeType: 'application/pdf' }] })
    const res = await FOLDERS(request('folders?parentId=f12345'))
    expect(res.status).toBe(400)
  })

  it('rejects IDs that could break out of the Drive query', async () => {
    const res = await FOLDERS(request(`folders?parentId=${encodeURIComponent("x' or '1'='1")}`))
    expect(res.status).toBe(400)
  })

  it('refreshes an expired token once and stores the new one', async () => {
    withCookies({ google_access_token: 'expired', google_refresh_token: 'rt' })
    const { fetchMock } = fakeDrive({ items: [{ id: 'A', name: 'A', mimeType: FOLDER, parents: ['root'] }] })

    const res = await FOLDERS(request('folders'))

    expect(res.status).toBe(200)
    expect(fetchMock.mock.calls.some(([url]) => String(url).startsWith('https://oauth2.googleapis.com'))).toBe(true)
    expect(cookieStore.set).toHaveBeenCalledWith('google_access_token', 'fresh', expect.any(Object))
  })

  it('says folder access is missing when Drive answers with a scope error', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => json({ error: { message: 'Request had insufficient authentication scopes.' } }, 403)))
    const res = await FOLDERS(request('folders'))
    expect(res.status).toBe(403)
    expect((await res.json()).needsFolderAccess).toBe(true)
  })
})

describe('GET /api/doc/google-docs/folder-tree', () => {
  const items = [
    { id: 'S', name: 'Sources', mimeType: FOLDER, parents: ['R'] },
    { id: 'd', name: 'Notes', mimeType: 'application/vnd.google-apps.document', parents: ['R'] },
    { id: 'p', name: 'paper.pdf', mimeType: 'application/pdf', parents: ['S'] },
    { id: 'R', name: 'Research', mimeType: FOLDER, parents: ['root'] },
  ]

  it('requires a folder ID', async () => {
    expect((await FOLDER_TREE(request('folder-tree'))).status).toBe(400)
  })

  it('walks every level beneath the synced folder', async () => {
    fakeDrive({ items })
    const body = await (await FOLDER_TREE(request('folder-tree?folderId=R'))).json()

    expect(body.success).toBe(true)
    expect(body.root).toMatchObject({ id: 'R', name: 'Research' })
    expect(body.items.map((i: { id: string }) => i.id).sort()).toEqual(['S', 'd', 'p'])
    expect(body.truncated).toBe(false)
  })

  it('404s for a folder the account cannot see', async () => {
    fakeDrive({ items })
    expect((await FOLDER_TREE(request('folder-tree?folderId=gone'))).status).toBe(404)
  })
})

describe('listFolderTree', () => {
  it('asks about many folders in one query per level', async () => {
    const level1 = Array.from({ length: 5 }, (_, i) => ({ id: `F${i}`, name: `F${i}`, mimeType: FOLDER, parents: ['R'] }))
    const level2 = level1.map((f) => ({ id: `${f.id}x`, name: 'x.png', mimeType: 'image/png', parents: [f.id] }))
    const { calls } = fakeDrive({ items: [{ id: 'R', name: 'R', mimeType: FOLDER }, ...level1, ...level2] })

    const tree = await listFolderTree('R', { token: 'at', refreshed: false })

    expect(tree.items).toHaveLength(10)
    // One listing for the root's children and one for all five subfolders
    // together; the images two levels down are not folders, so the walk ends.
    expect(calls.filter((c) => c.startsWith('/drive/v3/files?'))).toHaveLength(2)
  })

  it('stops at maxItems and reports the walk as truncated', async () => {
    const many = Array.from({ length: 12 }, (_, i) => ({ id: `f${i}`, name: `${i}`, mimeType: 'image/png', parents: ['R'] }))
    fakeDrive({ items: [{ id: 'R', name: 'R', mimeType: FOLDER }, ...many] })

    const tree = await listFolderTree('R', { token: 'at', refreshed: false }, { maxItems: 5 })

    expect(tree.items).toHaveLength(5)
    expect(tree.truncated).toBe(true)
  })
})

describe('GET /api/doc/google-docs/content', () => {
  const items = [
    { id: 'pdf1', name: 'paper.pdf', mimeType: 'application/pdf' },
    { id: 'img1', name: 'chart.png', mimeType: 'image/png' },
    { id: 'doc1', name: 'Notes', mimeType: 'application/vnd.google-apps.document' },
    { id: 'sheet1', name: 'Budget', mimeType: 'application/vnd.google-apps.spreadsheet' },
    { id: 'form1', name: 'Survey', mimeType: 'application/vnd.google-apps.form' },
  ]

  it('streams a PDF with its type, inline, sandboxed', async () => {
    fakeDrive({ items, bytes: { pdf1: '%PDF-1.7 fake' } })
    const res = await CONTENT(request('content?fileId=pdf1'))

    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toBe('application/pdf')
    expect(res.headers.get('content-security-policy')).toMatch(/^sandbox;/)
    expect(res.headers.get('x-content-type-options')).toBe('nosniff')
    expect(res.headers.get('content-disposition')).toContain("inline; filename*=UTF-8''paper.pdf")
    expect(await res.text()).toBe('%PDF-1.7 fake')
  })

  it('serves images as they are', async () => {
    fakeDrive({ items, bytes: { img1: 'PNGDATA' } })
    const res = await CONTENT(request('content?fileId=img1'))
    expect(res.headers.get('content-type')).toBe('image/png')
    expect(await res.text()).toBe('PNGDATA')
  })

  it('exports a Google Doc as HTML and a Sheet as PDF', async () => {
    fakeDrive({ items })
    const doc = await CONTENT(request('content?fileId=doc1'))
    expect(doc.headers.get('content-type')).toBe('text/html; charset=utf-8')
    expect(await doc.text()).toBe('exported doc1 as text/html')

    const sheet = await CONTENT(request('content?fileId=sheet1'))
    expect(sheet.headers.get('content-type')).toBe('application/pdf')
    expect(await sheet.text()).toBe('exported sheet1 as application/pdf')
  })

  it('415s for Google types with no preview', async () => {
    fakeDrive({ items })
    expect((await CONTENT(request('content?fileId=form1'))).status).toBe(415)
  })

  it('never serves the root folder', async () => {
    expect((await CONTENT(request('content?fileId=root'))).status).toBe(400)
  })
})

describe('servedFormat', () => {
  it('maps Drive types to what the viewers load', () => {
    expect(servedFormat('application/vnd.google-apps.presentation')).toEqual({
      exportMime: 'application/pdf',
      contentType: 'application/pdf',
    })
    expect(servedFormat('application/vnd.google-apps.drawing')?.exportMime).toBe('image/png')
    expect(servedFormat('application/vnd.google-apps.shortcut')).toBeNull()
    expect(servedFormat('')).toEqual({ contentType: 'application/octet-stream' })
  })
})
