import {
  discard_unwanted,
  extract_url_date,
  idiosyncrasies_search,
  img_search,
  json_search,
  regex_parse,
  pattern_search,
  try_date_expr,
  DATE_EXPRESSIONS,
  FAST_PREPEND,
  SLOW_PREPEND,
  FREE_TEXT_EXPRESSIONS,
  MAX_SEGMENT_LEN,
  MIN_SEGMENT_LEN,
  YEAR_PATTERN,
  YMD_PATTERN,
  COPYRIGHT_PATTERN,
  TIMESTAMP_PATTERN,
  THREE_PATTERN,
  THREE_CATCH,
  THREE_LOOSE_PATTERN,
  THREE_LOOSE_CATCH,
  SELECT_YMD_PATTERN,
  SELECT_YMD_YEAR,
  YMD_YEAR,
  DATESTRINGS_PATTERN,
  DATESTRINGS_CATCH,
  SLASHES_PATTERN,
  SLASHES_YEAR,
  YYYYMM_PATTERN,
  YYYYMM_CATCH,
  MMYYYY_PATTERN,
  MMYYYY_YEAR,
  SIMPLE_PATTERN,
  THREE_COMP_REGEX_A,
  THREE_COMP_REGEX_B,
  TWO_COMP_REGEX,
} from "./date-extractors";

import {
  check_extracted_reference,
  compare_values,
  filter_ymd_candidate,
  get_min_date,
  get_max_date,
  is_valid_date,
  is_valid_format,
  plausible_year_filter,
} from "./date-validators";

var DEBUG = 0;

const LOGGER = DEBUG ? console : { debug: () => {}, error: () => {} };

var MAX_POSSIBLE_CANDIDATES = 1000;

var CLEANING_LIST = [
    "applet",
    "audio",
    "canvas",
    "datalist",
    "embed",
    "frame",
    "frameset",
    "iframe",
    "label",
    "map",
    "math",
    "noframes",
    "object",
    "picture",
    "rdf",
    "svg",
    "track",
    "video",
];


// Date-related meta tag attributes
const DATE_ATTRIBUTES = new Set([
  "analyticsattributes.articledate",
  "article.created",
  "article_date_original",
  "article:post_date",
  "article.published",
  "article:published",
  "article:published_date",
  "article:published_time",
  "article:publicationdate",
  "bt:pubdate",
  "citation_date",
  "citation_publication_date",
  "content_create_date",
  "created",
  "cxenseparse:recs:publishtime",
  "date",
  "date_created",
  "date_published",
  "datecreated",
  "dateposted",
  "datepublished",
  // Dublin Core
  "dc.date",
  "dc.created",
  "dc.date.created",
  "dc.date.issued",
  "dc.date.publication",
  "dcsext.articlefirstpublished",
  "dcterms.created",
  "dcterms.date",
  "dcterms.issued",
  "dc:created",
  "dc:date",
  "displaydate",
  "doc_date",
  "field-name-post-date",
  "gentime",
  "mediator_published_time",
  "meta",
  // Open Graph
  "og:article:published",
  "og:article:published_time",
  "og:datepublished",
  "og:pubdate",
  "og:publish_date",
  "og:published_time",
  "og:question:published_time",
  "og:regdate",
  "originalpublicationdate",
  "parsely-pub-date",
  "pdate",
  "ptime",
  "pubdate",
  "publishdate",
  "publish_date",
  "publish_time",
  "publish-date",
  "published-date",
  "published_date",
  "published_time",
  "publisheddate",
  "publication_date",
  "rbpubdate",
  "release_date",
  "rnews:datepublished",
  "sailthru.date",
  "shareaholic:article_published_time",
  "timestamp",
  "twt-published-at",
  "video:release_date",
  "vr:published_time",
]);

// Modified date attributes
const NAME_MODIFIED = new Set([
  "lastdate",
  "lastmod",
  "lastmodified",
  "last-modified",
  "modified",
  "utime",
]);

// Property modified attributes
const PROPERTY_MODIFIED = new Set([
  "article:modified",
  "article:modified_date",
  "article:modified_time",
  "article:post_modified",
  "bt:moddate",
  "datemodified",
  "dc.modified",
  "dcterms.modified",
  "lastmodified",
  "modified_time",
  "modificationdate",
  "og:article:modified_time",
  "og:modified_time",
  "og:updated_time",
  "release_date",
  "revision_date",
  "updated_time",
]);

