
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');


const outputPathScience = 'data/science-queries-10k.json';
const urlScienceQueries = 'https://raw.githubusercontent.com/lumina-ai-inc/benchmark/master/search_benchmark/dataset/generated_questions.jsonl';
const scienceQuieriesPath = 'data/science-queries.jsonl';
const urlCommonQueries = 'https://public.ukp.informatik.tu-darmstadt.de/thakur/BEIR/datasets/quora.zip';
const zipFilePath = 'quora.zip';
const dataDir =  'data';
const quoraDir = path.join(dataDir, 'quora');
const queriesJsonlPath = path.join(quoraDir, 'queries.jsonl');
const outputPath = path.join(dataDir, 'quora-queries-15k.json');

// Function to download the file using fetch
async function downloadFile(fileUrl, filePath) {
    const response = await fetch(fileUrl);
    const data = await response.text();

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    fs.writeFileSync(filePath, data);

    return Promise.resolve();
}
// Function to parse JSONL
function parseJSONL(jsonlString) {
    const lines = jsonlString.split('\n');
    const parsedData = lines
        .filter(line => line.trim() !== '')
        .map(line => {
            try {
                return JSON.parse(line);
            } catch (error) {
                console.error(`Error parsing line: ${line}`);
                console.error(error);
                return null;
            }
        })
        .filter(item => item !== null);
    return parsedData;
}

// Function to shuffle array
function shuffleArray(array) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Function to recursively delete a directory
async function deleteDirectory(dir) {
    const files = await fs.promises.readdir(dir);
    for (const file of files) {
        const curPath = path.join(dir, file);
        const stat = await fs.promises.lstat(curPath);
        if (stat.isDirectory()) await deleteDirectory(curPath);
        else await fs.promises.unlink(curPath);
    }
    await fs.promises.rmdir(dir);
}

/**
 * https://raw.githubusercontent.com/lumina-ai-inc/benchmark/master/search_benchmark/dataset/user_queries.jsonl
 * 
 * https://raw.githubusercontent.com/lumina-ai-inc/benchmark/master/search_benchmark/dataset/generated_questions.jsonl
 * 
 * Script to download, decompress, parse and process 
 * Quora question pairs dataset, great for training
 *  a semantic similarity model or Query-Response model
 * @author Quora https://huggingface.co/datasets/BeIR/quora
 * @returns {object} 

 */

 export async function importCommonQueries() {
    try {

        //SciSpace STEM queries
        await downloadFile(urlScienceQueries, scienceQuieriesPath);
        var queriesContent = await fs.promises.readFile(scienceQuieriesPath, 'utf8');

        let sciQueries = parseJSONL(queriesContent);
        sciQueries = shuffleArray(sciQueries.map(query => query.question));
        await fs.promises.writeFile(outputPathScience, JSON.stringify(sciQueries, null, 2), 'utf8');

        
        await fs.promises.unlink(scienceQuieriesPath);

        //quora common queries
        await downloadFile(urlCommonQueries, zipFilePath);
        fs.mkdirSync(dataDir, { recursive: true });

        console.log('Unzipping file...');
        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(dataDir, true, true, true);
        console.log('Processing queries...');
        
        queriesContent = await fs.promises.readFile(queriesJsonlPath, 'utf8');
        let queries = parseJSONL(queriesContent);
        queries = queries.map(query => query.text);
        queries = shuffleArray(queries);

        console.log('Writing filtered queries to file...');
        await fs.promises.writeFile(outputPath, JSON.stringify(queries, null, 2), 'utf8');

        console.log('Process completed successfully.');

        // Delete temporary files and directories
        console.log('Cleaning up...');
        await fs.promises.unlink(zipFilePath);
        await deleteDirectory(quoraDir);
        console.log('Temporary files and Quora directory deleted.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

importCommonQueries();