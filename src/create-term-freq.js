const fs = require("fs");
const readline = require("readline");

/**
 * This script reads the raw wikipedia terms and frequencies
 * https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset

 */
function getWikiTermFrequency() {
  const rl = readline.createInterface({
    input: fs.createReadStream("./data/wiki_tfidf_terms.csv"),
    output: process.stdout,
    terminal: false,
  });

  const minFreq = 6;

  var endFile = false;
  var writeStream = fs.createWriteStream("./data/wiki-word-freq-1m.js.js", { flags: endFile ? "a" :"w" });
  
  if (endFile){
  writeStream.write("};\n");
  return
  }

  var lineNum = 0;


  writeStream.write("export default {\n");

  rl.on("line", (line) => {
    var [term, frequency] = line.split(",");
    frequency = Number(frequency);

    //ignore header
    //ignore double-words-terms
    if (term.includes("-") || term.includes("\\") || term.includes("\"")
       || !frequency || frequency < minFreq ) return;


    // console log every 10k lines
    if (lineNum++ % 50000 === 0) {
      console.log(`Term: ${term}, Frequency: ${frequency}`);
    }

    // remove quotes and backslashes
    // term = term.replace(/["\\]/g, '') 

    // check if term is valid JSON
    // var isValid = false
    // try{
    //   isValid = JSON.parse(`{"${term}":${frequency}}`)
    // } catch(e) {
    //   isValid = false
    // }
    // if (!isValid) {
    //   console.log("Invalid JSON", term, frequency)
    //   return;}

    // write to file
    writeStream.write( `"${term}":${frequency},` );

    //end of document

    
  });

  rl.on("end", () => {
    writeStream.write("};\n");
    writeStream.end();
  });



}

getWikiTermFrequency();
