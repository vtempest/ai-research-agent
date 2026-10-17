/**
 * Pure helpers that decide which SPA bundle and locale a request gets.
 *
 * This is the Worker port of `src/libs/next/proxy/define-config.ts`
 * (`defaultMiddleware` + `isPublicRoute`). Kept dependency-light so it can be
 * unit-tested without booting the LobeHub server graph.
 */
import { parse as parseCookie } from 'cookie';
import { UAParser } from 'ua-parser-js';

export const LOBE_LOCALE_COOKIE = 'LOBE_LOCALE';
export const DEFAULT_LANG = 'en-US';

export const SUPPORTED_LOCALES = [
  'ar',
  'bg-BG',
  'de-DE',
  'en-US',
  'es-ES',
  'fr-FR',
  'ja-JP',
  'ko-KR',
  'pt-BR',
  'ru-RU',
  'tr-TR',
  'zh-CN',
  'zh-TW',
  'vi-VN',
  'fa-IR',
  'it-IT',
  'pl-PL',
  'nl-NL',
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/** Same allowlist semantics as `toSafeLocale` in the Next middleware. */
export const toSafeLocale = (locale?: string | null): SupportedLocale =>
  (SUPPORTED_LOCALES as readonly string[]).includes(locale ?? '')
    ? (locale as SupportedLocale)
    : DEFAULT_LANG;

const matchLocale = (locale?: string): SupportedLocale | undefined => {
  if (!locale) return undefined;
  const lower = locale.toLowerCase();

  if (lower.startsWith('ar')) return 'ar';
  if (lower.startsWith('fa')) return 'fa-IR';
  if (lower.startsWith('cn') || lower.startsWith('zh-hans')) return 'zh-CN';
  if (lower.startsWith('zh-hant')) return 'zh-TW';

  return (
    SUPPORTED_LOCALES.find((l) => l.toLowerCase().startsWith(lower)) ??
    SUPPORTED_LOCALES.find((l) => lower.startsWith(l.split('-')[0].toLowerCase()))
  );
};

/**
 * Pick the best supported locale from an `Accept-Language` header.
 * A tiny, allocation-free replacement for `resolve-accept-language`.
 */
export const parseAcceptLanguage = (header?: string | null): SupportedLocale => {
  if (!header) return DEFAULT_LANG;

  const candidates = header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      const weight = q ? Number.parseFloat(q.split('=')[1]) : 1;
      return { tag: tag.trim(), weight: Number.isNaN(weight) ? 0 : weight };
    })
    .filter((c) => c.tag && c.tag !== '*')
    .sort((a, b) => b.weight - a.weight);

  for (const candidate of candidates) {
    const matched = matchLocale(candidate.tag);
    if (matched) return matched;
  }

  return DEFAULT_LANG;
};

export interface SpaVariant {
  /** Locale explicitly requested with `?hl=` (already validated). */
  explicitLocale?: SupportedLocale;
  isMobile: boolean;
  locale: SupportedLocale;
}

/**
 * Locale precedence: `?hl=` search param → `LOBE_LOCALE` cookie → browser
 * `Accept-Language`. Device type comes from the User-Agent.
 */
export const resolveSpaVariant = (request: Request): SpaVariant => {
  const url = new URL(request.url);
  const hl = url.searchParams.get('hl') || undefined;
  const explicitLocale = hl ? toSafeLocale(hl) : undefined;

  const cookieHeader = request.headers.get('cookie');
  const cookieLocale = cookieHeader ? parseCookie(cookieHeader)[LOBE_LOCALE_COOKIE] : undefined;

  const locale =
    explicitLocale ??
    (cookieLocale
      ? toSafeLocale(cookieLocale)
      : parseAcceptLanguage(request.headers.get('accept-language')));

  const device = new UAParser(request.headers.get('user-agent') || '').getDevice();

  return { explicitLocale, isMobile: device.type === 'mobile', locale };
};

/**
 * Backend prefixes that must never fall through to the SPA HTML.
 */
export const BACKEND_PREFIXES = ['/api', '/trpc', '/webapi', '/oidc', '/oauth/connector', '/f/'];

export const isBackendPath = (pathname: string) =>
  BACKEND_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix));

/**
 * Pages of the removed sign-in flow. Links and bookmarks to them still exist,
 * so they redirect into the app instead of rendering a blank SPA route.
 */
export const LEGACY_AUTH_ROUTES = [
  '/signin',
  '/signup',
  '/auth-error',
  '/verify-email',
  '/reset-password',
  '/market-auth-callback',
  '/oauth/callback',
  '/oauth/consent',
  '/oauth/device',
];

export const isLegacyAuthRoute = (pathname: string) =>
  LEGACY_AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));

/**
 * Where an old auth-page link lands: its `callbackUrl` when that is on this
 * origin and not another auth page, otherwise `/`.
 */
export const resolveAuthRedirectPath = (requestUrl: string): string => {
  const url = new URL(requestUrl);
  const raw = url.searchParams.get('callbackUrl');
  if (!raw) return '/';

  let target: URL;
  try {
    target = new URL(raw, url.origin);
  } catch {
    return '/';
  }
  if (target.origin !== url.origin || isLegacyAuthRoute(target.pathname)) return '/';

  return `${target.pathname}${target.search}${target.hash}`;
};

export const buildLocaleCookie = (locale: SupportedLocale, secure: boolean) =>
  `${LOBE_LOCALE_COOKIE}=${encodeURIComponent(locale)}; Max-Age=${60 * 60 * 24 * 90}; Path=/; SameSite=Lax${secure ? '; Secure' : ''}`;
