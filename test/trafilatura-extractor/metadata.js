// Module for scraping metadata from webpages
const { JSDOM } = require('jsdom');
const { extractDomain, getBaseUrl, isValidUrl, normalizeUrl, validateUrl } = require('./courlan');
const { findDate } = require('./htmldate');

// Regular expressions
const META_URL = /https?:\/\/(?:www\.|w[0-9]+\.)?([^/]+)/;
const JSON_MINIFY = /("(?:\\"|[^"])*")|\s/g;
const HTMLTITLE_REGEX = /^(.+)?\s+[–•·—|⁄*⋆~‹«<›»>:-]\s+(.+)$/;
const CLEAN_META_TAGS = /['"]/g;
const LICENSE_REGEX = /(by-nc-nd|by-nc-sa|by-nc|by-nd|by-sa|by|zero)\/([1-9]\.[0-9])/;
const TEXT_LICENSE_REGEX = /(cc|creative commons) (by-nc-nd|by-nc-sa|by-nc|by-nd|by-sa|by|zero) ?([1-9]\.[0-9])?/i;
const HTML_STRIP_TAGS = /<[^>]*>/g;

// Constants sets
const METANAME_AUTHOR = new Set([
    'article:author', 'atc-metaauthor', 'author', 'authors', 'byl', 'citation_author',
    'creator', 'dc.creator', 'dc.creator.aut', 'dc:creator',
    'dcterms.creator', 'dcterms.creator.aut', 'dcsext.author', 'parsely-author',
    'rbauthors', 'sailthru.author', 'shareaholic:article_author_name'
]);

const METANAME_DESCRIPTION = new Set([
    'dc.description', 'dc:description', 'dcterms.abstract', 'dcterms.description',
    'description', 'sailthru.description', 'twitter:description'
]);

const METANAME_PUBLISHER = new Set([
    'article:publisher', 'citation_journal_title', 'copyright', 'dc.publisher',
    'dc:publisher', 'dcterms.publisher', 'publisher', 'sailthru.publisher',
    'rbpubname', 'twitter:site'
]);

const METANAME_TAG = new Set([
    'citation_keywords', 'dcterms.subject', 'keywords', 'parsely-tags',
    'shareaholic:keywords', 'tags'
]);

const METANAME_TITLE = new Set([
    'citation_title', 'dc.title', 'dcterms.title', 'fb_title', 'headline',
    'parsely-title', 'sailthru.title', 'shareaholic:title', 'rbtitle',
    'title', 'twitter:title'
]);

const OG_PROPERTIES = {
    'og:title': 'title',
    'og:description': 'description',
    'og:site_name': 'sitename',
    'og:image': 'image',
    'og:image:url': 'image',
    'og:image:secure_url': 'image',
    'og:type': 'pagetype'
};

const OG_AUTHOR = new Set(['og:author', 'og:article:author']);

const URL_SELECTORS = [
    'head link[rel="canonical"]',
    'head base',
    'head link[rel="alternate"][hreflang="x-default"]'
];

// Helper functions
function trim(str) {
    return str ? str.trim().replace(/\s+/g, ' ') : '';
}

function normalizeTags(tags) {
    const trimmed = trim(tags.replace(CLEAN_META_TAGS, ''));
    return trimmed ? trimmed.split(', ').filter(Boolean).join(', ') : '';
}

function normalizeAuthors(existingAuthor, newAuthor) {
    if (!newAuthor) return existingAuthor;
    const author = trim(newAuthor);
    if (!author) return existingAuthor;
    return existingAuthor ? `${existingAuthor}; ${author}` : author;
}

function checkAuthors(authors, authorBlacklist) {
    const blacklist = new Set([...authorBlacklist].map(a => a.toLowerCase()));
    const newAuthors = authors.split(';')
        .map(author => author.trim())
        .filter(author => !blacklist.has(author.toLowerCase()));
    return newAuthors.length > 0 ? newAuthors.join('; ') : null;
}

function extractMetaJson(tree, metadata) {
    const scripts = tree.querySelectorAll('script[type="application/ld+json"], script[type="application/settings+json"]');
    for (const elem of scripts) {
        if (!elem.textContent) continue;
        const elementText = normalizeJson(elem.textContent.replace(JSON_MINIFY, '$1'));
        try {
            const schema = JSON.parse(elementText);
            metadata = extractJson(schema, metadata);
        } catch (error) {
            metadata = extractJsonParseError(elementText, metadata);
        }
    }
    return metadata;
}

function extractOpengraph(tree) {
    const result = {
        title: null, author: null, url: null, description: null,
        sitename: null, image: null, pagetype: null
    };

    const metaTags = tree.querySelectorAll('head > meta[property^="og:"]');
    for (const elem of metaTags) {
        const propertyName = elem.getAttribute('property');
        const content = elem.getAttribute('content');
        if (content && !content.match(/^\s*$/)) {
            if (OG_PROPERTIES[propertyName]) {
                result[OG_PROPERTIES[propertyName]] = content;
            } else if (propertyName === 'og:url' && isValidUrl(content)) {
                result.url = content;
            } else if (OG_AUTHOR.has(propertyName)) {
                result.author = normalizeAuthors(null, content);
            }
        }
    }
    return result;
}

function examineMeta(tree) {
    // Initialize metadata object with OpenGraph data
    const metadata = new Document().fromDict(extractOpengraph(tree));
    
    const tags = [];
    let backupSitename = null;

    // Iterate through meta tags
    for (const elem of tree.querySelectorAll('head > meta[content]')) {
        const contentAttr = trim(elem.getAttribute('content').replace(HTML_STRIP_TAGS, ''));
        if (!contentAttr) continue;

        if (elem.hasAttribute('property')) {
            const propertyAttr = elem.getAttribute('property').toLowerCase();
            if (propertyAttr.startsWith('og:')) continue;

            if (propertyAttr === 'article:tag') {
                tags.push(normalizeTags(contentAttr));
            } else if (PROPERTY_AUTHOR.has(propertyAttr)) {
                metadata.author = normalizeAuthors(metadata.author, contentAttr);
            }
        } else if (elem.hasAttribute('name')) {
            const nameAttr = elem.getAttribute('name').toLowerCase();
            
            if (METANAME_AUTHOR.has(nameAttr)) {
                metadata.author = normalizeAuthors(metadata.author, contentAttr);
            } else if (METANAME_TITLE.has(nameAttr)) {
                metadata.title = metadata.title || contentAttr;
            } else if (METANAME_DESCRIPTION.has(nameAttr)) {
                metadata.description = metadata.description || contentAttr;
            }
        }
    }

    metadata.tags = tags;
    return metadata;
}

function extractMetainfo(tree, expressions, lenLimit = 200) {
    for (const expression of expressions) {
        const results = tree.querySelectorAll(expression);
        for (const elem of results) {
            const content = trim(elem.textContent);
            if (content && content.length > 2 && content.length < lenLimit) {
                return content;
            }
        }
    }
    return null;
}

function extractTitle(tree) {
    // Check for single h1 element
    const h1Results = tree.querySelectorAll('h1');
    if (h1Results.length === 1) {
        const title = trim(h1Results[0].textContent);
        if (title) return title;
    }

    // Extract using title element
    const titleElement = tree.querySelector('head > title');
    if (titleElement) {
        const title = trim(titleElement.textContent);
        const match = HTMLTITLE_REGEX.exec(title);
        if (match) {
            const [_, first, second] = match;
            for (const t of [first, second]) {
                if (t && !t.includes('.')) return t;
            }
        }
    }

    // Fall back to first h1 or h2
    if (h1Results.length > 0) return trim(h1Results[0].textContent);
    const h2Results = tree.querySelectorAll('h2');
    if (h2Results.length > 0) return trim(h2Results[0].textContent);

    return '';
}

class Document {
    constructor() {
        this.title = null;
        this.author = null;
        this.url = null;
        this.description = null;
        this.sitename = null;
        this.image = null;
        this.date = null;
        this.tags = [];
        this.categories = [];
        this.pagetype = null;
        this.license = null;
    }

    fromDict(dict) {
        Object.assign(this, dict);
        return this;
    }

    cleanAndTrim() {
        for (const [key, value] of Object.entries(this)) {
            if (typeof value === 'string') {
                this[key] = trim(value);
            }
        }
    }
}

function extractMetadata(filecontent, defaultUrl = null, dateConfig = null, extensive = true, authorBlacklist = null) {
    authorBlacklist = authorBlacklist || new Set();
    dateConfig = dateConfig || setDateParams(extensive);

    const dom = new JSDOM(filecontent);
    const tree = dom.window.document;

    let metadata = examineMeta(tree);
    if (metadata.author && !metadata.author.includes(' ')) {
        metadata.author = null;
    }

    try {
        metadata = extractMetaJson(tree, metadata);
    } catch (error) {
        console.warn('Error in JSON metadata extraction:', error);
    }

    if (!metadata.title) {
        metadata.title = extractTitle(tree);
    }

    if (metadata.author && authorBlacklist.size > 0) {
        metadata.author = checkAuthors(metadata.author, authorBlacklist);
    }

    if (!metadata.url) {
        metadata.url = extractUrl(tree, defaultUrl);
    }

    if (metadata.url) {
        metadata.hostname = extractDomain(metadata.url, { fast: true });
    }

    dateConfig.url = metadata.url;
    metadata.date = findDate(tree, {
        originalDate: true,
        extensiveSearch: extensive,
        maxDate: new Date().toISOString().split('T')[0]
    });

    metadata.cleanAndTrim();
    return metadata;
}

module.exports = {
    extractMetadata,
    Document,
    normalizeTags,
    checkAuthors,
    extractMetaJson,
    extractOpengraph,
    examineMeta,
    extractTitle
};