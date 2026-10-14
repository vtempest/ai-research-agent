/**
 * Guest accounts (see `plugins/guest-session.ts`) are recognised by their
 * email. Kept free of server imports so client code can use it too.
 *
 * Reserved TLD (RFC 2606), so a guest address can never reach a real mailbox.
 */
export const GUEST_EMAIL_DOMAIN = 'guest.invalid';

export const isGuestEmail = (email?: string | null) =>
  !!email && email.endsWith(`@${GUEST_EMAIL_DOMAIN}`);
