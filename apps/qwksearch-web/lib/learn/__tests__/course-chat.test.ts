import { describe, it, expect } from 'vitest';
import { coursePrompt, courseChatHref } from '../course-chat';

const item = { title: '6.006 Introduction to Algorithms', url: 'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/' };

describe('course chat', () => {
  it('asks to extract the course URL, summarize it and take questions', () => {
    const prompt = coursePrompt(item);
    expect(prompt).toContain(`Extract this course page and summarize it: ${item.url}`);
    expect(prompt).toContain(item.title);
    expect(prompt).toMatch(/questions/);
  });

  it('carries the prompt in the ?q= deep link', () => {
    const href = courseChatHref(item);
    expect(href.startsWith('/?q=')).toBe(true);
    expect(new URLSearchParams(href.slice(2)).get('q')).toBe(coursePrompt(item));
  });
});
