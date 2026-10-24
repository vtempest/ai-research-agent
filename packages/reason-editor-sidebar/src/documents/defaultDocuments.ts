/**
 * @module defaultDocuments
 * @description Provides the seed document list used to pre-populate the editor
 * in a fresh environment with example content, folders, and nested notes.
 */
import type { Document } from "./DocumentTree";

/** Builds a table from a header row and body rows of plain-text cells. */
function table(header: string[], rows: string[][]): string {
  const cells = (tag: "th" | "td", row: string[]) =>
    `<tr>${row.map((cell) => `<${tag}><p>${cell}</p></${tag}>`).join("")}</tr>`;
  return `<table><tbody>${cells("th", header)}${rows.map((row) => cells("td", row)).join("")}</tbody></table>`;
}

/** Builds a checklist; each item is `[text, checked]`. */
function tasks(items: [string, boolean][]): string {
  return `<ul data-type="taskList">${items
    .map(
      ([text, checked]) =>
        `<li data-type="taskItem" data-checked="${checked}"><p>${text}</p></li>`,
    )
    .join("")}</ul>`;
}

/** Builds a bullet list from inline-HTML items. */
function bullets(items: string[]): string {
  return `<ul>${items.map((item) => `<li><p>${item}</p></li>`).join("")}</ul>`;
}

/**
 * Initial set of example documents shown to first-time users.
 * Includes a welcome guide, two folder nodes (Projects, Research), and
 * several child notes that show off headings, lists, checklists, tables,
 * quotes and code blocks.
 */
