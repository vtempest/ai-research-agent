import { RetryAfterRateLimiter } from "sveltekit-rate-limiter/server";

/**
 * Verifies the rate limiter for a given request event.
 * @param {RequestEvent} event - The request event to be checked.
 * @param {RetryAfterRateLimiter} limiter - The rate limiter to be used for checking the event.
 * @returns {string} - A string representation of the retry after time in minutes if the event is limited, otherwise undefined.
 */
export async function verifyRateLimiter(event, limiter) {
  const status = await limiter.check(event);
  let retryAfter = "";

  if (status.limited) {
    const retryAfterInMinutes = Math.round(status.retryAfter / 60);
    retryAfter = retryAfterInMinutes.toString();
  }

  return retryAfter;
}


export const changeEmailLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"],
});

export const loginLimiter = new RetryAfterRateLimiter({
  IP: [5, "s"],
  IPUA: [5, "s"],
});

export const registerLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"],
});

export const resendChangeEmailLimiter = new RetryAfterRateLimiter({
  IP: [30, "s"],
  IPUA: [30, "s"],
});

export const resendResetPasswordLimiter = new RetryAfterRateLimiter({
  IP: [1, "h"],
  IPUA: [1, "h"],
});

export const resendVerifyEmailLimiter = new RetryAfterRateLimiter({
  IP: [30, "s"],
  IPUA: [30, "s"],
});

export const resetPasswordLimiter = new RetryAfterRateLimiter({
  IP: [5, "h"],
  IPUA: [5, "h"],
});

export const verifyEmailLimiter = new RetryAfterRateLimiter({
  IP: [5, "s"],
  IPUA: [5, "s"],
});

export const accountSettingsLimiter = new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"],
});

export const notificationsSettingsLimiter = new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"],
});

export const profileSettingsLimiter = new RetryAfterRateLimiter({
  IP: [3, "h"],
  IPUA: [3, "h"],
});
