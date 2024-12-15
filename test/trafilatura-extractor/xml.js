// XML Generation and Processing Utilities
const { JSDOM } = require('jsdom');
const { sanitize, sanitizeTree, textCharsTest } = require('./utils');

// Constants
const TEI_VALID_TAGS = new Set(['ab', 'body', 'cell', 'code', 'del', 'div', 'graphic', 'head', 'hi',
                           'item', 'lb', 'list', 'p', 'quote', 'ref', 'row', 'table']);
const TEI_VALID_ATTRS = new Set(['rend', 'rendition', 'role', 'target', 'type']);
const TEI_REMOVE_TAIL = new Set(["ab", "p"]);
const TEI_DIV_SIBLINGS = new Set(["p", "list", "table", "quote", "ab"]);

const NEWLINE_ELEMS = new Set(['code', 'graphic', 'head', 'lb', 'list', 'p', 'quote', 'row', 'table']);
const SPECIAL_FORMATTING = new Set(['del', 'head', 'hi', 'ref']);
const WITH_ATTRIBUTES = new Set(['cell', 'row', 'del', 'graphic', 'head', 'hi', 'item', 'list', 'ref']);
const NESTING_WHITELIST = new Set(["cell", "figure", "item", "note", "quote"]);

const META_ATTRIBUTES = [
    'sitename', 'title', 'author', 'date', 'url', 'hostname',
    'description', 'categories', 'tags', 'license', 'id',
    'fingerprint', 'language'
];

const HI_FORMATTING = {'#b': '**', '#i': '*', '#u': '__', '#t': '`'};
const MAX_TABLE_WIDTH = 1000;
const PKG_VERSION = 1111111
function replaceElementText(element, includeFormatting = false) {
    let elemText = element.textContent || "";
    
    // Handle formatting
    if (includeFormatting && element.textContent) {
        if (element.tagName.toLowerCase() === "head") {
            try {
                const rend = element.getAttribute("rend");
                const number = rend ? parseInt(rend[1]) : 2;
                elemText = `${"#".repeat(number)} ${elemText}`;
            } catch {
                elemText = `## ${elemText}`;
            }
        } else if (element.tagName.toLowerCase() === "del") {
            elemText = `~~${elemText}~~`;
        } else if (element.tagName.toLowerCase() === "hi") {
            const rend = element.getAttribute("rend");
            if (rend in HI_FORMATTING) {
                elemText = `${HI_FORMATTING[rend]}${elemText}${HI_FORMATTING[rend]}`;
            }
        } else if (element.tagName.toLowerCase() === "code") {
            if (elemText.includes("\n")) {
                elemText = "```\n" + elemText + "\n```";
            } else {
                elemText = "`" + elemText + "`";
            }
        }
    }

    // Handle links
    if (element.tagName.toLowerCase() === "ref") {
        if (elemText) {
            const linkText = `[${elemText}]`;
            const target = element.getAttribute("target");
            if (target) {
                elemText = `${linkText}(${target})`;
            } else {
                console.warn("missing link attribute:", elemText, element.attributes);
                elemText = linkText;
            }
        } else {
            console.warn("empty link:", elemText, element.attributes);
        }
    }

    // Handle cells
    if (element.tagName.toLowerCase() === "cell" && elemText && element.children.length > 0) {
        if (element.children[0].tagName.toLowerCase() === 'p') {
            elemText = `${elemText} `;
        }
    }

    // Handle list items
    if (element.tagName.toLowerCase() === "item" && elemText) {
        elemText = `- ${elemText}\n`;
    }

    return elemText;
}

