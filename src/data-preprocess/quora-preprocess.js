import fs from "fs";

var queries = parseJSONL(fs.readFileSync("./data/quora/queries.jsonl", "utf8"));
var queries = queries.map((query) => {
    return query.text;
    });
    
    queries = shuffleArray(queries);

fs.writeFileSync("./data/quora-queries-15k.json", JSON.stringify(queries), "utf8");


function parseJSONL(jsonlString) {
    // Split the string into lines
    const lines = jsonlString.split('\n');
    
    // Parse each line and collect the results
    const parsedData = lines
      .filter(line => line.trim() !== '') // Remove empty lines
      .map(line => {
        try {
          return JSON.parse(line);
        } catch (error) {
          console.error(`Error parsing line: ${line}`);
          console.error(error);
          return null;
        }
      })
      .filter(item => item !== null); // Remove lines that failed to parse
  
    return parsedData;
  }

  function shuffleArray(array) {
    // Create a copy of the original array
    const shuffled = array.slice();
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Swap elements at i and j
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
}