import { describe, expect, it } from 'vitest';

import { prepareJsonBody } from './auth';

const post = (body: string | undefined, contentType = 'application/json') =>
  new Request('https://lobe.example/api/auth/sign-in/demo', {
    body,
    headers: { 'content-type': contentType },
    method: 'POST',
  });

describe('prepareJsonBody', () => {
  // Regression: a bodiless JSON POST reached Better Auth as unparseable JSON and
  // the demo-account button got a 400 from /api/auth/sign-in/demo.
  it('reads an empty JSON body as {}', async () => {
    const prepared = await prepareJsonBody(post(''));

    expect(prepared).toBeInstanceOf(Request);
    await expect((prepared as Request).json()).resolves.toEqual({});
  });

  it('reads a whitespace-only JSON body as {}', async () => {
    const prepared = await prepareJsonBody(post('  \n'));

    await expect((prepared as Request).json()).resolves.toEqual({});
  });

  it('passes a valid JSON body through untouched', async () => {
    const request = post('{"email":"a@b.c"}');

    const prepared = await prepareJsonBody(request);

    expect(prepared).toBe(request);
    await expect((prepared as Request).json()).resolves.toEqual({ email: 'a@b.c' });
  });

  it('answers malformed JSON with a 400', async () => {
    const prepared = await prepareJsonBody(post('{"email":'));

    expect(prepared).toBeInstanceOf(Response);
    expect((prepared as Response).status).toBe(400);
  });

  it('leaves non-JSON and bodiless requests alone', async () => {
    const form = post('a=1', 'application/x-www-form-urlencoded');
    const bodiless = post(undefined);

    expect(await prepareJsonBody(form)).toBe(form);
    expect(await prepareJsonBody(bodiless)).toBe(bodiless);
  });
});