function processElement(element, returnList, includeFormatting) {
    if (element.textContent) {
        returnList.push(replaceElementText(element, includeFormatting));
    }

    Array.from(element.children).forEach(child => {
        processElement(child, returnList, includeFormatting);
    });

    if (!element.textContent && !element.nextSibling?.textContent) {
        if (element.tagName.toLowerCase() === "graphic") {
            const title = element.getAttribute("title") || "";
            const alt = element.getAttribute("alt") || "";
            const text = `${title} ${alt}`.trim();
            returnList.push(`![${text}](${element.getAttribute("src") || ""})`);
        } else if (NEWLINE_ELEMS.has(element.tagName.toLowerCase())) {
            if (element.tagName.toLowerCase() === "row") {
                const cellCount = element.querySelectorAll("cell").length;
                const spanInfo = element.getAttribute("colspan") || element.getAttribute("span");
                const maxSpan = !spanInfo || !(/^\d+$/.test(spanInfo)) ? 
                    1 : Math.min(parseInt(spanInfo), MAX_TABLE_WIDTH);
                
                if (cellCount < maxSpan) {
                    returnList.push("|".repeat(maxSpan - cellCount) + "\n");
                }
                
                if (element.querySelector("cell[role='head']")) {
                    returnList.push("\n" + "---|".repeat(maxSpan) + "\n");
                }
            } else {
                returnList.push("\n");
            }
        } else if (element.tagName.toLowerCase() !== "cell") {
            return;
        }
    }

    if (NEWLINE_ELEMS.has(element.tagName.toLowerCase()) && 
        !element.closest("cell")) {
        returnList.push(includeFormatting ? "\n\u2424\n" : "\n");
    } else if (element.tagName.toLowerCase() === "cell") {
        returnList.push(" | ");
    } else if (!SPECIAL_FORMATTING.has(element.tagName.toLowerCase())) {
        returnList.push(" ");
    }

    if (element.nextSibling?.textContent) {
        returnList.push(element.nextSibling.textContent);
    }
}

function xmlToTxt(xmlOutput, includeFormatting = false) {
    if (!xmlOutput) {
        return "";
    }

    const returnList = [];
    processElement(xmlOutput, returnList, includeFormatting);
    
    return sanitize(returnList.join("")) || "";
}

function xmlToCsv(document, includeFormatting, delim = "\t", nullValue = "null") {
    const postText = xmlToTxt(document.body, includeFormatting) || nullValue;
    const commentsText = xmlToTxt(document.commentsbody, includeFormatting) || nullValue;
    
    const fields = [
        document.url,
        document.id,
        document.fingerprint,
        document.hostname,
        document.title,
        document.image,
        document.date,
        postText,
        commentsText,
        document.license,
        document.pagetype
    ].map(d => d || nullValue);

    // Simple CSV creation (for complex cases, use a CSV library)
    return fields.map(field => 
        field.includes(delim) ? `"${field.replace(/"/g, '""')}"` : field
    ).join(delim) + "\n";
}

function writeTeitree(docmeta) {
    const dom = new JSDOM();
    const document = dom.window.document;
    
    const teidoc = document.createElement('TEI');
    teidoc.setAttribute('xmlns', 'http://www.tei-c.org/ns/1.0');
    
    writeFullheader(teidoc, docmeta, document);
    
    const textelem = document.createElement('text');
    const textbody = document.createElement('body');
    
    // Post
    const postbody = cleanAttributes(docmeta.body.cloneNode(true));
    postbody.tagName = 'div';
    postbody.setAttribute('type', 'entry');
    textbody.appendChild(postbody);
    
    // Comments
    const commentsbody = cleanAttributes(docmeta.commentsbody.cloneNode(true));
    commentsbody.tagName = 'div';
    commentsbody.setAttribute('type', 'comments');
    textbody.appendChild(commentsbody);
    
    textelem.appendChild(textbody);
    teidoc.appendChild(textelem);
    
    return teidoc;
}

