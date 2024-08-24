/**
 * Script to download, decompress, parse and process 
 * Quora question pairs dataset, great for training
 *  a semantic similarity model or Query-Response model
 * 
 https://huggingface.co/datasets/BeIR/quora/resolve/main/corpus.jsonl.gz?download=true
 https://huggingface.co/datasets/BeIR/quora/resolve/main/queries.jsonl.gz?download=true
*/
const https = require('https');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const axios = require('axios');

const url = 'https://public.ukp.informatik.tu-darmstadt.de/thakur/BEIR/datasets/quora.zip';
const zipFilePath = 'quora.zip';
const dataDir =  'data';
const quoraDir = path.join(dataDir, 'quora');
const queriesJsonlPath = path.join(quoraDir, 'queries.jsonl');
const outputPath = path.join(dataDir, 'quora-queries-15k.json');

// Function to download the file using axios
async function downloadFile(fileUrl, filePath) {
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
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

// Main function to orchestrate the process
async function main() {
    try {
        console.log('Starting download...');
        await downloadFile(url, zipFilePath);
        console.log('Download complete.');

        console.log('Creating data directory...');
        fs.mkdirSync(dataDir, { recursive: true });

        console.log('Unzipping file...');
        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo(dataDir, true);

        console.log('Processing queries...');
        const queriesContent = await fs.promises.readFile(queriesJsonlPath, 'utf8');
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

main();