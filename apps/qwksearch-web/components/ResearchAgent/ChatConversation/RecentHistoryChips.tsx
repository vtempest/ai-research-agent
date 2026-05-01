'use client';

import Link from 'next/link';
import { useHistoryState } from '../ChatHistoryDropdown/useHistoryState';

export default function RecentHistoryChips() {
  const { chats, loading } = useHistoryState();

  if (loading || chats.length === 0) return null;

  const recent = [...chats]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
      {recent.map((chat) => (
        <Link
          key={chat.id}
          href={`/c/${chat.id}`}
          className="px-3 py-1 rounded-full text-xs text-muted-foreground bg-secondary hover:bg-secondary/80 hover:text-foreground transition-colors duration-150 truncate max-w-[160px]"
          title={chat.title}
        >
          {chat.title}
        </Link>
      ))}
    </div>
  );
}