function writeFullheader(teidoc, docmeta, document) {
    const header = document.createElement('teiHeader');
    const filedesc = document.createElement('fileDesc');
    
    // Title Statement
    const titleStmt = document.createElement('titleStmt');
    const title = document.createElement('title');
    title.setAttribute('type', 'main');
    title.textContent = docmeta.title;
    titleStmt.appendChild(title);
    
    if (docmeta.author) {
        const author = document.createElement('author');
        author.textContent = docmeta.author;
        titleStmt.appendChild(author);
    }
    
    filedesc.appendChild(titleStmt);
    
    // Publication Statement
    const pubStmt = document.createElement('publicationStmt');
    const publisher = definePublisherString(docmeta);
    
    if (docmeta.license) {
        const publisherElem = document.createElement('publisher');
        publisherElem.textContent = publisher;
        pubStmt.appendChild(publisherElem);
        
        const availability = document.createElement('availability');
        const p = document.createElement('p');
        p.textContent = docmeta.license;
        availability.appendChild(p);
        pubStmt.appendChild(availability);
    } else {
        const p = document.createElement('p');
        pubStmt.appendChild(p);
    }
    
    filedesc.appendChild(pubStmt);
    
    // Notes Statement
    const notesStmt = document.createElement('notesStmt');
    if (docmeta.id) {
        const idNote = document.createElement('note');
        idNote.setAttribute('type', 'id');
        idNote.textContent = docmeta.id;
        notesStmt.appendChild(idNote);
    }
    
    const fingerprintNote = document.createElement('note');
    fingerprintNote.setAttribute('type', 'fingerprint');
    fingerprintNote.textContent = docmeta.fingerprint;
    notesStmt.appendChild(fingerprintNote);
    
    filedesc.appendChild(notesStmt);
    
    // Source Description
    const sourceDesc = document.createElement('sourceDesc');
    const bibl = document.createElement('bibl');
    
    const sigle = [docmeta.sitename, docmeta.date].filter(Boolean).join(', ');
    if (!sigle) {
        console.warn('no sigle for URL', docmeta.url);
    }
    
    bibl.textContent = [docmeta.title, sigle].filter(Boolean).join(', ');
    sourceDesc.appendChild(bibl);
    
    const sigleBibl = document.createElement('bibl');
    sigleBibl.setAttribute('type', 'sigle');
    sigleBibl.textContent = sigle;
    sourceDesc.appendChild(sigleBibl);
    
    filedesc.appendChild(sourceDesc);
    header.appendChild(filedesc);
    
    // Profile Description
    const profileDesc = document.createElement('profileDesc');
    const abstract = document.createElement('abstract');
    const abstractP = document.createElement('p');
    abstractP.textContent = docmeta.description;
    abstract.appendChild(abstractP);
    profileDesc.appendChild(abstract);
    
    if (docmeta.categories || docmeta.tags) {
        const textClass = document.createElement('textClass');
        const keywords = document.createElement('keywords');
        
        if (docmeta.categories) {
            const term = document.createElement('term');
            term.setAttribute('type', 'categories');
            term.textContent = docmeta.categories.join(',');
            keywords.appendChild(term);
        }
        
        if (docmeta.tags) {
            const term = document.createElement('term');
            term.setAttribute('type', 'tags');
            term.textContent = docmeta.tags.join(',');
            keywords.appendChild(term);
        }
        
        textClass.appendChild(keywords);
        profileDesc.appendChild(textClass);
    }
    
    const creation = document.createElement('creation');
    const date = document.createElement('date');
    date.setAttribute('type', 'download');
    date.textContent = docmeta.filedate;
    creation.appendChild(date);
    profileDesc.appendChild(creation);
    
    header.appendChild(profileDesc);
    
    // Encoding Description
    const encodingDesc = document.createElement('encodingDesc');
    const appInfo = document.createElement('appInfo');
    const application = document.createElement('application');
    application.setAttribute('version', PKG_VERSION);
    application.setAttribute('ident', 'Trafilatura');
    
    const label = document.createElement('label');
    label.textContent = 'Trafilatura';
    application.appendChild(label);
    
    const ptr = document.createElement('ptr');
    ptr.setAttribute('target', 'https://github.com/adbar/trafilatura');
    application.appendChild(ptr);
    
    appInfo.appendChild(application);
    encodingDesc.appendChild(appInfo);
    header.appendChild(encodingDesc);
    
    teidoc.appendChild(header);
    return header;
}

function definePublisherString(docmeta) {
    if (docmeta.hostname && docmeta.sitename) {
        return `${docmeta.sitename.trim()} (${docmeta.hostname})`;
    }
    const publisher = docmeta.hostname || docmeta.sitename || 'N/A';
    if (publisher === 'N/A') {
        console.warn('no publisher for URL', docmeta.url);
    }
    return publisher;
}

module.exports = {
    deleteElement,
    mergeWithParent,
    removeEmptyElements,
    stripDoubleTags,
    buildJsonOutput,
    buildXmlOutput,
    controlXmlOutput,
    buildTeiOutput,
    checkTei,
    xmlToTxt,
    xmlToCsv,
    writeTeitree,
    writeFullheader
};