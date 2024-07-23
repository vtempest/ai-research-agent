import fs from "fs";
import {searchWikipedia} from  '../../src/extract-entitities/search-wikipedia.js';

var wikiNouns = JSON.parse(fs.readFileSync("./data/wiki-pages-100k.json", "utf8"));

var 
writeStream = fs.createWriteStream("./data/wiki-summaries.js", { flags: "w" });

async function getWikiSummary(){


var keys = wikiNouns

keys = keys.slice(1000, 10000);
for (var key of keys){
    var response = await searchWikipedia(key, {
        plainText: 1,
        summarySentenceLimit: 1,
        limitSearchResults: 1,
        images: false,
        searchInTitleOnly: 1,
        rerankByTitleSimilarity: 1,
        filterDisambiguation: 1,
    })
    
    if (response.error)
        continue;

    var summary = response.results[0].summary;


    var wikiDefObject = [key, summary ]

    console.log(wikiDefObject)

    
    writeStream.write(JSON.stringify(wikiDefObject)+",\n");
    

    //return { key, count: wikiNouns[key].length };
}
}

await getWikiSummary();