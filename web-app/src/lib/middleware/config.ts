import { dev } from '$app/environment';

// DOMAIN SPECIFIC CUSTOMIZATION
export const PUBLIC_DOMAIN = "qwksearch.com",
  APP_NAME = "QwkSearch",
  APP_EMAIL = "support@" + PUBLIC_DOMAIN,
  APP_ICON = "/icons/qwksearch-icon.svg",
  GOOGLE_ANALYTICS = "G-E5TZ32BZDF",
  COOKIE_NAME = "site",
  API_ACCESS_ALLOW_ALL = true,
  searxngDomain = "https://search." + PUBLIC_DOMAIN,
  proxy = "https://proxy." + PUBLIC_DOMAIN + "/?url=",
  FOOTER_LINKS = [
    { url: "/pricing", text: "Pricing" },
    { url: "https://www.linkedin.com/company/qwksearch/posts/", text: "Blog" },
    { url: "https://discord.gg/SJdBqBz3tV", text: "Support" },
    { url: "/legal/privacy", text: "Privacy" },
    { url: "/legal/terms", text: "Terms" },
  ];

// DEV MODE: DECIDE TO USE PUBLIC DOMAIN OR LOCALHOST AS ORIGIN

export const ORIGIN_DEV = "http://localhost:5173",
  isChromeExtension = typeof chrome !== "undefined";
function isCloudflare() {
  if (typeof process !== "undefined")
    return !!process.env.CF_PAGES || !!process.env.CLOUDFLARE_WORKERS;
  if (typeof globalThis !== "undefined")
    return !!(globalThis.caches && globalThis.caches.default);
  return false;
}
export const ORIGIN = !dev && (isCloudflare() || isChromeExtension) ? 
  "https://" + PUBLIC_DOMAIN : ORIGIN_DEV;