export const defaultDocuments: Document[] = [
  {
    id: "1",
    title: "Welcome to REASON",
    content: [
      "<h1>Welcome to REASON</h1>",
      "<p>A research notebook for nested documents, rich formatting and AI-assisted writing. Everything in this sidebar is a sample — edit it, rearrange it, or delete it when you are ready to start your own.</p>",
      "<h2>Quick start</h2>",
      tasks([
        ["Open <strong>Competitor Review</strong> in the Research folder to see a finished note", false],
        ["Create a note with the <strong>New Note</strong> button", false],
        ["Right-click a note to add a child note, rename it or tag it", false],
        ["Drag a note onto another one to nest it", false],
        ["Type <code>/</code> on an empty line to insert a table, checklist or code block", false],
      ]),
      "<h2>Keyboard shortcuts</h2>",
      table(
        ["Action", "Shortcut"],
        [
          ["Search all notes", "Ctrl / ⌘ + K"],
          ["Bold · Italic · Underline", "Ctrl / ⌘ + B · I · U"],
          ["Checklist", "Ctrl / ⌘ + Shift + 9"],
          ["Undo · Redo", "Ctrl / ⌘ + Z · Shift + Z"],
        ],
      ),
      "<h2>What's in the box</h2>",
      bullets([
        "<strong>Nested documents</strong> — folders and notes as deep as you need",
        "<strong>Outline view</strong> — every heading in the current note, one click away",
        "<strong>Full-text search</strong> across titles, content and tags",
        "<strong>Tabs and split view</strong> to work on two notes side by side",
        "<strong>Local first</strong> — notes are saved in this browser until you turn on sync",
      ]),
      "<blockquote><p><strong>Tip:</strong> on mobile, tap the menu icon to open the file tree.</p></blockquote>",
    ].join(""),
    parentId: null,
    children: [],
    isExpanded: true,
    tags: ["guide"],
  },
  {
    id: "2",
    title: "Projects",
    content: "",
    parentId: null,
    children: [],
    isExpanded: true,
    isFolder: true,
    tags: [],
  },
  {
    id: "3",
    title: "Website Redesign",
    content: [
      "<h1>Website Redesign</h1>",
      "<p>Project brief for the Q3 refresh of the marketing site. <strong>Owner:</strong> Design team · <strong>Status:</strong> In progress</p>",
      "<h2>Goals</h2>",
      "<ol><li><p>Cut time-to-first-content on the home page below one second</p></li><li><p>Rebuild every page mobile-first</p></li><li><p>Meet WCAG 2.2 AA across the site</p></li></ol>",
      "<h2>Timeline</h2>",
      table(
        ["Phase", "Owner", "Due", "Status"],
        [
          ["Discovery &amp; audit", "Maya", "Jul 12", "✅ Done"],
          ["Wireframes", "Jordan", "Jul 26", "✅ Done"],
          ["Visual design", "Maya", "Aug 16", "🟡 In progress"],
          ["Build &amp; QA", "Sam", "Sep 6", "⚪ Not started"],
          ["Launch", "Everyone", "Sep 13", "⚪ Not started"],
        ],
      ),
      "<h2>Launch checklist</h2>",
      tasks([
        ["Audit current pages and traffic", true],
        ["Approve the new navigation", true],
        ["Finish component library in Figma", false],
        ["Run an accessibility pass with a screen reader", false],
        ["Set up redirects for retired URLs", false],
      ]),
      "<h2>Open questions</h2>",
      bullets([
        "Do we keep the blog on the same domain?",
        "Who signs off on the final copy?",
      ]),
    ].join(""),
    parentId: "2",
    children: [],
    isExpanded: false,
    tags: ["design", "web"],
  },
  {
    id: "4",
    title: "API Integration",
    content: [
      "<h1>API Integration</h1>",
      "<p>Notes on connecting the documents service to the new REST API. All requests need a bearer token in the <code>Authorization</code> header.</p>",
      "<h2>Endpoints</h2>",
      table(
        ["Method", "Path", "Purpose"],
        [
          ["GET", "/api/documents", "List the current user's documents"],
          ["POST", "/api/documents", "Create a document"],
          ["PUT", "/api/documents/:id", "Replace a document's title and content"],
          ["DELETE", "/api/documents/:id", "Move a document to the trash"],
        ],
      ),
      "<h2>Example request</h2>",
      '<pre><code class="language-bash">curl -X POST https://example.com/api/documents \\\n  -H "Authorization: Bearer $TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"title": "Meeting Notes", "content": "&lt;p&gt;Hello&lt;/p&gt;"}\'</code></pre>',
      "<h2>Gotchas</h2>",
      bullets([
        "Rate limit is <strong>60 requests per minute</strong>; back off on <code>429</code>",
        "Timestamps are ISO 8601 in UTC",
        "<code>PUT</code> replaces the whole document — send every field",
      ]),
      "<h2>To do</h2>",
      tasks([
        ["Generate a client from the OpenAPI spec", true],
        ["Handle token refresh", false],
        ["Add retries with exponential backoff", false],
      ]),
    ].join(""),
    parentId: "2",
    children: [],
    isExpanded: false,
    tags: ["development", "api"],
  },
  {
    id: "5",
    title: "Research",
    content: "",
    parentId: null,
    children: [],
    isExpanded: true,
    isFolder: true,
    tags: [],
  },
  {
    id: "6",
    title: "Market Analysis",
    content: [
      "<h1>Market Analysis</h1>",
      "<p>Research findings on the note-taking and knowledge-management market. <em>Figures below are sample data for illustration.</em></p>",
      "<h2>Summary</h2>",
      "<p>Demand is shifting from single-purpose note apps toward <strong>connected workspaces</strong> that combine notes, research and AI assistance. Users increasingly expect their notes to work offline and sync everywhere.</p>",
      "<h2>Segments</h2>",
      table(
        ["Segment", "Who", "What they need"],
        [
          ["Students", "Undergrad and grad researchers", "Citations, PDF import, low price"],
          ["Knowledge workers", "PMs, analysts, consultants", "Templates, sharing, search"],
          ["Developers", "Engineers and technical writers", "Markdown, code blocks, local files"],
          ["Teams", "Small companies and agencies", "Permissions, real-time collaboration"],
        ],
      ),
      "<h2>Key insights</h2>",
      "<ol><li><p><strong>AI is table stakes.</strong> Summaries and rewriting are expected, not a premium add-on.</p></li><li><p><strong>Cloud plus local.</strong> Users want cloud sync but distrust lock-in; export matters.</p></li><li><p><strong>Mobile is for capture.</strong> Most long-form writing still happens on desktop.</p></li></ol>",
      "<blockquote><p>“I don't need another app. I need the notes I already have to be findable.” — interview participant</p></blockquote>",
      "<h2>Next steps</h2>",
      tasks([
        ["Interview five more students", false],
        ["Size the team segment", false],
      ]),
    ].join(""),
    parentId: "5",
    children: [],
    isExpanded: false,
    tags: ["research", "business"],
  },
  {
    id: "7",
    title: "Competitor Review",
    content: [
      "<h1>Competitor Review</h1>",
      "<p>Analysis of competitor products: where each one is strong, where it falls short, and what that means for us.</p>",
      "<h2>Top Competitors</h2>",
      bullets([
        "<strong>Notion</strong> — Versatile but complex. Databases, wikis and docs in one workspace; new users face a steep blank page.",
        "<strong>Obsidian</strong> — Great for developers. Plain Markdown files on disk, a huge plugin ecosystem, and a graph view of linked notes.",
        "<strong>Roam Research</strong> — Powerful linking. Pioneered bidirectional links and block references around a daily-notes workflow.",
      ]),
      "<h2>Side by side</h2>",
      table(
        ["", "Notion", "Obsidian", "Roam Research"],
        [
          ["Best for", "Teams and wikis", "Personal knowledge bases", "Networked thinking"],
          ["Storage", "Cloud", "Local Markdown files", "Cloud"],
          ["Collaboration", "Real-time, built in", "Paid sync, limited sharing", "Shared graphs"],
          ["Learning curve", "Medium", "High", "High"],
          ["Pricing model", "Free tier + paid plans", "Free for personal use + paid add-ons", "Subscription"],
        ],
      ),
      "<h2>Where we can win</h2>",
      bullets([
        "Research built in: search the web and pull <mark>cited sources</mark> straight into a note",
        "Nested documents that feel as simple as folders",
        "AI writing help that works on the note you already have open",
      ]),
      "<h2>Risks</h2>",
      bullets([
        "Notion's templates and integrations are hard to match",
        "Obsidian users value owning their files — we need a clean export",
      ]),
      "<h2>Next steps</h2>",
      tasks([
        ["Sign up for each product and record the onboarding flow", true],
        ["Compare import options from each competitor", false],
        ["Share findings with the product team", false],
      ]),
    ].join(""),
    parentId: "5",
    children: [],
    isExpanded: false,
    tags: ["research", "competition"],
  },
  {
    id: "8",
    title: "Meeting Notes",
    content: [
      "<h1>Meeting Notes</h1>",
      "<p><strong>Weekly team sync</strong> · Attendees: Maya, Jordan, Sam, Priya</p>",
      "<h2>Agenda</h2>",
      "<ol><li><p>Website redesign status</p></li><li><p>API integration blockers</p></li><li><p>Competitor review readout</p></li></ol>",
      "<h2>Decisions</h2>",
      bullets([
        "Visual design review moves to Thursday",
        "We ship the API client before the token-refresh work",
      ]),
      "<h2>Action items</h2>",
      tasks([
        ["<strong>Jordan</strong> — review open PRs by end of day", false],
        ["<strong>Priya</strong> — update the API documentation", false],
        ["<strong>Sam</strong> — schedule next sprint planning", true],
        ["<strong>Maya</strong> — share the competitor review with the team", false],
      ]),
    ].join(""),
    parentId: null,
    children: [],
    isExpanded: false,
    tags: ["meetings"],
  },
];
