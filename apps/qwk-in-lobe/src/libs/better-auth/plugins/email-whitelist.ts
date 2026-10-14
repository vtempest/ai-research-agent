import { APIError } from 'better-auth/api';
import { type BetterAuthPlugin } from 'better-auth/types';

import { authEnv } from '@/envs/auth';

import { isGuestEmail } from '../guestEmail';

/**
 * Parse comma-separated email whitelist string into array.
 */
function parseAllowedEmails(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Check if email is allowed based on whitelist.
 * Supports full email (user@example.com) or domain (example.com).
 * Guest addresses always pass unless `AUTH_DISABLE_DEMO_ACCOUNT=1`.
 */
export function isEmailAllowed(email: string): boolean {
  // Guest accounts (no sign-in at all) are not registrations; the whitelist
  // only blocks them when the demo account is turned off
  if (isGuestEmail(email) && !authEnv.AUTH_DISABLE_DEMO_ACCOUNT) return true;

  const allowedList = parseAllowedEmails(authEnv.AUTH_ALLOWED_EMAILS);
  if (allowedList.length === 0) return true;

  const domain = email.split('@')[1];

  return allowedList.some((item) => {
    // Full email match
    if (item.includes('@')) return item === email;
    // Domain match
    return item === domain;
  });
}

/**
 * Better Auth plugin to restrict registration to whitelisted emails/domains.
 * Intercepts user creation (both email signup and SSO) via databaseHooks.
 */
export const emailWhitelist = (): BetterAuthPlugin => ({
  id: 'email-whitelist',
  init() {
    return {
      options: {
        databaseHooks: {
          user: {
            create: {
              before: async (user) => {
                if (!user.email) return { data: user };

                if (!isEmailAllowed(user.email)) {
                  throw new APIError('FORBIDDEN', {
                    code: 'EMAIL_NOT_ALLOWED',
                    message: 'EMAIL_NOT_ALLOWED',
                  });
                }

                return { data: user };
              },
            },
          },
        },
      },
    };
  },
});
