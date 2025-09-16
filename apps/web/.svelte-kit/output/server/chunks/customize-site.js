const DEV = typeof window !== "undefined" && window.location.hostname.includes("localhost"), PUBLIC_DOMAIN = DEV ? "http://localhost:5173" : "https://qwksearch.com", PUBLIC_GOOGLE_CLIENT_ID = "644604561446-niuns88krqdrs260kptpf1ti10ecrfls.apps.googleusercontent.com", APP_NAME = "QwkSearch", APP_SLOGAN = "Reimagine the Internet as Self-Organizing Mind Map", APP_EMAIL = "support@" + PUBLIC_DOMAIN.split("//")[1], GOOGLE_ANALYTICS = "G-E5TZ32BZDF", LAST_REVISED_DATE = "May 1, 2025", DOWNLOAD_WINDOWS_URL = "https://apps.microsoft.com/detail/9pcgf9gnk460?rtc=1&hl=en-us&gl=US", DOWNLOAD_WINDOWS_URL_NATIVE = "ms-windows-store://pdp/?productid=9PCGF9GNK460", DOWNLOAD_CHROME_URL = "https://chromewebstore.google.com/detail/tab-manager-ai/manhemnhmipdhdpabojcplebckhckeko", searxngDomain = "https://search." + PUBLIC_DOMAIN.split("//")[1], proxyDomain = "https://proxy." + PUBLIC_DOMAIN.split("//")[1] + "/?url=", listFooterLinks = [
  { url: "/docs/functions/", text: "Docs", icon: "HelpCircle" },
  { url: "/pricing", text: "Pricing", icon: "DollarSign" },
  { url: "https://www.linkedin.com/company/qwksearch/posts/", text: "Blog", icon: "Newspaper" },
  { url: "https://discord.gg/SJdBqBz3tV", text: "Support", icon: "MessageCircle" },
  { url: "/legal/privacy", text: "Privacy", icon: "Lock" },
  // { url: "/legal/terms", text: "Terms", icon: "FileText" },
  { url: "https://rights.institute", text: "Ethics", icon: "Bot" }
];
export {
  APP_NAME as A,
  DOWNLOAD_CHROME_URL as D,
  GOOGLE_ANALYTICS as G,
  LAST_REVISED_DATE as L,
  PUBLIC_DOMAIN as P,
  APP_EMAIL as a,
  APP_SLOGAN as b,
  PUBLIC_GOOGLE_CLIENT_ID as c,
  DOWNLOAD_WINDOWS_URL_NATIVE as d,
  DOWNLOAD_WINDOWS_URL as e,
  listFooterLinks as l,
  proxyDomain as p,
  searxngDomain as s
};
