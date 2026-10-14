/**
 * @fileoverview The chat prompt a `/learn` item opens with: clicking a course
 * starts a new chat that extracts the course page, summarizes it and invites
 * questions about it, through the `/?q=` deep link the chat provider sends.
 */
import type { PlaylistItem } from 'education-playlists';

/** The message a new chat about `item` opens with. */
export function coursePrompt(item: Pick<PlaylistItem, 'title' | 'url'>): string {
  return [
    `Extract this course page and summarize it: ${item.url}`,
    `Course: ${item.title}`,
    'Give a summary of what it covers (topics, lectures, prerequisites and materials), then suggest a few questions I could ask about it and answer my follow-up questions.',
  ].join('\n');
}

/** The `/?q=` deep link that opens a chat about `item` and sends `coursePrompt`. */
export function courseChatHref(item: Pick<PlaylistItem, 'title' | 'url'>): string {
  return `/?q=${encodeURIComponent(coursePrompt(item))}`;
}