// ItemProp attributes
const ITEMPROP_ATTRS_ORIGINAL = new Set([
  "datecreated",
  "datepublished",
  "pubyear",
]);

const ITEMPROP_ATTRS_MODIFIED = new Set(["datemodified", "dateupdate"]);

// Combine ItemProp sets
const ITEMPROP_ATTRS = new Set([
  ...ITEMPROP_ATTRS_ORIGINAL,
  ...ITEMPROP_ATTRS_MODIFIED,
]);

// Class attributes
const CLASS_ATTRS = new Set(["date-published", "published", "time published"]);

// Regular expressions
const NON_DIGITS_REGEX = /\D+$/;

// Note: THREE_PATTERN and THREE_CATCH would need to be defined
const THREE_COMP_PATTERNS = [
    [THREE_PATTERN, THREE_CATCH],
    [THREE_LOOSE_PATTERN, THREE_LOOSE_CATCH]
];

// Export all constants
export {
  DATE_ATTRIBUTES,
  NAME_MODIFIED,
  PROPERTY_MODIFIED,
  ITEMPROP_ATTRS_ORIGINAL,
  ITEMPROP_ATTRS_MODIFIED,
  ITEMPROP_ATTRS,
  CLASS_ATTRS,
  NON_DIGITS_REGEX,
  // THREE_COMP_PATTERNS // Uncomment once patterns are defined
};

function examine_text(text, options) {

  if (text.length <= MIN_SEGMENT_LEN) {
    return null;
  }

  text = text.slice(0, MAX_SEGMENT_LEN).replace(NON_DIGITS_REGEX, "");
  return try_date_expr(
    text,
    options.format,
    options.extensive,
    options.min,
    options.max
  );
}

function examine_date_elements(tree, expression, options) {
  const elements = tree.querySelectorAll(expression);
  if (!elements || elements.length > MAX_POSSIBLE_CANDIDATES) {
    return null;
  }

  for (const elem of elements) {
    for (const text of [elem.textContent, elem.getAttribute("title") || ""]) {
      const attempt = examine_text(text, options);
      if (attempt) {
        return attempt;
      }
    }
  }

  return null;
}

