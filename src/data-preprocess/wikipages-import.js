const fs = require('fs');
const readline = require('readline');

//https://dumps.wikimedia.org/enwikic/
/// https://mirror.accum.se/mirror/wikimedia.org/dumps/enwiki/20240701/enwiki-20240701-pagelinks.sql.gz
// https://mirror.accum.se/mirror/wikimedia.org/dumps/enwiki/20240701/enwiki-20240701-stub-meta-current.xml.gz

const maxPagesCount = 100000;


async function parseWikiPageviews(inputFile) {
    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    var pageviews = [];

    for await (const line of rl) {
        const match = line?.match(/^\s*\S+\s+(.+?)\s+(\d+)/);
        if (match) {
            const [, pageTitle, viewCount] = match;
            pageviews.push({ pageTitle, viewCount: parseInt(viewCount, 10) });
        }
    }

    
    // This regex keeps English letters, numbers, common punctuation, and spaces
    pageviews = pageviews
    .filter(({pageTitle}) => !pageTitle.includes(":") 
        && !(["Main_Page","-"].includes(pageTitle)) 
        && !/[^\x00-\x7F]/.test(pageTitle))
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, maxPagesCount)

    .map((pageview) => pageview.pageTitle);
    //unique
    pageviews = [...new Set(pageviews)]

    return pageviews;
}

async function main() {
    const inputFile = './data/pageviews-20240708-210000';
    try {
        const sortedPageviews = await parseWikiPageviews(inputFile);
        fs.writeFileSync('./data/wiki-pages-100k.json', JSON.stringify(sortedPageviews, null))
    } catch (error) {
        console.error('Error parsing file:', error);
    }
}

main();