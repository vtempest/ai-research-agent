'use client';
/**
 * @fileoverview `/learn`: the full-page Education Playlists widget, and the
 * page a playlist's share link (`/learn#playlist=…`) or invite link
 * (`/learn#invite=…`) opens. The widget itself lives in
 * `packages/education-playlists`; this mounts it and, for a signed-in user,
 * points it at `/api/learn/playlists` so their playlists live in the account.
 * Clicking an item starts a new chat that extracts the course page, summarizes
 * it and takes questions about it (`courseChatHref`), rather than leaving for
 * the page; the arrow beside the title still opens the page itself.
 */
import { useRouter } from 'next/navigation';
import { EducationPlaylists } from 'education-playlists';
import { useChat } from 'research-agent-ui';
import { authClient } from '@/lib/auth/client';
import { courseChatHref } from '@/lib/learn/course-chat';

export function LearnView() {
  const { data: session } = authClient.useSession();
  const user = (session as { user?: { id: string; isAnonymous?: boolean | null } } | null)?.user;
  // An anonymous guest session keeps playlists in this browser, as signed-out visitors do.
  const userId = user && !user.isAnonymous ? user.id : undefined;
  const router = useRouter();
  const { newChat } = useChat();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-semibold">Learn</h1>
      <p className="mb-4 text-sm opacity-70">
        Self-paced playlists of free university courses, organized like a college catalog. Check items off as you go,
        save your own, or plan one with AI.
      </p>
      <EducationPlaylists
        planEndpoint="/api/learn"
        playlistsEndpoint="/api/learn/playlists"
        userId={userId}
        importFromHash
        onOpenItem={(item) => {
          // Clear the board first so the prompt lands in a fresh chat, as the
          // spotlight palette's `ask` does.
          newChat();
          router.push(courseChatHref(item));
        }}
        className="rounded-2xl border border-border bg-card"
      />
    </main>
  );
}