function examine_header(tree, options) {
  let headerdate = null;
  let reserve = null;
  const tryfunc = (content) =>
    try_date_expr(
      content,
      options.format,
      options.extensive,
      options.min,
      options.max
    );

  for (const elem of tree.querySelectorAll("meta")) {
    if (
      !elem.attributes.length ||
      (!elem.getAttribute("content") && !elem.getAttribute("datetime"))
    ) {
      continue;
    }

    if (elem.hasAttribute("name")) {
      const attribute = elem.getAttribute("name")?.toLowerCase();
      if (attribute === "og:url") {
        reserve = extract_url_date(elem.getAttribute("content"), options);
      } else if (DATE_ATTRIBUTES.has(attribute)) {
        LOGGER.debug(`examining meta name: ${elem.outerHTML}`);
        headerdate = tryfunc(elem.getAttribute("content"));
      } else if (NAME_MODIFIED.has(attribute)) {
        LOGGER.debug(`examining meta name: ${elem.outerHTML}`);
        if (!options.original) {
          headerdate = tryfunc(elem.getAttribute("content"));
        } else {
          reserve = tryfunc(elem.getAttribute("content"));
        }
      }
    } else if (elem.hasAttribute("property")) {
      const attribute = elem.getAttribute("property").toLowerCase();
      if (DATE_ATTRIBUTES.has(attribute) || PROPERTY_MODIFIED.has(attribute)) {
        LOGGER.debug(`examining meta property: ${elem.outerHTML}`);
        const attempt = tryfunc(elem.getAttribute("content"));
        if (attempt !== null) {
          if (
            (DATE_ATTRIBUTES.has(attribute) && options.original) ||
            (PROPERTY_MODIFIED.has(attribute) && !options.original)
          ) {
            headerdate = attempt;
          } else {
            reserve = attempt;
          }
        }
      }
    } else if (elem.hasAttribute("itemprop")) {
      const attribute = elem.getAttribute("itemprop").toLowerCase();
      if (ITEMPROP_ATTRS.has(attribute)) {
        LOGGER.debug(`examining meta itemprop: ${elem.outerHTML}`);
        const attempt = tryfunc(
          elem.getAttribute("datetime") || elem.getAttribute("content")
        );
        if (attempt !== null) {
          if (
            (ITEMPROP_ATTRS_ORIGINAL.has(attribute) && options.original) ||
            (ITEMPROP_ATTRS_MODIFIED.has(attribute) && !options.original)
          ) {
            headerdate = attempt;
          }
        }
      } else if (attribute === "copyrightyear") {
        LOGGER.debug(`examining meta itemprop: ${elem.outerHTML}`);
        if (elem.hasAttribute("content")) {
          const attempt = `${elem.getAttribute("content")}-01-01`;
          if (is_valid_date(attempt, "%Y-%m-%d", options.min, options.max)) {
            reserve = attempt;
          }
        }
      }
    } else if (elem.hasAttribute("pubdate")) {
      if (elem.getAttribute("pubdate").toLowerCase() === "pubdate") {
        LOGGER.debug(`examining meta pubdate: ${elem.outerHTML}`);
        headerdate = tryfunc(elem.getAttribute("content"));
      }
    } else if (elem.hasAttribute("http-equiv")) {
      const attribute = elem.getAttribute("http-equiv").toLowerCase();
      if (attribute === "date") {
        LOGGER.debug(`examining meta http-equiv: ${elem.outerHTML}`);
        if (options.original) {
          headerdate = tryfunc(elem.getAttribute("content"));
        } else {
          reserve = tryfunc(elem.getAttribute("content"));
        }
      } else if (attribute === "last-modified") {
        LOGGER.debug(`examining meta http-equiv: ${elem.outerHTML}`);
        if (!options.original) {
          headerdate = tryfunc(elem.getAttribute("content"));
        } else {
          reserve = tryfunc(elem.getAttribute("content"));
        }
      }
    }

    if (headerdate !== null) {
      break;
    }
  }

  if (headerdate === null && reserve !== null) {
    LOGGER.debug("opting for reserve date with less granularity");
    headerdate = reserve;
  }

  return headerdate;
}

