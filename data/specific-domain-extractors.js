var domainSpecificExtractors = [
  {
    domain: "www.tmz.com",

    title: {
      selectors: [".post-title-breadcrumb", "h1", ".headline"],
    },

    author: "TMZ STAFF",

    date_published: {
      selectors: [".article__published-at", ".article-posted-date"],

      timezone: "America/Los_Angeles",
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article__blocks", ".article-content", ".all-post-body"],

      clean: [".lightbox-link"],
    },
  },
  {
    domain: "www.yomiuri.co.jp",

    title: {
      selectors: ["h1.title-article.c-article-title"],
    },

    author: null,

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.p-main-contents"],

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "www.nydailynews.com",

    title: {
      selectors: ["h1.headline", "h1#ra-headline"],
    },

    author: {
      selectors: [
        ".article_byline span",
        ['meta[name="parsely-author"]', "value"],
      ],
    },

    date_published: {
      selectors: ["time", ['meta[name="sailthru.date"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article", "article#ra-body"],

      clean: ["dl#ra-tags", ".ra-related", "a.ra-editor", "dl#ra-share-bottom"],
    },
  },
  {
    domain: "www.aol.com",

    title: {
      selectors: ["h1.p-article__title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [".p-article__byline__date"],

      timezone: "America/New_York",
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article-content"],

      transforms: {},
    },
  },
  {
    domain: "fandom.wikia.com",
    title: {
      selectors: [
        "h1.entry-title",
        // enter title selectors
      ],
    },

    author: {
      selectors: [
        ".author vcard",
        ".fn",
        // enter author selectors
      ],
    },

    content: {
      selectors: [
        ".grid-content",
        ".entry-content",
        // enter content selectors
      ],

      transforms: [],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "scan.netsecurity.ne.jp",

    title: {
      selectors: ["header.arti-header h1.head"],
    },

    author: null,

    date_published: {
      selectors: [['meta[name="article:modified_time"]', "value"]],
    },

    dek: {
      selectors: ["header.arti-header p.arti-summary"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.arti-content.arti-content--thumbnail"],

      defaultCleaner: false,

      transforms: {},

      clean: ["aside.arti-giga"],
    },
  },
  {
    domain: "people.com",

    title: {
      selectors: [".article-header h1", ['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [['meta[name="sailthru.author"]', "value"], "a.author.url.fn"],
    },

    date_published: {
      selectors: [
        ".mntl-attribution__item-date",
        ['meta[name="article:published_time"]', "value"],
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [".article-header h2"],
    },

    content: {
      selectors: [
        'div[class^="loc article-content"]',
        "div.article-body__inner",
      ],

      transforms: {},
    },
  },
  {
    domain: "www.gizmodo.jp",

    title: {
      selectors: ["h1.p-post-title"],
    },

    author: {
      selectors: ["li.p-post-AssistAuthor"],
    },

    date_published: {
      selectors: [["li.p-post-AssistTime time", "datetime"]],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article.p-post"],

      transforms: {
        "img.p-post-thumbnailImage": ($node) => {
          const src = $node.attr("src");
          $node.attr("src", src.replace(/^.*=%27/, "").replace(/%27;$/, ""));
        },
      },

      clean: ["h1.p-post-title", "ul.p-post-Assist"],
    },
  },
  {
    domain: "www.rawstory.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"], ".blog-title"],
    },

    author: {
      selectors: [
        "div.main-post-head .social-author__name",
        ".blog-author a:first-of-type",
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ".blog-author a:last-of-type",
      ],

      timezone: "EST",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".post-body", ".blog-content"],

      transforms: {},
    },
  },
  {
    domain: "uproxx.com",

    title: {
      selectors: ["div.entry-header h1"],
    },

    author: {
      selectors: [['meta[name="qc:author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".entry-content"],

      transforms: {
        "div.image": "figure",
        "div.image .wp-media-credit": "figcaption",
      },
    },
  },
  {
    domain: "www.ndtv.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"], "h1.entry-title"],
    },

    author: {
      selectors: ['span[itemprop="author"] span[itemprop="name"]'],
    },

    date_published: {
      selectors: [['span[itemprop="dateModified"]', "content"]],
    },

    dek: {
      selectors: ["h2"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ['div[itemprop="articleBody"]'],

      transforms: {
        // This site puts a dateline in a 'b' above the first paragraph, and then somehow
        // blends it into the first paragraph with CSS. This transform moves the dateline
        // to the first paragraph.
        ".place_cont": ($node) => {
          if (!$node.parents("p").length) {
            const nextSibling = $node.next("p");
            if (nextSibling) {
              $node.remove();
              nextSibling.prepend($node);
            }
          }
        },
      },

      clean: [
        ".highlghts_Wdgt",
        ".ins_instory_dv_caption",
        "input",
        "._world-wrapper .mt20",
      ],
    },
  },
  {
    domain: "www.lifehacker.jp",

    title: {
      selectors: ['h1[class^="article_pArticle_Title"]', "h1.lh-summary-title"],
    },

    author: {
      selectors: [
        ['meta[name="author"]', "value"],
        "p.lh-entryDetailInner--credit",
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ["div.lh-entryDetail-header time", "datetime"],
      ],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        'div[class^="article_pArticle_Body__"]',
        "div.lh-entryDetail-body",
      ],

      transforms: {
        "img.lazyload": ($node) => {
          const src = $node.attr("src");
          $node.attr("src", src.replace(/^.*=%27/, "").replace(/%27;$/, ""));
        },
      },

      clean: ["p.lh-entryDetailInner--credit"],
    },
  },
  {
    domain: "nymag.com",
    content: {
      // Order by most likely. Extractor will stop on first occurrence
      selectors: ["div.article-content", "section.body", "article.article"],

      // Selectors to remove from the extracted conten
      clean: [".ad", ".single-related-story"],

      // Object of tranformations to make on matched elements
      // Each key is the selector, each value is the tag to
      // transform to.
      // If a function is given, it should return a string
      // to convert to or nothing (in which case it will not perform
      // the transformation.
      transforms: {
        // Convert h1s to h2s
        h1: "h2",

        // Convert lazy-loaded noscript images to figures
        noscript: ($node, $) => {
          const $children = $.browser ? $($node.text()) : $node.children();
          if (
            $children.length === 1 &&
            $children.get(0) !== undefined &&
            $children.get(0).tagName.toLowerCase() === "img"
          ) {
            return "figure";
          }

          return null;
        },
      },
    },

    title: {
      selectors: ["h1.lede-feature-title", "h1.headline-primary", "h1"],
    },

    author: {
      selectors: [".by-authors", ".lede-feature-author"],
    },

    dek: {
      selectors: [".lede-feature-teaser"],
    },

    date_published: {
      selectors: [
        ["time.article-timestamp[datetime]", "datetime"],
        "time.article-timestamp",
      ],
    },
  },
  {
    domain: "www.itmedia.co.jp",

    supportedDomains: [
      "www.atmarkit.co.jp",
      "techtarget.itmedia.co.jp",
      "nlab.itmedia.co.jp",
    ],

    title: {
      selectors: ["#cmsTitle h1"],
    },

    author: {
      selectors: ["#byline"],
    },

    date_published: {
      selectors: [['meta[name="article:modified_time"]', "value"]],
    },

    dek: {
      selectors: ["#cmsAbstract h2"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#cmsBody"],

      defaultCleaner: false,

      transforms: {},

      clean: ["#snsSharebox"],
    },
  },
  {
    domain: "arstechnica.com",

    // Articles from this site are often paginated, but I was unable to write a CSS
    // selector to find the next page. On the last page, there will be a link with a CSS
    // selector indicating that the previous page is next. But the parser appears to find
    // the next page without this extractor finding it, as long as the fallback option is
    // left at its default value of true.

    title: {
      selectors: ["title"],
    },

    author: {
      selectors: ['*[rel="author"] *[itemprop="name"]'],
    },

    date_published: {
      selectors: [[".byline time", "datetime"]],
    },

    dek: {
      selectors: ['h2[itemprop="description"]'],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ['div[itemprop="articleBody"]'],

      transforms: {
        h2: ($node) => {
          // Some pages have an element h2 that is significant, and that the parser will
          // remove if not following a paragraph. Adding this empty paragraph fixes it, and
          // the empty paragraph will be removed anyway.
          $node.before("<p></p>");
        },
      },

      clean: [
        // Remove enlarge links and separators inside image captions.
        "figcaption .enlarge-link",
        "figcaption .sep",

        // I could not transform the video into usable elements, so I
        // removed them.
        "figure.video",

        // Image galleries that do not work.
        ".gallery",

        "aside",
        ".sidebar",
      ],
    },
  },
  {
    domain: "obamawhitehouse.archives.gov",

    supportedDomains: ["whitehouse.gov"],

    title: {
      selectors: ["h1", ".pane-node-title"],
    },

    author: {
      selectors: [".blog-author-link", ".node-person-name-link"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [".field-name-field-forall-summary"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      defaultCleaner: false,

      selectors: ["div#content-start", ".pane-node-field-forall-body"],

      clean: [".pane-node-title", ".pane-custom.pane-1"],
    },
  },
  {
    domain: "www.mentalfloss.com",

    title: {
      selectors: [
        ['meta[name="og:title"]', "value"],
        "h1.title",
        ".title-group",
        ".inner",
      ],
    },

    author: {
      selectors: [
        'a[data-vars-label*="authors"]',
        ".field-name-field-enhanced-authors",
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ".date-display-single",
      ],
      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article main", "div.field.field-name-body"],

      clean: ["small"],
    },
  },
  {
    domain: "hellogiggles.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"], ".title"],
    },

    author: {
      selectors: [".byline-wrapper span.author_name", ".author-link"],
    },

    date_published: {
      selectors: [
        ['meta[property="article:published_time"]', "content"],
        ['meta[name="article:published_time"]', "value"],
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".main-content", ".entry-content"],

      transforms: {},
    },
  },
  {
    domain: "www.slate.com",

    title: {
      selectors: [".hed", "h1"],
    },

    author: {
      selectors: ["a[rel=author]"],
    },

    date_published: {
      selectors: [".pub-date"],

      timezone: "America/New_York",
    },

    dek: {
      selectors: [".dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".body"],

      clean: [
        ".about-the-author",
        ".pullquote",
        ".newsletter-signup-component",
        ".top-comment",
      ],
    },
  },
  {
    domain: "www.fastcompany.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [".post__deck"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".post__article"],
    },
  },
  {
    domain: "www.theatlantic.com",
    title: {
      selectors: ["h1", ".c-article-header__hed"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"], ".c-byline__author"],
    },

    content: {
      selectors: ["article", ".article-body"],

      transforms: [],

      clean: [
        ".partner-box",
        ".callout",
        ".c-article-writer__image",
        ".c-article-writer__content",
        ".c-letters-cta__text",
        ".c-footer__logo",
        ".c-recirculation-link",
        ".twitter-tweet",
      ],
    },

    dek: {
      selectors: [['meta[name="description"]', "value"]],
    },

    date_published: {
      selectors: [['time[itemprop="datePublished"]', "datetime"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "clinicaltrials.gov",

    title: {
      selectors: ["h1.tr-solo_record"],
    },

    author: {
      selectors: ["div#sponsor.tr-info-text"],
    },

    date_published: {
      // selectors: ['span.term[data-term="Last Update Posted"]'],
      selectors: ['div:has(> span.term[data-term="Last Update Posted"])'],
    },

    content: {
      selectors: ["div#tab-body"],

      clean: [".usa-alert> img"],
    },
  },
  {
    domain: "www.washingtonpost.com",

    title: {
      selectors: ["h1", "#topper-headline-wrapper"],
    },

    author: {
      selectors: [".pb-author-name"],
    },

    date_published: {
      selectors: [['.author-timestamp[itemprop="datePublished"]', "content"]],
    },

    dek: {
      selectors: [],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article-body"],

      transforms: {
        "div.inline-content": ($node) => {
          if ($node.has("img,iframe,video").length > 0) {
            return "figure";
          }

          $node.remove();
          return null;
        },
        ".pb-caption": "figcaption",
      },

      clean: [".interstitial-link", ".newsletter-inline-unit"],
    },
  },
  {
    domain: "www.infoq.com",

    title: {
      selectors: ["h1.heading"],
    },

    author: {
      selectors: ["div.widget.article__authors"],
    },

    date_published: {
      selectors: [".article__readTime.date"],
      format: "YYYY年MM月DD日",
      timezone: "Asia/Tokyo",
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article__data"],

      defaultCleaner: false,

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "phpspot.org",

    title: {
      selectors: ["h3.hl"],
    },

    author: null,

    date_published: {
      selectors: ["h4.hl"],
      format: "YYYY年MM月DD日",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: null,

    content: {
      selectors: ["div.entrybody"],

      defaultCleaner: false,

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "www.today.com",

    title: {
      selectors: ["h1.article-hero-headline__htag", "h1.entry-headline"],
    },

    author: {
      selectors: ["span.byline-name", ['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: ["time[datetime]", ['meta[name="DC.date.issued"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article-body__content", ".entry-container"],

      clean: [".label-comment"],
    },
  },
  {
    domain: "pastebin.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [".username", ".paste_box_line2 .t_us + a"],
    },

    date_published: {
      selectors: [".date", ".paste_box_line2 .t_da + span"],
      timezone: "America/New_York",
      format: "MMMM D, YYYY",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".source", "#selectable .text"],

      transforms: {
        ol: "div",
        li: "p",
      },
    },
  },
  {
    domain: "medium.com",

    title: {
      selectors: ["h1", ['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    content: {
      selectors: ["article"],

      transforms: {
        // Allow drop cap character.
        "section span:first-of-type": ($node) => {
          const $text = $node.html();
          if ($text.length === 1 && /^[a-zA-Z()]+$/.test($text)) {
            $node.replaceWith($text);
          }
        },
        // Re-write lazy-loaded youtube videos
        iframe: ($node) => {
          const ytRe =
            /https:\/\/i.embed.ly\/.+url=https:\/\/i\.ytimg\.com\/vi\/(\w+)\//;
          const thumb = decodeURIComponent($node.attr("data-thumbnail"));
          const $parent = $node.parents("figure");

          if (ytRe.test(thumb)) {
            const [_, youtubeId] = thumb.match(ytRe); // eslint-disable-line
            $node.attr("src", `https://www.youtube.com/embed/${youtubeId}`);
            const $caption = $parent.find("figcaption");
            $parent.empty().append([$node, $caption]);
            return;
          }

          // If we can't draw the YouTube preview, remove the figure.
          $parent.remove();
        },

        // rewrite figures to pull out image and caption, remove rest
        figure: ($node) => {
          // ignore if figure has an iframe
          if ($node.find("iframe").length > 0) return;

          const $img = $node.find("img").slice(-1)[0];
          const $caption = $node.find("figcaption");

          $node.empty().append([$img, $caption]);
        },

        // Remove any smaller images that did not get caught by the generic image
        // cleaner (author photo 48px, leading sentence images 79px, etc.).
        img: ($node) => {
          const width = parseInt($node.attr("width"), 10);
          if (width < 100) $node.remove();
        },
      },

      clean: ["span a", "svg"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: null,

    next_page_url: {
      selectors: [
        // enter selectors
      ],
    },

    excerpt: {
      selectors: [
        // enter selectors
      ],
    },
  },
  {
    domain: "www.popsugar.com",

    title: {
      selectors: ["h2.post-title", "title-text"],
    },

    author: {
      selectors: [['meta[name="article:author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#content"],

      clean: [".share-copy-title", ".post-tags", ".reactions"],
    },
  },
  {
    domain: "www.fortinet.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [".b15-blog-meta__author"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        "div.responsivegrid.aem-GridColumn.aem-GridColumn--default--12",
      ],

      transforms: {
        noscript: ($node) => {
          const $children = $node.children();
          if ($children.length === 1 && $children.get(0).tagName === "img") {
            return "figure";
          }
          return null;
        },
      },
    },
  },
  {
    domain: "otrs.com",

    title: {
      selectors: ["#main article h1"],
    },

    author: {
      selectors: ["div.dateplusauthor a"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#main article"],

      defaultCleaner: false,

      transforms: {},

      clean: [
        "div.dateplusauthor",
        "div.gr-12.push-6.footershare",
        "#atftbx",
        "div.category-modul",
      ],
    },
  },
  {
    domain: "www.dmagazine.com",

    title: {
      selectors: ["h1.story__title"],
    },

    author: {
      selectors: [".story__info .story__info__item:first-child"],
    },

    date_published: {
      selectors: [
        // enter selectors
        ".story__info",
      ],

      timezone: "America/Chicago",
      format: "MMMM D, YYYY h:mm a",
    },

    dek: {
      selectors: [".story__subhead"],
    },

    lead_image_url: {
      selectors: [["article figure a:first-child", "href"]],
    },

    content: {
      selectors: [".story__content"],

      transforms: {},
    },
  },
  {
    domain: "money.cnn.com",

    title: {
      selectors: [".article-title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"], ".byline a"],
    },

    date_published: {
      selectors: [['meta[name="date"]', "value"]],

      timezone: "GMT",
    },

    dek: {
      selectors: ["#storytext h2"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#storytext"],

      clean: [".inStoryHeading"],
    },
  },
  {
    domain: "www.cbc.ca",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [".authorText", ".bylineDetails"],
    },

    date_published: {
      selectors: [[".timeStamp[datetime]", "datetime"]],
    },

    dek: {
      selectors: [".deck"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".story"],

      transforms: {},
    },
  },
  {
    domain: "www.macrumors.com",

    title: {
      selectors: ["h1", "h1.title"],
    },

    author: {
      selectors: ['article a[rel="author"]', ".author-url"],
    },

    date_published: {
      selectors: [["time", "datetime"]],

      timezone: "America/Los_Angeles",
    },

    dek: {
      selectors: [['meta[name="description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article", ".article"],

      transforms: {},
    },
  },
  {
    domain: "www.cnbc.com",

    title: {
      selectors: ["h1.title", "h1.ArticleHeader-headline"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        "div#article_body.content",
        "div.story",
        "div.ArticleBody-articleBody",
      ],

      transforms: {},
    },
  },
  {
    domain: "www.investmentexecutive.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: ['div[itemprop="author"]'],
    },

    date_published: {
      selectors: [['meta[itemprop="datePublished"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["section.article-body"],

      clean: [".hidden"],
    },
  },
  {
    domain: "www.moongift.jp",

    title: {
      selectors: ["h1.title a"],
    },

    author: null,

    date_published: {
      selectors: ["ul.meta li:not(.social):first-of-type"],
      timezone: "Asia/Tokyo",
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#main"],

      transforms: {},

      clean: ["ul.mg_service.cf"],
    },
  },
  {
    domain: "www.nbcnews.com",

    title: {
      selectors: ["div.article-hero-headline h1", "div.article-hed h1"],
    },

    author: {
      selectors: [
        "div.article-inline-byline span.byline-name",
        "span.byline_author",
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published"]', "value"],
        [".flag_article-wrapper time.timestamp_article[datetime]", "datetime"],
        ".flag_article-wrapper time",
      ],

      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article-body__content", "div.article-body"],

      transforms: {},
    },
  },
  {
    domain: "news.nationalgeographic.com",

    title: {
      selectors: ["h1", "h1.main-title"],
    },

    author: {
      selectors: [".byline-component__contributors b span"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
      format: "ddd MMM DD HH:mm:ss zz YYYY",
      timezone: "EST",
    },

    dek: {
      selectors: [".article__deck"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [[".parsys.content", ".__image-lead__"], ".content"],

      transforms: {
        ".parsys.content": ($node, $) => {
          const $imgSrc = $node
            .find(".image.parbase.section")
            .find(".picturefill")
            .first()
            .data("platform-src");
          if ($imgSrc) {
            $node.prepend($(`<img class="__image-lead__" src="${$imgSrc}"/>`));
          }
        },
      },

      clean: [".pull-quote.pull-quote--large"],
    },
  },
  {
    domain: "getnews.jp",

    title: {
      selectors: ["article h1"],
    },

    author: {
      selectors: [['meta[name="article:author"]', "value"], "span.prof"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ["ul.cattag-top time", "datetime"],
      ],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.post-bodycopy"],

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "deadspin.com",

    supportedDomains: [
      "jezebel.com",
      "lifehacker.com",
      "kotaku.com",
      "gizmodo.com",
      "jalopnik.com",
      "kinja.com",
      "avclub.com",
      "clickhole.com",
      "splinternews.com",
      "theonion.com",
      "theroot.com",
      "thetakeout.com",
      "theinventory.com",
    ],

    title: {
      selectors: ["header h1", "h1.headline"],
    },

    author: {
      selectors: ['a[data-ga*="Author"]', ".author"],
    },

    content: {
      selectors: [".js_post-content", ".post-content", ".entry-content"],

      transforms: {
        'iframe.lazyload[data-recommend-id^="youtube://"]': ($node) => {
          const youtubeId = $node.attr("id").split("youtube-")[1];
          $node.attr("src", `https://www.youtube.com/embed/${youtubeId}`);
        },
      },

      clean: [".magnifier", ".lightbox"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ["time.updated[datetime]", "datetime"],
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    next_page_url: {
      selectors: [
        // enter selectors
      ],
    },

    excerpt: {
      selectors: [
        // enter selectors
      ],
    },
  },
  {
    domain: "www.reddit.com",

    title: {
      selectors: [
        'div[data-test-id="post-content"] h1',
        'div[data-test-id="post-content"] h2',
      ],
    },

    author: {
      selectors: ['div[data-test-id="post-content"] a[href*="user/"]'],
    },

    date_published: {
      selectors: [
        'div[data-test-id="post-content"] span[data-click-id="timestamp"]',
        'div[data-test-id="post-content"] a[data-click-id="timestamp"]',
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ['div[data-test-id="post-content"] p'], // text post
        [
          'div[data-test-id="post-content"] a[target="_blank"]:not([data-click-id="timestamp"])', // external link
          'div[data-test-id="post-content"] div[data-click-id="media"]', // embedded media
        ], // external link with media preview (YouTube, imgur album, etc...)
        ['div[data-test-id="post-content"] div[data-click-id="media"]'], // Embedded media (Reddit video)
        ['div[data-test-id="post-content"] a'], // external link
        'div[data-test-id="post-content"]',
      ],

      transforms: {
        'div[role="img"]': ($node) => {
          // External link image preview
          const $img = $node.find("img");
          const bgImg = $node.css("background-image");
          if ($img.length === 1 && bgImg) {
            $img.attr("src", bgImg.match(/\((.*?)\)/)[1].replace(/('|")/g, ""));
            return $img;
          }
          return $node;
        },
      },

      clean: [
        ".icon",
        'span[id^="PostAwardBadges"]',
        'div a[data-test-id="comments-page-link-num-comments"]',
      ],
    },
  },
  {
    domain: "www.chicagotribune.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: ["div.article_byline span:first-of-type"],
    },

    date_published: {
      selectors: ["time"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article"],

      transforms: {},
    },
  },
  {
    domain: "www.bloomberg.com",

    title: {
      selectors: [
        // normal articles
        ".lede-headline",

        // /graphics/ template
        "h1.article-title",

        // /news/ template
        'h1[class^="headline"]',
        "h1.lede-text-only__hed",
      ],
    },

    author: {
      selectors: [
        ['meta[name="parsely-author"]', "value"],
        ".byline-details__link",

        // /graphics/ template
        ".bydek",

        // /news/ template
        ".author",
        'p[class*="author"]',
      ],
    },

    date_published: {
      selectors: [
        ["time.published-at", "datetime"],
        ["time[datetime]", "datetime"],
        ['meta[name="date"]', "value"],
        ['meta[name="parsely-pub-date"]', "value"],
        ['meta[name="parsely-pub-date"]', "content"],
      ],
    },

    dek: {
      selectors: [],
    },

    lead_image_url: {
      selectors: [
        ['meta[name="og:image"]', "value"],
        ['meta[name="og:image"]', "content"],
      ],
    },

    content: {
      selectors: [
        ".article-body__content",
        ".body-content",

        // /graphics/ template
        ["section.copy-block"],

        // /news/ template
        ".body-copy",
      ],

      clean: [".inline-newsletter", ".page-ad"],
    },
  },
  {
    domain: "wikipedia.org",
    content: {
      selectors: ["#mw-content-text"],

      defaultCleaner: false,

      // transform top infobox to an image with caption
      transforms: {
        ".infobox img": ($node) => {
          const $parent = $node.parents(".infobox");
          // Only prepend the first image in .infobox
          if ($parent.children("img").length === 0) {
            $parent.prepend($node);
          }
        },
        ".infobox caption": "figcaption",
        ".infobox": "figure",
      },

      // Selectors to remove from the extracted conten
      clean: [
        ".mw-editsection",
        "figure tr, figure td, figure tbody",
        "#toc",
        ".navbox",
      ],
    },

    author: "Wikipedia Contributors",

    title: {
      selectors: ["h2.title"],
    },

    date_published: {
      selectors: ["#footer-info-lastmod"],
    },
  },
  {
    domain: "takagi-hiromitsu.jp",

    title: {
      selectors: ["h3"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[http-equiv="Last-Modified"]', "value"]],
    },

    dek: null,

    lead_image_url: null,

    content: {
      selectors: ["div.body"],

      defaultCleaner: false,

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "deadline.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: ["section.author h2"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        "div.a-article-grid__main.pmc-a-grid article.pmc-a-grid-item",
      ],

      transforms: {
        ".embed-twitter": ($node) => {
          const innerHtml = $node.html();
          $node.replaceWith(innerHtml);
        },
      },

      clean: ["figcaption"],
    },
  },
  {
    domain: "www.theverge.com",

    supportedDomains: ["www.polygon.com"],

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [".p-dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        // feature template multi-match
        [".c-entry-hero .e-image", ".c-entry-intro", ".c-entry-content"],
        // regular post multi-match
        [".e-image--hero", ".c-entry-content"],
        // feature template fallback
        ".l-wrapper .l-feature",
        // regular post fallback
        "div.c-entry-content",
      ],

      // Transform lazy-loaded images
      transforms: {
        noscript: ($node) => {
          const $children = $node.children();
          if ($children.length === 1 && $children.get(0).tagName === "img") {
            return "span";
          }

          return null;
        },
      },

      clean: [
        ".aside",
        "img.c-dynamic-image", // images come from noscript transform
      ],
    },
  },
  {
    domain: "www.politico.com",
    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [
        ['div[itemprop="author"] meta[itemprop="name"]', "value"],
        ".story-meta__authors .vcard",
        ".story-main-content .byline .vcard",
      ],
    },

    content: {
      selectors: [[".story-text"], ".story-main-content", ".story-core"],

      transforms: [],

      clean: ["figcaption", ".story-meta", ".ad"],
    },

    date_published: {
      selectors: [
        ['time[itemprop="datePublished"]', "datetime"],
        [".story-meta__details time[datetime]", "datetime"],
        [".story-main-content .timestamp time[datetime]", "datetime"],
      ],
      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },
  },
  {
    domain: "www.thepoliticalinsider.com",

    title: {
      selectors: [['meta[name="sailthru.title"]', "value"]],
    },

    author: {
      selectors: [['meta[name="sailthru.author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="sailthru.date"]', "value"]],
      timezone: "America/New_York",
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [
        ['meta[name="og:image"]', "value"], // enter selectors
      ],
    },

    content: {
      selectors: ["div#article-body"],

      transforms: {},
    },
  },
  {
    domain: "www.gruene.de",

    title: {
      selectors: ["header h1"],
    },

    author: null,

    date_published: null,

    dek: null,

    lead_image_url: {
      selectors: [['meta[property="og:image"]', "content"]],
    },

    content: {
      // selectors: ['section'],
      selectors: [["section header", "section h2", "section p", "section ol"]],

      clean: ["figcaption", "p[class]"],
    },
  },
  {
    domain: "www.broadwayworld.com",
    title: {
      selectors: ["h1[itemprop=headline]", "h1.article-title"],
    },

    author: {
      selectors: ["span[itemprop=author]"],
    },

    content: {
      selectors: ["div[itemprop=articlebody]"],

      transforms: {},
    },

    date_published: {
      selectors: [["meta[itemprop=datePublished]", "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [],
    },

    next_page_url: {
      selectors: [
        // enter selectors
      ],
    },

    excerpt: {
      selectors: [
        // enter selectors
      ],
    },
  },
  {
    domain: "ma.ttias.be",

    title: {
      selectors: [['meta[name="twitter:title"]', "value"]],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    content: {
      selectors: [[".content"]],

      transforms: {
        h2: ($node) => {
          // The "id" attribute values would result in low scores and the element being
          // removed.
          $node.attr("id", null);

          // h1 elements will be demoted to h2, so demote h2 elements to h3.
          return "h3";
        },
        h1: ($node) => {
          // The "id" attribute values would result in low scores and the element being
          // removed.
          $node.attr("id", null);

          // A subsequent h2 will be removed if there is not a paragraph before it, so
          // add a paragraph here. It will be removed anyway because it is empty.
          $node.after("<p></p>");
        },
        ul: ($node) => {
          // Articles contain lists of links which look like, but are not, navigation
          // elements. Adding this class attribute avoids them being incorrectly removed.
          $node.attr("class", "entry-content-asset");
        },
      },
    },
  },
  {
    domain: "pitchfork.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"], "title"],
    },

    author: {
      selectors: [
        ['meta[name="article:author"]', "value"],
        ".authors-detail__display-name",
      ],
    },

    date_published: {
      selectors: ['div[class^="InfoSliceWrapper-"]', [".pub-date", "datetime"]],
    },

    dek: {
      selectors: [
        ['meta[name="og:description"]', "value"],
        ".review-detail__abstract",
      ],
    },

    lead_image_url: {
      selectors: [
        ['meta[name="og:image"]', "value"],
        [".single-album-tombstone__art img", "src"],
      ],
    },

    content: {
      selectors: ["div.body__inner-container", ".review-detail__text"],
    },

    extend: {
      score: {
        selectors: ['p[class*="Rating"]', ".score"],
      },
    },
  },
  {
    domain: "newrepublic.com",

    title: {
      selectors: ["h1.article-headline"],
    },

    author: {
      selectors: ["span.AuthorList"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],

      timezone: "America/New_York",
    },

    dek: {
      selectors: ["h2.article-subhead"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [["div.article-body"]],

      clean: ["aside"],
    },
  },
  {
    domain: "www.usmagazine.com",

    title: {
      selectors: ["header h1"],
    },

    author: {
      selectors: ["a.author", "a.article-byline.tracked-offpage"],
    },

    date_published: {
      timezone: "America/New_York",

      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article-content"],

      clean: [".module-related"],
    },
  },
  {
    domain: "www.huffingtonpost.com",

    title: {
      selectors: ["h1.headline__title"],
    },

    author: {
      selectors: ["span.author-card__details__name"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:modified_time"]', "value"],
        ['meta[name="article:published_time"]', "value"],
      ],
    },

    dek: {
      selectors: ["h2.headline__subtitle"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.entry__body"],

      defaultCleaner: false,

      clean: [
        ".pull-quote",
        ".tag-cloud",
        ".embed-asset",
        ".below-entry",
        ".entry-corrections",
        "#suggested-story",
      ],
    },
  },
  {
    domain: "www.lemonde.fr",

    title: {
      selectors: ["h1.article__title"],
    },

    author: {
      selectors: [".author__name"],
    },

    date_published: {
      selectors: [['meta[name="og:article:published_time"]', "value"]],
    },

    dek: {
      selectors: [".article__desc"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article__content"],

      transforms: {},

      clean: ["figcaption"],
    },
  },
  {
    domain: "www.newyorker.com",
    title: {
      selectors: [
        'h1[class^="content-header"]',
        'h1[class^="ArticleHeader__hed"]',
        'h1[class*="ContentHeaderHed"]',
        ['meta[name="og:title"]', "value"],
      ],
    },

    author: {
      selectors: [
        'article header div[class^="BylinesWrapper"]',
        ['meta[name="article:author"]', "value"],
        'div[class^="ArticleContributors"] a[rel="author"]',
        'article header div[class*="Byline__multipleContributors"]',
      ],
    },

    content: {
      selectors: [
        ".article__body",
        "article.article.main-content",
        'main[class^="Layout__content"]',
      ],

      transforms: {
        ".caption__text": "figcaption",
        ".caption__credit": "figcaption",
      },

      clean: ['footer[class^="ArticleFooter__footer"]', "aside"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        "time.content-header__publish-date",
        ['meta[name="pubdate"]', "value"],
      ],
      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [
        'div[class^="ContentHeaderDek"]',
        "div.content-header__dek",
        'h2[class^="ArticleHeader__dek"]',
      ],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "www.prospectmagazine.co.uk",

    title: {
      selectors: [".blog-header__title", ".page-title"],
    },

    author: {
      selectors: [".blog-header__author-link", ".aside_author .title"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ".post-info",
      ],

      timezone: "Europe/London",
    },

    dek: {
      selectors: [".blog-header__description", ".page-subtitle"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".blog__container", "article .post_content"],

      transforms: {},
    },
  },
  {
    domain: "www.americanow.com",

    title: {
      selectors: [".title", ['meta[name="title"]', "value"]],
    },

    author: {
      selectors: [".byline"],
    },

    date_published: {
      selectors: [['meta[name="publish_date"]', "value"]],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [[".article-content", ".image", ".body"], ".body"],

      clean: [".article-video-wrapper", ".show-for-small-only"],
    },
  },
  {
    domain: "bookwalker.jp",

    title: {
      selectors: ["h1.p-main__title", "h1.main-heading"],
    },

    author: {
      selectors: ["div.p-author__list", "div.authors"],
    },

    date_published: {
      selectors: [
        "dl.p-information__data dd:nth-of-type(7)",
        ".work-info .work-detail:first-of-type .work-detail-contents:last-of-type",
      ],
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        "div.p-main__information",
        ["div.main-info", "div.main-cover-inner"],
      ],

      defaultCleaner: false,

      transforms: {},

      clean: [
        "span.label.label--trial",
        "dt.info-head.info-head--coin",
        "dd.info-contents.info-contents--coin",
        "div.info-notice.fn-toggleClass",
      ],
    },
  },
  {
    domain: "blogspot.com",
    content: {
      // Blogger is insane and does not load its content
      // initially in the page, but it's all there
      // in noscript
      selectors: [".post-content noscript"],

      // Selectors to remove from the extracted conten

      // Convert the noscript tag to a div
      transforms: {
        noscript: "div",
      },
    },

    author: {
      selectors: [".post-author-name"],
    },

    title: {
      selectors: [".post h2.title"],
    },

    date_published: {
      selectors: ["span.publishdate"],
    },
  },
  {
    domain: "thoughtcatalog.com",

    title: {
      selectors: ["h1.title", ['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [
        "cite a",
        "div.col-xs-12.article_header div.writer-container.writer-container-inline.writer-no-avatar h4.writer-name",
        "h1.writer-name",
      ],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".entry.post"],

      clean: [".tc_mark", "figcaption"],
    },
  },
  {
    domain: "www.reuters.com",

    title: {
      selectors: [
        'h1[class*="ArticleHeader-headline-"]',
        "h1.article-headline",
      ],
    },

    author: {
      selectors: [['meta[name="og:article:author"]', "value"], ".author"],
    },

    date_published: {
      selectors: [['meta[name="og:article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.ArticleBodyWrapper", "#article-text"],

      transforms: {
        ".article-subtitle": "h4",
      },

      clean: [
        'div[class^="ArticleBody-byline-container-"]',
        "#article-byline .author",
      ],
    },
  },
  {
    domain: "www.spektrum.de",

    title: {
      selectors: [".content__title"],
    },

    author: {
      selectors: [".content__author__info__name"],
    },

    date_published: {
      selectors: [".content__meta__date"],
      timezone: "Europe/Berlin",
    },

    dek: {
      selectors: [".content__intro"],
    },

    lead_image_url: {
      selectors: [
        // This is how the meta tag appears in the original source code.
        ['meta[name="og:image"]', "value"],
        // This is how the meta tag appears in the DOM in Chrome.
        // The selector is included here to make the code work within the browser as well.
        ['meta[property="og:image"]', "content"],
        // This is the image that is shown on the page.
        // It can be slightly cropped compared to the original in the meta tag.
        ".image__article__top img",
      ],
    },

    content: {
      selectors: ["article.content"],
      clean: [
        ".breadcrumbs",
        ".hide-for-print",
        "aside",
        "header h2",
        ".image__article__top",
        ".content__author",
        ".copyright",
        ".callout-box",
      ],
    },
  },
  {
    domain: "www.linkedin.com",

    title: {
      selectors: [".article-title", "h1"],
    },

    author: {
      selectors: [
        ".main-author-card h3",
        ['meta[name="article:author"]', "value"],
        ".entity-name a[rel=author]",
      ],
    },

    date_published: {
      selectors: [
        ".base-main-card__metadata",
        ['time[itemprop="datePublished"]', "datetime"],
      ],

      timezone: "America/Los_Angeles",
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ".article-content__body",
        ["header figure", ".prose"],
        ".prose",
      ],

      clean: [".entity-image"],
    },
  },
  {
    domain: "blisterreview.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"], "h1.entry-title"],
    },

    author: {
      selectors: ["span.author-name"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ["time.entry-date", "datetime"],
        ['meta[itemprop="datePublished"]', "content"],
      ],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [
        ['meta[name="og:image"]', "value"],
        ['meta[property="og:image"]', "content"],
        ['meta[itemprop="image"]', "content"],
        ['meta[name="twitter:image"]', "content"],
        ["img.attachment-large", "src"],
      ],
    },

    content: {
      selectors: [
        [
          ".elementor-section-wrap",
          ".elementor-text-editor > p, .elementor-text-editor > ul > li, .attachment-large, .wp-caption-text",
        ],
      ],

      transforms: {
        figcaption: "p",
      },

      clean: [".comments-area"],
    },
  },
  {
    domain: "www.refinery29.com",

    title: {
      selectors: ["h1.title"],
    },

    author: {
      selectors: [".contributor"],
    },

    date_published: {
      selectors: [['meta[name="sailthru.date"]', "value"]],

      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        [".full-width-opener", ".article-content"],
        ".article-content",
        ".body",
      ],

      transforms: {
        "div.loading noscript": ($node) => {
          const imgHtml = $node.html();
          $node.parents(".loading").replaceWith(imgHtml);
        },

        ".section-image": "figure",

        ".section-image .content-caption": "figcaption",

        ".section-text": "p",
      },

      clean: [".story-share"],
    },
  },
  {
    domain: "www.nationalgeographic.com",

    title: {
      selectors: ["h1", "h1.main-title"],
    },

    author: {
      selectors: [".byline-component__contributors b span"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [".Article__Headline__Desc", ".article__deck"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        "section.Article__Content",
        [".parsys.content", ".__image-lead__"],
        ".content",
      ],

      transforms: {
        ".parsys.content": ($node, $) => {
          const $imageParent = $node.children().first();
          if ($imageParent.hasClass("imageGroup")) {
            const $dataAttrContainer = $imageParent
              .find(".media--medium__container")
              .children()
              .first();
            const imgPath1 = $dataAttrContainer.data("platform-image1-path");
            const imgPath2 = $dataAttrContainer.data("platform-image2-path");
            if (imgPath2 && imgPath1) {
              $node.prepend(
                $(`<div class="__image-lead__">
                  <img src="${imgPath1}"/>
                  <img src="${imgPath2}"/>
                </div>`)
              );
            }
          } else {
            const $imgSrc = $node
              .find(".image.parbase.section")
              .find(".picturefill")
              .first()
              .data("platform-src");
            if ($imgSrc) {
              $node.prepend(
                $(`<img class="__image-lead__" src="${$imgSrc}"/>`)
              );
            }
          }
        },
      },

      clean: [".pull-quote.pull-quote--small"],
    },
  },
  {
    domain: "biorxiv.org",

    title: {
      selectors: ["h1#page-title"],
    },

    author: {
      selectors: [
        "div.highwire-citation-biorxiv-article-top > div.highwire-cite-authors",
      ],
    },

    content: {
      selectors: ["div#abstract-1"],

      transforms: {},
    },
  },
  {
    domain: "weekly.ascii.jp",

    title: {
      selectors: ["article h1", 'h1[itemprop="headline"]'],
    },

    author: {
      selectors: ["p.author"],
    },

    date_published: {
      selectors: ["p.date", ['meta[name="odate"]', "value"]],

      format: "YYYY年MM月DD日 HH:mm",

      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div#contents_detail", "div.article"],

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "genius.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: ["h2 a"],
    },

    date_published: {
      selectors: [
        [
          "meta[itemprop=page_data]",
          "value",
          (res) => {
            const json = JSON.parse(res);
            return json.song.release_date;
          },
        ],
      ],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [
        [
          "meta[itemprop=page_data]",
          "value",
          (res) => {
            const json = JSON.parse(res);
            return json.song.album.cover_art_url;
          },
        ],
      ],
    },

    content: {
      selectors: [".lyrics"],

      transforms: {},
    },
  },
  {
    domain: "www.asahi.com",

    title: {
      selectors: ["main h1", ".ArticleTitle h1"],
    },

    author: {
      selectors: [['meta[name="article:author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="pubdate"]', "value"]],
    },

    dek: null,

    excerpt: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["main"],

      defaultCleaner: false,

      transforms: {},

      clean: ["div.AdMod", "div.LoginSelectArea", "time", "div.notPrint"],
    },
  },
  {
    domain: "www.rollingstone.com",

    title: {
      selectors: ["h1.l-article-header__row--title", "h1.content-title"],
    },

    author: {
      selectors: ["a.c-byline__link", "a.content-author.tracked-offpage"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        "time.content-published-date",
      ],

      timezone: "America/New_York",
    },

    dek: {
      selectors: ["h2.l-article-header__row--lead", ".content-description"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ".l-article-content",
        [".lead-container", ".article-content"],
        ".article-content",
      ],

      clean: [".c-related-links-wrapper", ".module-related"],
    },
  },
  {
    domain: "www.youtube.com",

    title: {
      selectors: [
        ['meta[name="title"]', "value"],
        ".watch-title",
        "h1.watch-title-container",
      ],
    },

    author: {
      selectors: [['link[itemprop="name"]', "content"], ".yt-user-info"],
    },

    date_published: {
      selectors: [['meta[itemProp="datePublished"]', "value"]],

      timezone: "GMT",
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      defaultCleaner: false,

      selectors: [
        "#player-container-outer",
        "ytd-expandable-video-description-body-renderer #description",
        ["#player-api", "#description"],
      ],
    },
  },
  {
    domain: "postlight.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [['meta[name="parsely-author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: ["h2.single-hero__abstract"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["main.post"],

      clean: [
        "section.pl-post-link",
        "aside",
        "section.insights_featured_case_studies",
      ],
    },
  },
  {
    domain: "thefederalistpapers.org",

    title: {
      selectors: ["h1.entry-title"],
    },

    author: {
      selectors: [".author-meta-title", "main span.entry-author-name"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".content"],

      clean: [
        "header",
        ".article-sharing",
        ".after-article",
        ".type-commenting",
        ".more-posts",
        ["p[style]"],
      ],
    },
  },
  {
    domain: "japan.cnet.com",

    title: {
      selectors: [".leaf-headline-ttl"],
    },

    author: {
      selectors: [".writer"],
    },

    date_published: {
      selectors: [".date"],
      format: "YYYY年MM月DD日 HH時mm分",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article_body"],

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "www.recode.net",

    title: {
      selectors: ["h1.c-page-title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: ["h2.c-entry-summary.p-dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ["figure.e-image--hero", ".c-entry-content"],
        ".c-entry-content",
      ],

      transforms: {},
    },
  },
  {
    domain: "www.sbnation.com",

    title: {
      selectors: ["h1.c-page-title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: ["p.c-entry-summary.p-dek", "h2.c-entry-summary.p-dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.c-entry-content"],

      transforms: {},
    },
  },
  {
    domain: "www.bustle.com",

    title: {
      selectors: ["h1", "h1.post-page__title"],
    },

    author: {
      selectors: ['a[href*="profile"]', "div.content-meta__author"],
    },

    date_published: {
      selectors: [["time", "datetime"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article", ".post-page__body"],

      transforms: {},
    },
  },
  {
    domain: "www.apartmenttherapy.com",
    title: {
      selectors: ["h1.headline"],
    },

    author: {
      selectors: [".PostByline__name"],
    },

    content: {
      selectors: ["div.post__content"],

      transforms: {
        'div[data-render-react-id="images/LazyPicture"]': ($node, $) => {
          const data = JSON.parse($node.attr("data-props"));
          const { src } = data.sources[0];
          const $img = $("<img />").attr("src", src);
          $node.replaceWith($img);
        },
      },
    },

    date_published: {
      selectors: [[".PostByline__timestamp[datetime]", "datetime"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [],
    },

    next_page_url: {
      selectors: [
        // enter selectors
      ],
    },

    excerpt: {
      selectors: [
        // enter selectors
      ],
    },
  },
  {
    domain: "www.npr.org",

    title: {
      selectors: ["h1", ".storytitle"],
    },

    author: {
      selectors: ["p.byline__name.byline__name--block"],
    },

    date_published: {
      selectors: [
        [".dateblock time[datetime]", "datetime"],
        ['meta[name="date"]', "value"],
      ],
    },

    lead_image_url: {
      selectors: [
        ['meta[name="og:image"]', "value"],
        ['meta[name="twitter:image:src"]', "value"],
      ],
    },

    content: {
      selectors: [".storytext"],

      transforms: {
        ".bucketwrap.image": "figure",
        ".bucketwrap.image .credit-caption": "figcaption",
      },

      clean: ["div.enlarge_measure"],
    },
  },
  {
    domain: "www.msn.com",
    title: {
      selectors: [
        "h1",
        // enter title selectors
      ],
    },

    author: {
      selectors: [
        "span.authorname-txt",
        // enter author selectors
      ],
    },

    content: {
      selectors: [
        "div.richtext",
        // enter content selectors
      ],

      transforms: [],

      clean: ["span.caption"],
    },

    date_published: {
      selectors: ["span.time"],
    },

    lead_image_url: {
      selectors: [],
    },

    dek: {
      selectors: [],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "www.ossnews.jp",

    title: {
      selectors: ["#alpha-block h1.hxnewstitle"],
    },

    author: null,

    date_published: {
      selectors: ["p.fs12"],
      format: "YYYY年MM月DD日 HH:mm",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#alpha-block .section:has(h1.hxnewstitle)"],

      defaultCleaner: false,

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "www.phoronix.com",

    title: {
      selectors: ["article h1", "article header"],
    },

    author: {
      selectors: [".author a:first-child"],
    },

    date_published: {
      selectors: [".author"],
      // 1 June 2019 at 08:34 PM EDT
      format: "D MMMM YYYY at hh:mm",
      timezone: "America/New_York",
    },

    dek: null,

    lead_image_url: null,

    content: {
      selectors: [".content"],

      transforms: {},
    },
  },
  {
    domain: "sciencefly.com",

    title: {
      selectors: [".entry-title", ".cb-entry-title", ".cb-single-title"],
    },

    author: {
      selectors: ["div.cb-author", "div.cb-author-title"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [["div.theiaPostSlider_slides img", "src"]],
    },

    content: {
      selectors: ["div.theiaPostSlider_slides"],

      transforms: {},
    },
  },
  {
    domain: "www.littlethings.com",
    title: {
      selectors: [
        'h1[class*="PostHeader"]',
        "h1.post-title",
        // enter title selectors
      ],
    },

    author: {
      selectors: [
        'div[class^="PostHeader__ScAuthorNameSection"]',
        ['meta[name="author"]', "value"],
        // enter author selectors
      ],
    },

    content: {
      selectors: [
        // enter content selectors
        'section[class*="PostMainArticle"]',
        ".mainContentIntro",
        ".content-wrapper",
      ],

      transforms: [],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "www.ladbible.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: ["[class*=Byline]"],
    },

    date_published: {
      selectors: ["time"],
      timezone: "Europe/London",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["[class*=ArticleContainer]"],
      clean: [
        "time",
        "source",
        'a[href^="https://www.ladbible.com/"]',
        "picture",
        "[class*=StyledCardBlock]",
      ],
    },
  },
  {
    domain: "timesofindia.indiatimes.com",

    title: {
      selectors: ["h1"],
    },

    extend: {
      reporter: {
        selectors: ["div.byline"],
        transforms: {},
      },
    },

    date_published: {
      selectors: [".byline"],
      format: "MMM D, YYYY, HH:mm z",
      timezone: "Asia/Kolkata",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.contentwrapper:has(section)"],
      defaultCleaner: false,

      clean: [
        "section",
        "h1",
        ".byline",
        ".img_cptn",
        ".icon_share_wrap",
        'ul[itemtype="https://schema.org/BreadcrumbList"]',
      ],
    },
  },
  {
    domain: "buzzap.jp",

    title: {
      selectors: ["h1.entry-title"],
    },

    author: null,

    date_published: {
      selectors: [["time.entry-date", "datetime"]],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.ctiframe"],

      defaultCleaner: false,

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "gothamist.com",

    supportedDomains: [
      "chicagoist.com",
      "laist.com",
      "sfist.com",
      "shanghaiist.com",
      "dcist.com",
    ],

    title: {
      selectors: ["h1", ".entry-header h1"],
    },

    author: {
      // There are multiple article-metadata and byline-author classes, but the main article's is the 3rd child of the l-container class
      selectors: [".article-metadata:nth-child(3) .byline-author", ".author"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        "abbr",
        "abbr.published",
      ],

      timezone: "America/New_York",
    },

    dek: {
      selectors: [null],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article-body", ".entry-body"],

      transforms: {
        "div.image-none": "figure",
        ".image-none i": "figcaption",
        "div.image-left": "figure",
        ".image-left i": "figcaption",
        "div.image-right": "figure",
        ".image-right i": "figcaption",
      },

      clean: [
        ".image-none br",
        ".image-left br",
        ".image-right br",
        ".galleryEase",
      ],
    },
  },
  {
    domain: "www.opposingviews.com",

    title: {
      selectors: ["h1.m-detail-header--title", "h1.title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"], "div.date span span a"],
    },

    date_published: {
      selectors: [
        ['meta[name="published"]', "value"],
        ['meta[name="publish_date"]', "value"],
      ],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".m-detail--body", ".article-content"],

      clean: [".show-for-small-only"],
    },
  },
  {
    domain: "www.cbssports.com",

    title: {
      selectors: [".Article-headline", ".article-headline"],
    },

    author: {
      selectors: [".ArticleAuthor-nameText", ".author-name"],
    },

    date_published: {
      selectors: [['meta[itemprop="datePublished"]', "value"]],
      timezone: "UTC",
    },

    dek: {
      selectors: [".Article-subline", ".article-subline"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article"],

      transforms: {},
    },
  },
  {
    domain: "twitter.com",

    content: {
      transforms: {
        // We're transforming essentially the whole page here.
        // Twitter doesn't have nice selectors, so our initial
        // selector grabs the whole page, then we're re-writing
        // it to fit our needs before we clean it up.
        ".permalink[role=main]": ($node, $) => {
          const tweets = $node.find(".tweet");
          const $tweetContainer = $('<div id="TWEETS_GO_HERE"></div>');
          $tweetContainer.append(tweets);
          $node.replaceWith($tweetContainer);
        },

        // Twitter wraps @ with s, which
        // renders as a strikethrough
        s: "span",
      },

      selectors: [".permalink[role=main]"],

      defaultCleaner: false,

      clean: [".stream-item-footer", "button", ".tweet-details-fixer"],
    },

    author: {
      selectors: [".tweet.permalink-tweet .username"],
    },

    date_published: {
      selectors: [
        [".permalink-tweet ._timestamp[data-time-ms]", "data-time-ms"],
      ],
    },
  },
  {
    domain: "www.jnsa.org",

    title: {
      selectors: ["#wgtitle h2"],
    },

    author: null,

    date_published: null,

    dek: null,

    excerpt: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#main_area"],

      transforms: {},

      clean: ["#pankuzu", "#side"],
    },
  },
  {
    domain: "www.buzzfeed.com",

    supportedDomains: ["www.buzzfeednews.com"],

    title: {
      selectors: [
        "h1.embed-headline-title",
        // enter title selectors
      ],
    },

    author: {
      selectors: [
        'a[data-action="user/username"]',
        "byline__author",
        ['meta[name="author"]', "value"],
        // enter author selectors
      ],
    },

    content: {
      selectors: [
        [
          'div[class^="featureimage_featureImageWrapper"]',
          ".js-subbuzz-wrapper",
        ],
        [".js-subbuzz-wrapper"],
      ],

      defaultCleaner: false,

      transforms: {
        h2: "b",

        "div.longform_custom_header_media": ($node) => {
          if ($node.has("img") && $node.has(".longform_header_image_source")) {
            return "figure";
          }

          return null;
        },

        "figure.longform_custom_header_media .longform_header_image_source":
          "figcaption",
      },

      clean: [
        ".instapaper_ignore",
        ".suplist_list_hide .buzz_superlist_item .buzz_superlist_number_inline",
        ".share-box",
        ".print",
        ".js-inline-share-bar",
        ".js-ad-placement",
      ],
    },

    date_published: {
      selectors: [["time[datetime]", "datetime"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [".embed-headline-description"],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "247sports.com",

    title: {
      selectors: ["title", "article header h1"],
    },

    author: {
      selectors: [".article-cnt__author", ".author"],
    },

    date_published: {
      selectors: [["time[data-published]", "data-published"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article-body", "section.body.article"],

      transforms: {},
    },
  },
  {
    domain: "www.al.com",

    title: {
      selectors: [['meta[name="title"]', "value"]],
    },

    author: {
      selectors: [['meta[name="article_author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article_date_original"]', "value"]],
      timezone: "EST",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".entry-content"],

      transforms: {},
    },
  },
  {
    domain: "www.fool.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [
        ['meta[name="author"]', "value"],
        ".author-inline .author-name",
      ],
    },

    date_published: {
      selectors: [['meta[name="date"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"], "header h2"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".tailwind-article-body", ".article-content"],

      transforms: {
        ".caption img": ($node) => {
          const src = $node.attr("src");
          $node.parent().replaceWith(`<figure><img src="${src}"/></figure>`);
        },
        ".caption": "figcaption",
      },

      clean: ["#pitch"],
    },
  },
  {
    domain: "news.mynavi.jp",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [
        "a.articleHeader_name",
        "main div.article-author a.article-author__name",
      ],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article-body", "main article div"],

      transforms: {
        img: ($node) => {
          const src = $node.attr("data-original");
          if (src !== "") {
            $node.attr("src", src);
          }
        },
      },
    },
  },
  {
    domain: "www.miamiherald.com",

    title: {
      selectors: ["h1.title"],
    },

    date_published: {
      selectors: ["p.published-date"],

      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.dateline-storybody"],

      transforms: {},
    },
  },
  {
    domain: "japan.zdnet.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [['meta[name="cXenseParse:author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article_body"],

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "www.msnbc.com",

    title: {
      selectors: ["h1", "h1.is-title-pane"],
    },

    author: {
      selectors: [".byline-name", ".author"],
    },

    date_published: {
      selectors: [
        ['meta[itemprop="datePublished"]', "value"],
        ['meta[name="DC.date.issued"]', "value"],
      ],
    },

    dek: {
      selectors: [['meta[name="description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".article-body__content", ".pane-node-body"],

      transforms: {
        ".pane-node-body": ($node, $) => {
          const [selector, attr] =
            WwwMsnbcComExtractor.lead_image_url.selectors[0];
          const src = $(selector).attr(attr);
          if (src) {
            $node.prepend(`<img src="${src}" />`);
          }
        },
      },
    },
  },
  {
    domain: "mashable.com",

    title: {
      selectors: ["header h1", "h1.title"],
    },

    author: {
      selectors: [
        ['meta[name="article:author"]', "value"],
        "span.author_name a",
      ],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#article", "section.article-content.blueprint"],

      transforms: {
        ".image-credit": "figcaption",
      },
    },
  },
  {
    domain: "www.abendblatt.de",

    title: {
      selectors: ["h2.article__header__headline"],
    },

    author: {
      selectors: ["span.author-info__name-text"],
    },

    date_published: {
      selectors: [
        ["time.teaser-stream-time", "datetime"],
        ["time.article__header__date", "datetime"],
      ],
    },

    dek: {
      selectors: [['meta[name="description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article__body"],

      transforms: {
        p: ($node) => {
          if (!$node.hasClass("obfuscated")) return null;
          let o = "";
          let n = 0;
          for (let i = $node.text(); n < i.length; n += 1) {
            const r = i.charCodeAt(n);
            r === 177
              ? (o += "%")
              : r === 178
              ? (o += "!")
              : r === 180
              ? (o += ";")
              : r === 181
              ? (o += "=")
              : r === 32
              ? (o += " ")
              : r === 10
              ? (o += "\n")
              : r > 33 && (o += String.fromCharCode(r - 1));
          }

          $node.html(o);
          $node.removeClass("obfuscated");
          $node.addClass("deobfuscated");
          return null;
        },
        div: ($node) => {
          if (!$node.hasClass("obfuscated")) return null;
          let o = "";
          let n = 0;
          for (let i = $node.text(); n < i.length; n += 1) {
            const r = i.charCodeAt(n);
            r === 177
              ? (o += "%")
              : r === 178
              ? (o += "!")
              : r === 180
              ? (o += ";")
              : r === 181
              ? (o += "=")
              : r === 32
              ? (o += " ")
              : r === 10
              ? (o += "\n")
              : r > 33 && (o += String.fromCharCode(r - 1));
          }

          $node.html(o);
          $node.removeClass("obfuscated");
          $node.addClass("deobfuscated");
          return null;
        },
      },
    },
  },
  {
    domain: "github.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [
        // enter author selectors
      ],
    },

    date_published: {
      selectors: [
        ["relative-time[datetime]", "datetime"],
        ['span[itemprop="dateModified"] relative-time', "datetime"],
      ],
    },

    dek: {
      selectors: [
        ['meta[name="description"]', "value"],
        'span[itemprop="about"]',
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [["#readme article"]],

      transforms: {},
    },
  },
  {
    domain: "sect.iij.ad.jp",

    title: {
      selectors: ["div.title-box-inner h1", "h3"],
    },

    author: {
      selectors: ["p.post-author a", "dl.entrydate dd"],
    },

    date_published: {
      selectors: ["time"],
      format: "YYYY年MM月DD日",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".entry-inner", "#article"],

      transforms: {},

      clean: ["dl.entrydate"],
    },
  },
  {
    domain: "www.qdaily.com",

    title: {
      selectors: ["h2", "h2.title"],
    },

    author: {
      selectors: [".name"],
    },

    date_published: {
      selectors: [[".date.smart-date", "data-origindate"]],
    },

    dek: {
      selectors: [".excerpt"],
    },

    lead_image_url: {
      selectors: [[".article-detail-hd img", "src"]],
    },

    content: {
      selectors: [".detail"],

      clean: [".lazyload", ".lazylad", ".lazylood"],
    },
  },
  {
    domain: "www.westernjournalism.com",

    title: {
      selectors: ["title", "h1.entry-title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="DC.date.issued"]', "value"]],
    },

    dek: {
      selectors: [".subtitle"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.article-sharing.top + div"],

      clean: [".ad-notice-small"],
    },
  },
  {
    domain: "ici.radio-canada.ca",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [['meta[name="dc.creator"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="dc.date.created"]', "value"]],
      format: "YYYY-MM-DD|HH[h]mm",
      timezone: "America/New_York",
    },

    dek: {
      selectors: ["div.lead-container", ".bunker-component.lead"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        "section.document-content-style",
        [".main-multimedia-item", ".news-story-content"],
      ],

      transforms: {},
    },
  },
  {
    domain: "www.theguardian.com",

    title: {
      selectors: ["h1", ".content__headline"],
    },

    author: {
      selectors: ['address[data-link-name="byline"]', "p.byline"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: ['div[data-gu-name="standfirst"]', ".content__standfirst"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#maincontent", ".content__article-body"],

      clean: [".hide-on-mobile", ".inline-icon"],
    },
  },
  {
    domain: "fortune.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [".MblGHNMJ"],

      timezone: "UTC",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [["picture", "article.row"], "article.row"],

      transforms: {},
    },
  },
  {
    domain: "www.engadget.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: ['a.th-meta[data-ylk*="subsec:author"]'],
    },

    // Engadget stories have publish dates, but the only representation of them on the page
    // is in a format like "2h ago". There are also these tags with blank values:
    // <meta class="swiftype" name="published_at" data-type="date" value="">
    date_published: {
      selectors: [
        // enter selectors
      ],
    },

    dek: {
      selectors: ['div[class*="o-title_mark"] div'],
    },

    // Engadget stories do have lead images specified by an og:image meta tag, but selecting
    // the value attribute of that tag fails. I believe the "&#x2111;" sequence of characters
    // is triggering this inability to select the attribute value.
    lead_image_url: {
      selectors: [
        // enter selectors
      ],
    },

    content: {
      selectors: [
        [
          // Some figures will be inside div.article-text, but some header figures/images
          // will not.
          "#page_body figure:not(div.article-text figure)",
          "div.article-text",
        ],
      ],

      transforms: {},
    },
  },
  {
    domain: "www.eonline.com",

    title: {
      selectors: ["h1.article-detail__title", "h1.article__title"],
    },

    author: {
      selectors: [".article-detail__meta__author", ".entry-meta__author a"],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ['meta[itemprop="datePublished"]', "value"],
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        [".article-detail__main-content section"],
        [".post-content section, .post-content div.post-content__image"],
      ],

      transforms: {
        "div.post-content__image": "figure",
        "div.post-content__image .image__credits": "figcaption",
      },
    },
  },
  {
    domain: "www.rbbtoday.com",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [".writer.writer-name"],
    },

    date_published: {
      selectors: [["header time", "datetime"]],
    },

    dek: {
      selectors: [['meta[name="description"]', "value"], ".arti-summary"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".arti-content"],

      transforms: {},

      clean: [".arti-giga"],
    },
  },
  {
    domain: "www.publickey1.jp",

    title: {
      selectors: ["h1"],
    },

    author: {
      selectors: [".bloggerinchief p:first-of-type", "#subcol p:has(img)"],
    },

    date_published: {
      selectors: ["div.pubdate"],
      format: "YYYY年MM月DD日",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#maincol"],

      defaultCleaner: false,

      transforms: {},

      clean: ["#breadcrumbs", "div.sbm", "div.ad_footer"],
    },
  },
  {
    domain: "abcnews.go.com",

    title: {
      selectors: ['div[class*="Article_main__body"] h1', ".article-header h1"],
    },

    author: {
      selectors: [".ShareByline span:nth-child(2)", ".authors"],
      clean: [".author-overlay", ".by-text"],
    },

    date_published: {
      selectors: [".ShareByline", ".timestamp"],
      format: "MMMM D, YYYY h:mm a",
      timezone: "America/New_York",
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article", ".article-copy"],

      transforms: {},
    },
  },
  {
    domain: "www.cnn.com",

    title: {
      selectors: ["h1.pg-headline", "h1"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        // a more specific selector to grab the lead image and the body
        [".media__video--thumbnail", ".zn-body-text"],
        // a fallback for the above
        ".zn-body-text",
        'div[itemprop="articleBody"]',
      ],

      transforms: {
        ".zn-body__paragraph, .el__leafmedia--sourced-paragraph": ($node) => {
          const $text = $node.html();
          if ($text) {
            return "p";
          }

          return null;
        },

        // this transform cleans the short, all-link sections linking
        // to related content but not marked as such in any way.
        ".zn-body__paragraph": ($node) => {
          if ($node.has("a")) {
            if ($node.text().trim() === $node.find("a").text().trim()) {
              $node.remove();
            }
          }
        },

        ".media__video--thumbnail": "figure",
      },
    },
  },
  {
    domain: "www.androidcentral.com",

    title: {
      selectors: ["h1", "h1.main-title"],
    },

    author: {
      selectors: [['meta[name="parsely-author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#article-body"],

      clean: [".intro", "blockquote"],
    },
  },
  {
    domain: "epaper.zeit.de",

    title: {
      selectors: ["p.title"],
    },

    author: {
      selectors: [".article__author"],
    },

    date_published: null,

    excerpt: {
      selectors: ["subtitle"],
    },

    lead_image_url: null,

    content: {
      selectors: [".article"],

      transforms: {
        "p.title": "h1",
        ".article__author": "p",
        byline: "p",
        linkbox: "p",
      },

      clean: ["image-credits", "box[type=citation]"],
    },
  },
  {
    domain: "www.nytimes.com",

    title: {
      selectors: [
        'h1[data-testid="headline"]',
        "h1.g-headline",
        'h1[itemprop="headline"]',
        "h1.headline",
        "h1 .balancedHeadline",
      ],
    },

    author: {
      selectors: [
        ['meta[name="author"]', "value"],
        ".g-byline",
        ".byline",
        ['meta[name="byl"]', "value"],
      ],
    },

    content: {
      selectors: [
        "div.g-blocks",
        'section[name="articleBody"]',
        "article#story",
      ],

      transforms: {
        "img.g-lazy": ($node) => {
          let src = $node.attr("src");
          const width = 640;

          src = src.replace("{{size}}", width);
          $node.attr("src", src);
        },
      },

      clean: [
        ".ad",
        "header#story-header",
        ".story-body-1 .lede.video",
        ".visually-hidden",
        "#newsletter-promo",
        ".promo",
        ".comments-button",
        ".hidden",
        ".comments",
        ".supplemental",
        ".nocontent",
        ".story-footer-links",
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ['meta[name="article:published"]', "value"],
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: null,

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "www.yahoo.com",
    title: {
      selectors: [
        "header.canvas-header",
        // enter title selectors
      ],
    },

    author: {
      selectors: [
        "span.provider-name",
        // enter author selectors
      ],
    },

    content: {
      selectors: [
        // enter content selectors
        ".content-canvas",
      ],

      transforms: [],

      clean: [".figure-caption"],
    },

    date_published: {
      selectors: [["time.date[datetime]", "datetime"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [
        // enter dek selectors
      ],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "www.latimes.com",

    title: {
      selectors: ["h1.headline", ".trb_ar_hl"],
    },

    author: {
      selectors: [
        'a[data-click="standardBylineAuthorName"]',
        ['meta[name="author"]', "value"],
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ['meta[itemprop="datePublished"]', "value"],
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [".page-article-body", ".trb_ar_main"],

      transforms: {
        ".trb_ar_la": ($node) => {
          const $figure = $node.find("figure");
          $node.replaceWith($figure);
        },
      },

      clean: [".trb_ar_by", ".trb_ar_cr"],
    },
  },
  {
    domain: "www.sanwa.co.jp",

    title: {
      selectors: ["#newsContent h1"],
    },

    author: null,

    date_published: {
      selectors: ["dl.date"],
      format: "YYYY.MM.DD",
      timezone: "Asia/Tokyo",
    },

    dek: {
      selectors: [['meta[name="og:description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["#newsContent"],

      defaultCleaner: false,

      transforms: {},

      clean: ["#smartphone", "div.sns_box", "div.contentFoot"],
    },
  },
  {
    domain: "qz.com",

    title: {
      selectors: ["article header h1"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ["time[datetime]", "datetime"],
      ],
    },

    lead_image_url: {
      selectors: [
        ['meta[name="og:image"]', "value"],
        ['meta[property="og:image"]', "content"],
        ['meta[name="twitter:image"]', "content"],
      ],
    },

    content: {
      selectors: ["#article-content"],

      transforms: {},
    },
  },
  {
    domain: "www.inquisitr.com",

    title: {
      selectors: ["h1.entry-title.story--header--title"],
    },

    author: {
      selectors: ["div.story--header--author"],
    },

    date_published: {
      selectors: [['meta[name="datePublished"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["article.story", ".entry-content."],

      clean: [
        ".post-category",
        ".story--header--socials",
        ".story--header--content",
      ],
    },
  },
  {
    domain: "www.oreilly.co.jp",

    title: {
      selectors: [['meta[name="og:title"]', "value"], "h3"],
    },

    author: {
      selectors: ['span[itemprop="author"]', 'li[itemprop="author"]'],
    },

    date_published: {
      selectors: [
        ['dd[itemprop="datePublished"]', "content"],
        ['meta[itemprop="datePublished"]', "value"],
      ],
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: {
      selectors: [
        ['meta[name="og:image:secure_url"]', "value"],
        ['meta[name="og:image"]', "value"],
      ],
    },

    content: {
      selectors: ["section.detail", "#content"],

      defaultCleaner: false,

      transforms: {},

      clean: [".social-tools"],
    },
  },
  {
    domain: "wired.jp",

    title: {
      selectors: ['h1[data-testid="ContentHeaderHed"]', "h1.post-title"],
    },

    author: {
      selectors: [
        ['meta[name="article:author"]', "value"],
        'p[itemprop="author"]',
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ["time", "datetime"],
      ],
    },

    dek: {
      selectors: ['div[class^="ContentHeaderDek"]', ".post-intro"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        'div[data-attribute-verso-pattern="article-body"]',
        "article.article-detail",
      ],

      transforms: {
        "img[data-original]": ($node) => {
          const dataOriginal = $node.attr("data-original");
          const src = $node.attr("src");
          const url = URL.resolve(src, dataOriginal);
          $node.attr("src", url);
        },
      },

      clean: [".post-category", "time", "h1.post-title", ".social-area-syncer"],
    },
  },
  {
    domain: "www.wired.com",
    title: {
      selectors: [
        'h1[data-testId="ContentHeaderHed"]',
        // enter title selectors
      ],
    },

    author: {
      selectors: [
        ['meta[name="article:author"]', "value"],
        'a[rel="author"]',
        // enter author selectors
      ],
    },

    content: {
      selectors: [
        "article.article.main-content",
        "article.content",
        // enter content selectors
      ],

      transforms: [],

      clean: [".visually-hidden", "figcaption img.photo", ".alert-message"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    dek: {
      selectors: [],
    },

    next_page_url: null,

    excerpt: null,
  },
  {
    domain: "jvndb.jvn.jp",

    title: {
      selectors: ["title"],
    },

    author: null,

    date_published: {
      selectors: ["div.modifytxt:nth-child(2)"],
      format: "YYYY/MM/DD",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: null,

    content: {
      selectors: ["#news-list"],

      defaultCleaner: false,

      transforms: {},

      clean: [],
    },
  },
  {
    domain: "www.vox.com",

    title: {
      selectors: ["h1.c-page-title"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [".p-dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ["figure.e-image--hero", ".c-entry-content"],
        ".c-entry-content",
      ],

      transforms: {
        "figure .e-image__image noscript": ($node) => {
          const imgHtml = $node.html();
          $node
            .parents(".e-image__image")
            .find(".c-dynamic-image")
            .replaceWith(imgHtml);
        },

        "figure .e-image__meta": "figcaption",
      },
    },
  },
  {
    domain: "www.si.com",

    title: {
      selectors: ["h1", "h1.headline"],
    },

    author: {
      selectors: [['meta[name="author"]', "value"]],
    },

    date_published: {
      selectors: [['meta[name="published"]', "value"]],

      timezone: "America/New_York",
    },

    dek: {
      selectors: [".m-detail-header--dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ".m-detail--body",
        ["p", ".marquee_large_2x", ".component.image"],
      ],

      transforms: {
        noscript: ($node) => {
          const $children = $node.children();
          if ($children.length === 1 && $children.get(0).tagName === "img") {
            return "figure";
          }

          return null;
        },
      },

      clean: [
        [".inline-thumb", ".primary-message", ".description", ".instructions"],
      ],
    },
  },
  {
    domain: "pagesix.com",

    supportedDomains: ["nypost.com"],

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [".byline"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: [['meta[name="description"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ["#featured-image-wrapper", ".entry-content"],
        ".entry-content",
      ],

      transforms: {
        "#featured-image-wrapper": "figure",
        ".wp-caption-text": "figcaption",
      },

      clean: [".modal-trigger"],
    },
  },
  {
    domain: "forward.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: [
        ".post-author a",
        ".author-name",
        ['meta[name="sailthru.author"]', "value"],
      ],
    },

    date_published: {
      selectors: [
        ['meta[name="article:published_time"]', "value"],
        ['meta[name="date"]', "value"],
      ],
    },

    dek: {
      selectors: [
        // enter selectors
      ],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ".content-container article",
        [".post-item-media-wrap", ".post-item p"],
      ],

      clean: [".post-author", ".donate-box", ".message", ".subtitle"],
    },
  },
  {
    domain: "www.thepennyhoarder.com",

    title: {
      selectors: [['meta[name="dcterms.title"]', "value"]],
    },

    author: {
      selectors: [['link[rel="author"]', "title"]],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        [".post-img", ".post-text"],
        ".post-text",
        ".single-post-content-inner",
      ],

      transforms: {},
    },
  },
  {
    domain: "techlog.iij.ad.jp",

    title: {
      selectors: ["h1.entry-title"],
    },

    author: {
      selectors: ['a[rel="author"]'],
    },

    date_published: {
      selectors: [["time.entry-date", "datetime"]],
    },

    dek: null,

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.entry-content"],

      defaultCleaner: false,

      transforms: {},

      clean: [".wp_social_bookmarking_light"],
    },
  },
  {
    domain: "www.elecom.co.jp",

    title: {
      selectors: ["title"],
    },

    author: null,

    date_published: {
      selectors: ["p.section-last"],
      format: "YYYY.MM.DD",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: null,

    content: {
      selectors: ["td.TableMain2"],

      defaultCleaner: false,

      transforms: {
        table: ($node) => {
          $node.attr("width", "auto");
        },
      },

      clean: [],
    },
  },
  {
    domain: "www.cnet.com",

    title: {
      selectors: [['meta[name="og:title"]', "value"]],
    },

    author: {
      selectors: ["span.author", "a.author"],
    },

    date_published: {
      selectors: ["time"],

      timezone: "America/Los_Angeles",
    },

    dek: {
      selectors: [".c-head_dek", ".article-dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: [
        ["img.__image-lead__", ".article-main-body"],
        ".article-main-body",
      ],

      transforms: {
        "figure.image": ($node) => {
          const $img = $node.find("img");
          $img.attr("width", "100%");
          $img.attr("height", "100%");
          $img.addClass("__image-lead__");
          $node.remove(".imgContainer").prepend($img);
        },
      },
    },
  },
  {
    domain: "www.ipa.go.jp",

    title: {
      selectors: ["h1"],
    },

    author: null,

    date_published: {
      selectors: ["p.ipar_text_right"],
      format: "YYYY年M月D日",
      timezone: "Asia/Tokyo",
    },

    dek: null,

    lead_image_url: null,

    content: {
      selectors: ["#ipar_main"],

      defaultCleaner: false,

      transforms: {},

      clean: ["p.ipar_text_right"],
    },
  },
  {
    domain: "observer.com",

    title: {
      selectors: ["h1.entry-title"],
    },

    author: {
      selectors: [".author", ".vcard"],
    },

    date_published: {
      selectors: [['meta[name="article:published_time"]', "value"]],
    },

    dek: {
      selectors: ["h2.dek"],
    },

    lead_image_url: {
      selectors: [['meta[name="og:image"]', "value"]],
    },

    content: {
      selectors: ["div.entry-content"],

      transforms: {},
    },
  },
];


var output = [];

for (var extractor of domainSpecificExtractors){
  //only allow these attributes
  // "domain", "title", "author", "date_published","content", 

  var { domain, title, author, date_published, content, supportedDomains } =
    extractor;

    //alternative domains like deadspin/gizmodo/etc
    supportedDomains?.filter((supportedDomain) => supportedDomain !== domain)
      .forEach((supportedDomain) => {
      output.push({
        domain: supportedDomain.replace("www.", ""),
        title: title?.selectors,
        author: author?.selectors,
        date: date_published?.selectors,
        content: content?.selectors,
        remove: content?.clean,
      });
    });

    output.push({
      domain: domain.replace("www.", ""),
      title: title?.selectors,
      author: author?.selectors,
      date: date_published?.selectors,
      content: content?.selectors,
      remove: content?.clean,
    })

}

//stringify the output and save to file
var fs = require('fs');
fs.writeFile('output.json', JSON.stringify(output, 0, 2), function (err) {
  if (err) throw err;
  console.log('Saved!');
});