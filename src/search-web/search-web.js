/**
 * Search Web via SearXNG metasearch of all major search engines.
 * Options are 10 search categories, recency, and how many
 * times to retry other domains if first time fails.
 * @param {string} query
 * @param {object} options
 * @returns {Promise<Array[]>} {title, url, snippet, engines, cached}
 * @category Search
 */
export async function searchWeb(query, options = {}) {
  const {
    categoryIndex = 0,
    recencyIndex = 0,
    selectedDomain = null,
    maxRetries = 3,
  } = options;

  const CATEGORY_LIST = [
    "general",
    "videos",
    "news",
    "images",
    "science",
    "map",
    "music",
    "it",
    "files",
    "social+media",
  ];
  const RECENCY_LIST = ["", "day", "week", "month", "year"];

  const SEARX_DOMAINS =
    "baresearch.org,copp.gg,darmarit.org,etsi.me,fairsuch.net,nogoo.me,northboot.xyz,nyc1.sx.ggtyler.dev,ooglester.com,opnxng.com,paulgo.io,priv.au,s.mble.dk,s.trung.fun,search.blitzw.in,search.bus-hit.me,search.charliewhiskey.net,search.citw.lgbt,search.darkness.services,search.datura.network,search.dotone.nl,search.einfachzocken.eu,search.gcomm.ch,search.hbubli.cc,search.im-in.space,search.incogniweb.net,search.indst.eu,search.inetol.net,search.leptons.xyz,search.mdosch.de,search.nadeko.net,search.nerdvpn.de,search.ngn.tf,search.ononoki.org,search.privacyredirect.com,search.projectsegfau.lt,search.rhscz.eu,search.rowie.at,search.sapti.me,search.smnz.de,search.tommy-tran.com,searx.aleteoryx.me,searx.ankha.ac,searx.be,searx.catfluori.de,searx.colbster937.dev,searx.daetalytica.io,searx.dresden.network,searx.electroncash.de,searx.foss.family,searx.hu,searx.juancord.xyz,searx.lunar.icu,searx.mv-software.de,searx.mxchange.org,searx.namejeff.xyz,searx.nobulart.com,searx.numeriquement.fr,searx.oakleycord.dev,searx.ox2.fr,searx.perennialte.ch,searx.rhscz.eu,searx.ro,searx.sev.monster,searx.thefloatinglab.world,searx.tiekoetter.com,searx.tuxcloud.net,searx.work,searx.zhenyapav.com,searxng.brihx.fr,searxng.ch,searxng.hweeren.com,searxng.online,searxng.shreven.org,searxng.site,skyrimhater.com,sx.ca.zorby.top,sx.catgirl.cloud,sx.thatxtreme.dev,sx.zorby.top,www.gruble.de,www.jabber-germany.de,xo.wtf".split(
      ","
    );
  try {
    //select a random domain if none is provided
    const searchDomain =
      selectedDomain ||
      SEARX_DOMAINS[Math.floor(Math.random() * SEARX_DOMAINS.length)];

    const category = CATEGORY_LIST[categoryIndex]; // Using the first category as default
    const timeRange = RECENCY_LIST[recencyIndex]; // Using the first time range as default

    const url = `https://${searchDomain}/search?q=${encodeURIComponent(query)}&category_${category}=1&language=auto&time_range=${timeRange}&safesearch=0`;

    const resultJSON = await (
      await fetch(url, { headers: { "accept-language": "en" } })
    ).text();

    let results = [];
    const resultRegex = /<article class="result[^>]*>[\s\S]*?<\/article>/g;
    const titleUrlRegex = /<h3><a href="([^"]*)"[^>]*>(.*?)<\/a><\/h3>/;
    const snippetRegex = /<p class="content">\s*(.*?)\s*<\/p>/;
    const enginesRegex = /<span>(bing|duckduckgo|yahoo|google)<\/span>/g;
    const linksRegex =
      /<a href="([^"]*)" class="(cache_link|proxyfied_link)"[^>]*>(cached|proxied)<\/a>/g;

    let match;
    while ((match = resultRegex.exec(resultJSON)) !== null) {
      const resultHtml = match[0];
      const titleUrlMatch = titleUrlRegex.exec(resultHtml);
      const snippetMatch = snippetRegex.exec(resultHtml);

      if (titleUrlMatch && titleUrlMatch[1] && titleUrlMatch[2]) {
        const url = titleUrlMatch[1];
        const title = titleUrlMatch[2].replace(/<\/?[^>]+(>|$)/g, "");
        const snippet = snippetMatch
          ? snippetMatch[1].replace(/<\/?[^>]+(>|$)/g, "")
          : "";

        const engines = [];
        let engineMatch;
        while ((engineMatch = enginesRegex.exec(resultHtml)) !== null) {
          engines.push(engineMatch[1]);
        }

        let cached = null;
        let linkMatch;
        while ((linkMatch = linksRegex.exec(resultHtml)) !== null) {
          cached = linkMatch[1];
        }

        results.push({ title, url, snippet, engines, cached });
      }
    }

    if (results.length === 0 && maxRetries > 0) {
      console.log("No results found with ", searchDomain);
      results = await searchWeb(query, {
        categoryIndex,
        recencyIndex,
        maxRetries: maxRetries - 1,
      });
    }

    return results;
  } catch (error) {
    console.error(`Error fetching search results: ${error.message}`);
    return [];
  }
}