function select_candidate(occurrences, catch_regex, yearpat, options) {
  if (!occurrences || occurrences.size > MAX_POSSIBLE_CANDIDATES) {
    return null;
  }

  // console.log( JSON.stringify(occurrences) + " 444444444444" + occurrences + " 444444444444")

  if (occurrences.size === 1) {
    const pattern = occurrences.keys().next().value;
    return catch_regex.exec(pattern);
  }
  ///if null
  // if (occurrences.size === 0) {
    return occurrences;
    //todo fix
  // }

  const firstselect = Array.from(occurrences.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  LOGGER.debug(`firstselect: ${JSON.stringify(firstselect)}`);

  const bestones = firstselect
    .sort((a, b) => (options.original ? a[1] - b[1] : b[1] - a[1]))
    .slice(0, 2);
  LOGGER.debug(`bestones: ${JSON.stringify(bestones)}`);

  const patterns = bestones.map((item) => item[0]);
  const counts = bestones.map((item) => item[1]);

  const years = patterns
    .map((pattern) => {
      const year_match = yearpat.exec(pattern);
      return year_match ? year_match[1] : null;
    })
    .filter((year) => year !== null);

  const validation = years.map((year) =>
    is_valid_date(
      new Date(parseInt(year), 0, 1),
      "%Y",
      options.min,
      options.max
    )
  );

  let match = null;
  if (validation.every((v) => v)) {
    if (counts[0] === counts[1]) {
      match = catch_regex.exec(patterns[0]);
    } else if (years[1] !== years[0] && counts[1] / counts[0] > 0.5) {
      match = catch_regex.exec(patterns[1]);
    } else {
      match = catch_regex.exec(patterns[0]);
    }
  } else if (validation.some((v) => v)) {
    match = catch_regex.exec(patterns[validation.indexOf(true)]);
  } else {
    LOGGER.debug(`no suitable candidate: ${years[0]} ${years[1]}`);
  }

  return match;
}

function search_pattern(htmlstring, pattern, catch_regex, yearpat, options) {
  const candidates = plausible_year_filter(
    htmlstring,
    pattern,
    yearpat,
    options.min,
    options.max
  );
  return select_candidate(candidates, catch_regex, yearpat, options);
}

function compare_reference(reference, expression, options) {
  const attempt = try_date_expr(
    expression,
    options.format,
    options.extensive,
    options.min,
    options.max
  );
  if (attempt !== null) {
    return compare_values(reference, attempt, options);
  }
  return reference;
}

function examine_abbr_elements(tree, options) {
  const elements = tree.querySelectorAll("abbr");
  if (elements.length > 0 && elements.length < MAX_POSSIBLE_CANDIDATES) {
    let reference = 0;
    for (const elem of elements) {
      if (elem.hasAttribute("data-utime")) {
        try {
          const candidate = parseInt(elem.getAttribute("data-utime"));
          LOGGER.debug(`data-utime found: ${candidate}`);
          if (options.original && (reference === 0 || candidate < reference)) {
            reference = candidate;
          } else if (!options.original && candidate > reference) {
            reference = candidate;
          }
        } catch (err) {
          continue;
        }
      } else if (CLASS_ATTRS.has(elem.getAttribute("class"))) {
        if (elem.hasAttribute("title")) {
          const trytext = elem.getAttribute("title");
          LOGGER.debug(`abbr published-title found: ${trytext}`);
          if (options.original) {
            const attempt = try_date_expr(
              trytext,
              options.format,
              options.extensive,
              options.min,
              options.max
            );
            if (attempt !== null) {
              return attempt;
            }
          } else {
            reference = compare_reference(reference, trytext, options);
            if (reference > 0) {
              break;
            }
          }
        } else if (elem.textContent && elem.textContent.length > 10) {
          LOGGER.debug(`abbr published found: ${elem.textContent}`);
          reference = compare_reference(reference, elem.textContent, options);
        }
      }
    }
    return (
      check_extracted_reference(reference, options) ||
      examine_date_elements(tree, "abbr", options)
    );
  }
  return null;
}

function examine_time_elements(tree, options) {
  const elements = tree.querySelectorAll("time");
  if (elements.length > 0 && elements.length < MAX_POSSIBLE_CANDIDATES) {
    let reference = 0;
    for (const elem of elements) {
      let shortcut_flag = false;
      if (!elem || !elem.getAttribute) 
        continue;
      
      const datetime_attr = elem.getAttribute("datetime") || "";
      if (datetime_attr.length > 6) {
        if (
          elem.hasAttribute("pubdate") &&
          elem.getAttribute("pubdate") === "pubdate" &&
          options.original
        ) {
          shortcut_flag = true;
          LOGGER.debug(`shortcut for time pubdate found: ${datetime_attr}`);
        } else if (elem.hasAttribute("class")) {
          if (
            options.original &&
            (elem.getAttribute("class").startsWith("entry-date") ||
              elem.getAttribute("class").startsWith("entry-time"))
          ) {
            shortcut_flag = true;
            LOGGER.debug(`shortcut for time/datetime found: ${datetime_attr}`);
          } else if (
            !options.original &&
            elem.getAttribute("class") === "updated"
          ) {
            shortcut_flag = true;
            LOGGER.debug(
              `shortcut for updated time/datetime found: ${datetime_attr}`
            );
          }
        } else {
          LOGGER.debug(`time/datetime found: ${datetime_attr}`);
        }

        if (shortcut_flag) {
          const attempt = try_date_expr(
            datetime_attr,
            options.format,
            options.extensive,
            options.min,
            options.max
          );
          if (attempt !== null) {
            return attempt;
          }
        } else {
          reference = compare_reference(reference, datetime_attr, options);
        }
      } else if (elem.textContent && elem.textContent.length > 6) {
        LOGGER.debug(`time/datetime found in text: ${elem.textContent}`);
        reference = compare_reference(reference, elem.textContent, options);
      }
    }
    return check_extracted_reference(reference, options);
  }
  return null;
}

function normalize_match(match) {
  if (!match) return null;
  const groups = match.slice(1).filter((g) => g);
  let [day, month, year] = groups.map((g) => g.padStart(2, "0"));
  if (year.length === 2) {
    year = year[0] === "9" ? `19${year}` : `20${year}`;
  }
  return `${year}-${month}-${day}`;
}

function search_page(htmlstring, options) {
  LOGGER.debug("looking for copyright/footer information");
  let copyear = 0;

  
  let bestmatch = search_pattern(
    htmlstring,
    COPYRIGHT_PATTERN,
    YEAR_PATTERN,
    YEAR_PATTERN,
    options
  );
  if (bestmatch) {
    const year = parseInt(bestmatch[0]);
    if (is_valid_date(new Date(year, 0, 1), "%Y", options.min, options.max)) {
      LOGGER.debug(`copyright year/footer pattern found: ${year}`);
      copyear = year;
    }
  }

  LOGGER.debug("3 components");
  for (const patterns of THREE_COMP_PATTERNS) {
    bestmatch = search_pattern(
      htmlstring,
      patterns[0],
      patterns[1],
      YEAR_PATTERN,
      options
    );
    let result = filter_ymd_candidate(
      bestmatch,
      patterns[0],
      options.original,
      copyear,
      options.format,
      options.min,
      options.max
    );
    if (result !== null) {
      return result;
    }
  }

  let candidates = plausible_year_filter(
    htmlstring,
    SELECT_YMD_PATTERN,
    SELECT_YMD_YEAR,
    options.min,
    options.max
  );
  let replacement = {};
  for (const [item, count] of Object.entries(candidates)) {
    const match = THREE_COMP_REGEX_A.exec(item);
    if (match) {
      const candidate = normalize_match(match);
      replacement[candidate] = count;
    }
  }

  bestmatch = select_candidate(
    new Counter(replacement),
    YMD_PATTERN,
    YMD_YEAR,
    options
  );
  let result = filter_ymd_candidate(
    bestmatch,
    SELECT_YMD_PATTERN,
    options.original,
    copyear,
    options.format,
    options.min,
    options.max
  );
  if (result !== null) {
    return result;
  }

  bestmatch = search_pattern(
    htmlstring,
    DATESTRINGS_PATTERN,
    DATESTRINGS_CATCH,
    YEAR_PATTERN,
    options
  );
  result = filter_ymd_candidate(
    bestmatch,
    DATESTRINGS_PATTERN,
    options.original,
    copyear,
    options.format,
    options.min,
    options.max
  );
  if (result !== null) {
    return result;
  }



  LOGGER.debug("switching to two components");
  
  // First option: YYYY-MM pattern
  bestmatch = search_pattern(
      htmlstring,
      YYYYMM_PATTERN,
      YYYYMM_CATCH,
      YEAR_PATTERN,
      options
  );
  
  if (bestmatch) {
      const dateObject = new Date(parseInt(bestmatch[1]), parseInt(bestmatch[2]) - 1, 1);
      if (is_valid_date(
          dateObject,
          "%Y-%m-%d",
          { earliest: options.min, latest: options.max }
      ) && (copyear === 0 || dateObject.getFullYear() >= copyear)) {
          LOGGER.debug(
              'date found for pattern "%s": %s, %s',
              YYYYMM_PATTERN,
              bestmatch[1],
              bestmatch[2]
          );
          return format_date(dateObject, options.format);
      }
  }

  // 2 components, second option: MM-YYYY pattern
  candidates = plausible_year_filter(
      htmlstring,
          MMYYYY_PATTERN,
          MMYYYY_YEAR,
          options.min,
          options.max,
          options.original
  );

  // Revert DD-MM-YYYY patterns before sorting
  replacement = {};
  for (const [item, count] of Object.entries(candidates)) {
      const match = item?.match(TWO_COMP_REGEX);
      if (!match) continue;
      
      let month = match[1];
      if (month.length === 1) {
          month = `0${month}`;
      }
      const candidate = `${match[2]}-${month}-01`;
      replacement[candidate] = count;
  }
  
  candidates = new Counter(replacement);

  // Select best candidate
  bestmatch = select_candidate(candidates, YMD_PATTERN, YMD_YEAR, options);
  result = filter_ymd_candidate(
      bestmatch,
      MMYYYY_PATTERN,
      options.original,
      copyear,
      options.format,
      options.min,
      options.max
  );

  if (result !== null) {
      return result;
  }

  // Try full-blown text regex on all HTML
  const dateObject = regex_parse(htmlstring);
  
  // Find all candidates and disambiguate
  if (dateObject && is_valid_date(
      dateObject,
      options.format,
      { earliest: options.min, latest: options.max }
  ) && (copyear === 0 || dateObject.getFullYear() >= copyear)) {
      try {
          LOGGER.debug("regex result on HTML: %s", dateObject);
          return format_date(dateObject, options.format);
      } catch (err) {
          LOGGER.error("value error during conversion: %s %s", dateObject, err);
      }
  }

  // Catchall: copyright mention
  if (copyear !== 0) {
      LOGGER.debug("using copyright year as default");
      const dateObject = new Date(copyear, 0, 1); // Month is 0-based in JavaScript
      return format_date(dateObject, options.format);
  }

  LOGGER.debug("switching to one component");
  bestmatch = search_pattern(
    htmlstring,
    SIMPLE_PATTERN,
    YEAR_PATTERN,
    YEAR_PATTERN,
    options
  );
  if (bestmatch) {
    const dateobject = new Date(parseInt(bestmatch[0]), 0, 1);
    if (
      is_valid_date(dateobject, "%Y-%m-%d", options.min, options.max) &&
      dateobject.getFullYear() >= copyear
    ) {
      LOGGER.debug(
        `date found for pattern "${SIMPLE_PATTERN}": ${bestmatch[0]}`
      );
      return dateobject.toISOString().slice(0, 10);
    }
  }

  return null;
}


class Extractor {
  constructor(extensive_search, max_date, min_date, original_date, outputformat) {
      this.extensive = extensive_search;
      this.format = outputformat;
      this.max = max_date;
      this.min = min_date;
      this.original = original_date;
  }
}
class Counter {
  constructor(iterable = null) {
      // Initialize internal object for storing counts
      this._counts = {};
      
      if (iterable === null) {
          return;
      }
      
      // Handle string input
      if (typeof iterable === 'string') {
          for (const char of iterable) {
              this._counts[char] = (this._counts[char] || 0) + 1;
          }
          return;
      }
      
      // Handle array input
      if (Array.isArray(iterable)) {
          for (const item of iterable) {
              this._counts[item] = (this._counts[item] || 0) + 1;
          }
          return;
      }
      
      // Handle object/mapping input
      if (typeof iterable === 'object') {
          for (const [key, value] of Object.entries(iterable)) {
              if (value !== 0) {  // Only add non-zero counts
                  this._counts[key] = value;
              }
          }
          return;
      }
  }

  // Dictionary-like interface
  
  // Get count (returns 0 for missing items)
  get(key) {
      return this._counts[key] || 0;
  }
  
  // Set count
  set(key, value) {
      if (value !== 0) {
          this._counts[key] = value;
      }
  }
  
  // Array access syntax
  valueOf(key) {
      return this.get(key);
  }

  // Support array-like access: counter['key']
  get [Symbol.toPrimitive]() {
      return (hint) => {
          if (hint === 'number') {
              return NaN;
          }
          return this.toString();
      };
  }

  // Delete an entry
  delete(key) {
      delete this._counts[key];
  }

  // Check if key exists
  has(key) {
      return key in this._counts;
  }

  // Counter-specific methods

  // Return n most common elements and their counts
  most_common(n = null) {
      const items = Object.entries(this._counts);
      items.sort((a, b) => b[1] - a[1]);
      return n ? items.slice(0, n) : items;
  }

  // Return the total of all counts
  total() {
      return Object.values(this._counts).reduce((a, b) => a + b, 0);
  }

  // Return an iterator over elements, repeating each as many times as its count
  *elements() {
      for (const [item, count] of Object.entries(this._counts)) {
          for (let i = 0; i < count; i++) {
              yield item;
          }
      }
  }

  // Update counts from an iterable
  update(iterable) {
      const other = iterable instanceof Counter ? iterable : new Counter(iterable);
      for (const [key, value] of Object.entries(other._counts)) {
          this._counts[key] = (this._counts[key] || 0) + value;
          if (this._counts[key] === 0) {
              delete this._counts[key];
          }
      }
  }

  // Subtract counts from an iterable
  subtract(iterable) {
      const other = iterable instanceof Counter ? iterable : new Counter(iterable);
      for (const [key, value] of Object.entries(other._counts)) {
          this._counts[key] = (this._counts[key] || 0) - value;
          if (this._counts[key] === 0) {
              delete this._counts[key];
          }
      }
  }


  // Support for...of iteration
  *[Symbol.iterator]() {
      yield* Object.entries(this._counts);
  }
}

/**
 * Extract date from document using various methods
 *
 * @param {Document} htmlobject - DOM object with article content
 * @param {boolean} [extensive_search=true] - perform extensive search if true
 * @param {boolean} [original_date=false] - return original date if true
 * @param {string} [outputformat="%Y-%m-%d"] - output format
 * @param {string} [url=null] - URL of the page
 * @param {boolean} [verbose=false] - log debug messages if true
 * @param {Date} [min_date=null] - minimum date to consider
 * @param {Date} [max_date=null] - maximum date to consider
 * @param {boolean} [deferred_url_extractor=false] - if true, do not extract date from URL
 * @returns {string|null} Extracted date or null if not found
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * Based on [Barbaresi (2020)](https://github.com/adbar/htmldate/)
 */
export function extractDate(
  htmlobject,
  extensive_search = true,
  original_date = false,
  outputformat = "%Y-%m-%d",
  url = null,
  verbose = false,
  min_date = null,
  max_date = null,
  deferred_url_extractor = false
) {
  if (verbose) {
    DEBUG = true;
  }

  const tree = htmlobject;

  if (!tree) {
    return null;
  }
  if (outputformat !== "%Y-%m-%d" && !is_valid_format(outputformat)) {
    return null;
  }
  

  const options = new Extractor(
    extensive_search,
    get_max_date(max_date),
    get_min_date(min_date),
    original_date,
    outputformat
  );

  let url_result = null;
  if (!url) {
    const urlelem = tree.querySelector('link[rel="canonical"]');
    if (urlelem) {
      url = urlelem.getAttribute("href");
    }
  }

  url_result = extract_url_date(url, options);
  if (url_result && !deferred_url_extractor) {
    return url_result;
  }

  let result = examine_header(tree, options) || json_search(tree, options);
  if (result) {
    return result;
  }

  if (deferred_url_extractor && url_result) {
    return url_result;
  }

  const abbr_result = examine_abbr_elements(tree, options);
  if (abbr_result) {
    return abbr_result;
  }

  let search_tree, discarded;
  try {
    [search_tree, discarded] = discard_unwanted(
      (tree.cloneNode(true), CLEANING_LIST)
    );
  } catch (error) {
    search_tree = tree;
    // LOGGER.error("DOM cleaner error");
  }

  const date_expr = extensive_search
    ? SLOW_PREPEND + DATE_EXPRESSIONS
    : FAST_PREPEND + DATE_EXPRESSIONS;

  result =
    examine_date_elements(search_tree, date_expr, options) ||
    examine_date_elements(search_tree, "title,h1", options) ||
    examine_time_elements(search_tree, options);
  if (result) {
    return result;
  }

  const htmlstring = search_tree.innerHTML;
  // console.log(htmlstring)

  result =
    pattern_search(htmlstring, TIMESTAMP_PATTERN, options) ||
    img_search(search_tree, options) ||
    idiosyncrasies_search(htmlstring, options);
  if (result) {
    return result;
  }

  if (extensive_search) {
    LOGGER.debug("extensive search started");
    let reference = 0;
   
    const textNodes = Array.from(search_tree.childNodes)
    .filter(node => node.nodeType === 3);

    // Now iterate through them
    for (let i = 0; i < textNodes.length; i++) {
        const segment = textNodes[i].textContent.trim();
        if (segment.length > MIN_SEGMENT_LEN && 
            segment.length < MAX_SEGMENT_LEN) {
            reference = compare_reference(reference, segment, options);
        }
    }



    const converted = check_extracted_reference(reference, options);
    return converted || search_page(htmlstring, options);
  }

  return null;
}

