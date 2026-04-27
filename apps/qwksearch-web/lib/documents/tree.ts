import type { Document } from "@/lib/database/schema"

export interface DocumentNode {
  id: string
  name: string
  children?: DocumentNode[]
  data: Document
}

export interface HeadingOutline {
  level: 1 | 2 | 3
  text: string
  id: string
}

// Convert flat document list to tree structure
export function buildDocumentTree(documents: Document[]): DocumentNode[] {
  const nodeMap = new Map<number, DocumentNode>()
  const rootNodes: DocumentNode[] = []

  // Create nodes
  documents.forEach((doc) => {
    // Use title field from document, fallback to 'Untitled'
    const displayName = doc.title || (doc as any).name || 'Untitled'
    nodeMap.set(doc.id, {
      id: doc.id.toString(),
      name: displayName,
      children: doc.isFolder ? [] : undefined,
      data: doc,
    })
  })

  // Build tree
  documents.forEach((doc) => {
    const node = nodeMap.get(doc.id)!
    if (doc.parentId === null) {
      rootNodes.push(node)
    } else {
      const parent = nodeMap.get(doc.parentId)
      if (parent && parent.children) {
        parent.children.push(node)
      }
    }
  })

  return rootNodes
}

// Extract h1-h3 headings from document content
export function extractHeadings(document: Document): HeadingOutline[] {
  const headings: HeadingOutline[] = []

  // Add document-level metadata as h1
  if (document.summary) {
    headings.push({
      level: 1,
      text: document.summary,
      id: "summary",
    })
  }

  // Add citation as h2
  if (document.cite) {
    headings.push({
      level: 2,
      text: document.cite,
      id: "cite",
    })
  }

  // Add content sections as h3
  if (document.content) {
    headings.push({
      level: 3,
      text: "Content",
      id: "content",
    })
  }

  if (document.html) {
    headings.push({
      level: 3,
      text: "HTML Preview",
      id: "html",
    })
  }

  if (document.url) {
    headings.push({
      level: 3,
      text: "Source URL",
      id: "url",
    })
  }

  return headings
}

// Search documents
export function searchDocuments(documents: Document[], searchTerm: string): Document[] {
  if (!searchTerm.trim()) return documents

  const term = searchTerm.toLowerCase()
  return documents.filter(
    (doc) =>
      ((doc as any).name?.toLowerCase().includes(term) || doc.title?.toLowerCase().includes(term)) ||
      doc.summary?.toLowerCase().includes(term) ||
      doc.author?.toLowerCase().includes(term) ||
      doc.content?.toLowerCase().includes(term),
  )
}
