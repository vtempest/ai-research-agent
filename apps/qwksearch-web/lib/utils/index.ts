import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import cosineSimilarity from 'compute-cosine-similarity';

type ChatHistoryMessage = {
  content?: unknown;
  role?: string;
  type?: string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimeDifference = (
  date1: Date | string,
  date2: Date | string,
): string => {
  date1 = new Date(date1);
  date2 = new Date(date2);

  const diffInSeconds = Math.floor(
    Math.abs(date2.getTime() - date1.getTime()) / 1000,
  );

  if (diffInSeconds < 60)
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''}`;
  else if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minute${Math.floor(diffInSeconds / 60) !== 1 ? 's' : ''}`;
  else if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) !== 1 ? 's' : ''}`;
  else if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) !== 1 ? 's' : ''}`;
  else
    return `${Math.floor(diffInSeconds / 31536000)} year${Math.floor(diffInSeconds / 31536000) !== 1 ? 's' : ''}`;
};

// Chat history formatting (from utils/formatHistory.ts)
export const formatChatHistoryAsString = (history: ChatHistoryMessage[]) => {
  return history
    .map(
      (message) =>
        `${message.role === 'assistant' || message.type === 'ai' ? 'AI' : 'User'}: ${String(message.content ?? '')}`,
    )
    .join('\n');
};

// Similarity computation (from utils/computeSimilarity.ts)
export const computeSimilarity = (x: number[], y: number[]): number => {
  return cosineSimilarity(x, y) as number;
};
