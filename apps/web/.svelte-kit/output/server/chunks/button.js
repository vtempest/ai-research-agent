import { p as push, m as spread_attributes, o as clsx$1, t as bind_props, u as pop } from "./index.js";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
const SvelteMap = globalThis.Map;
class MediaQuery {
  current;
  /**
   * @param {string} query
   * @param {boolean} [matches]
   */
  constructor(query, matches = false) {
    this.current = matches;
  }
}
function createSubscriber(_) {
  return () => {
  };
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function loadHeadTags(options = {}) {
  const {
    title,
    fonts,
    googleAnalyticsId,
    simpleAnalytics = false,
    faviconPath = "/favicon.ico",
    appleIcon = "/icons/apple-touch-icon.png",
    androidManifest = "/site.webmanifest",
    addMobileViewport = true,
    shouldAppend = false
  } = options;
  let headTags = "";
  if (title) {
    if (shouldAppend) {
      document.title = title;
    } else {
      headTags += `<title>${title}</title>
`;
    }
  }
  if (addMobileViewport) {
    headTags += loadLink({
      name: "viewport",
      content: "width=device-width, initial-scale=1"
    }, shouldAppend);
  }
  const favicon = faviconPath === false ? "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" : faviconPath;
  headTags += loadLink({ rel: "shortcut icon", type: "image/x-icon", href: favicon }, shouldAppend);
  headTags += loadLink({ rel: "apple-touch-icon", href: appleIcon }, shouldAppend);
  headTags += loadLink({ rel: "manifest", href: androidManifest }, shouldAppend);
  if (fonts) {
    headTags += loadLink({ rel: "preconnect", href: "//fonts.googleapis.com" }, shouldAppend);
    headTags += loadLink({ rel: "preconnect", href: "//fonts.gstatic.com", crossorigin: "" }, shouldAppend);
    fonts.split(",").forEach((font) => {
      const url = `//fonts.googleapis.com/css2?family=${encodeURIComponent(font.trim())}:wght@400;700&display=swap`;
      headTags += loadLink({ href: url, rel: "stylesheet" }, shouldAppend);
    });
  }
  if (googleAnalyticsId) {
    headTags += loadScript(`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`, { async: true }, shouldAppend);
    const configScript = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalyticsId}');
    `;
    if (shouldAppend) {
      const script = document.createElement("script");
      script.innerHTML = configScript;
      document.head.appendChild(script);
    } else {
      headTags += `<script>${configScript}<\/script>
`;
    }
  }
  if (simpleAnalytics) {
    headTags += loadScript("https://scripts.simpleanalyticscdn.com/latest.js", {
      async: true,
      defer: true
    }, shouldAppend);
  }
  return headTags;
}
function loadScript(src, attrs = {}, shouldAppend = false) {
  if (shouldAppend) {
    const script = document.createElement("script");
    script.src = src;
    Object.assign(script, attrs);
    document.head.appendChild(script);
    return "";
  }
  const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ");
  return `<script src="${src}" ${attrStr}><\/script>
`;
}
function loadLink(attrs, shouldAppend = false) {
  if (shouldAppend) {
    const link = document.createElement("link");
    Object.assign(link, attrs);
    document.head.appendChild(link);
    return "";
  }
  const attrStr = Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(" ");
  return `<link ${attrStr} />
`;
}
const buttonVariants = tv({
  base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
      destructive: "bg-destructive shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 text-white",
      outline: "bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 border",
      secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9"
    }
  },
  defaultVariants: { variant: "default", size: "default" }
});
function Button($$payload, $$props) {
  push();
  let {
    class: className,
    variant = "default",
    size = "default",
    ref = null,
    href = void 0,
    type = "button",
    disabled,
    children,
    $$slots,
    $$events,
    ...restProps
  } = $$props;
  if (href) {
    $$payload.out.push("<!--[-->");
    $$payload.out.push(`<a${spread_attributes(
      {
        "data-slot": "button",
        class: clsx$1(cn(buttonVariants({ variant, size }), className)),
        href: disabled ? void 0 : href,
        "aria-disabled": disabled,
        role: disabled ? "link" : void 0,
        tabindex: disabled ? -1 : void 0,
        ...restProps
      }
    )}>`);
    children?.($$payload);
    $$payload.out.push(`<!----></a>`);
  } else {
    $$payload.out.push("<!--[!-->");
    $$payload.out.push(`<button${spread_attributes(
      {
        "data-slot": "button",
        class: clsx$1(cn(buttonVariants({ variant, size }), className)),
        type,
        disabled,
        ...restProps
      }
    )}>`);
    children?.($$payload);
    $$payload.out.push(`<!----></button>`);
  }
  $$payload.out.push(`<!--]-->`);
  bind_props($$props, { ref });
  pop();
}
export {
  Button as B,
  MediaQuery as M,
  SvelteMap as S,
  cn as a,
  createSubscriber as c,
  loadHeadTags as l
};
