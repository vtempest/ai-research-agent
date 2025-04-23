// import {
//   PUBLIC_GOOGLE_CLIENT_ID as GOOGLE_CLIENT_ID,
//   PUBLIC_DOMAIN as DOMAIN,
//   //@ts-ignore
// } from "$env/static/public";

const DOMAIN = "qwksearch.com";
const GOOGLE_CLIENT_ID = "644604561446-niuns88krqdrs260kptpf1ti10ecrfls.apps.googleusercontent.com";

/**
 * Domain Specific Customizations
 */
export const PUBLIC_DOMAIN = DOMAIN,
  PUBLIC_GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID,
  APP_NAME = "QwkSearch",
  APP_SLOGAN = "Reimagine the Internet as Self-Organizing Mind Map",
  APP_EMAIL = "support@" + PUBLIC_DOMAIN,
  APP_ICON = "https://" + PUBLIC_DOMAIN + "/icons/app-icon.svg",
  GOOGLE_ANALYTICS = "G-E5TZ32BZDF",
  API_ACCESS_ALLOW_GUEST = true,
  SERVER_API_URL = "/api/",
  searxngDomain = "https://search." + PUBLIC_DOMAIN,
  proxy = "https://proxy." + PUBLIC_DOMAIN + "/?url=",
  FOOTER_LINKS = [
    { url: "https://airesearch.js.org", text: "Docs" },
    // { url: "/docs/functions/", text: "Docs" },
    { url: "/pricing", text: "Pricing" },
    { url: "https://www.linkedin.com/company/qwksearch/posts/", text: "Blog" },
    { url: "https://discord.gg/SJdBqBz3tV", text: "Support" },
    { url: "/legal/privacy", text: "Privacy" },
    { url: "/legal/terms", text: "Terms" },
  ];
