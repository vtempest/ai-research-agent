

const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const axios = require('axios');
const cheerio = require('cheerio');

const baseWikipediaUrl = 'https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings/';
const url = 'https://github.com/feramhq/typokit/archive/refs/heads/master.zip';
const zipFilePath = 'typokit-master.zip';
const extractDir = 'typokit-master';
const mapsDir = path.join(extractDir, 'maps');
const finalJsonFilePath = 'data/misspelled-typos-8k.json';
const OPTION_JSON_SPACING = 0;
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

function processYamlFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const result = {};
    let currentKey = '';

    lines.forEach(line => {
        if (!line.startsWith(' ')) {
            const [key, value] = line.split(':').map(part => part.trim());
            if (key && value && line.includes(':')) {
                result[value] = key;
                currentKey = key;
            } else if (key && line.includes(':')) {
                currentKey = key;
            }
        } else if (line.includes('-')) {
            const value = line.split('-')[1].trim();
            if (currentKey && value) {
                result[value] = currentKey;
            }
        }
    });

    return result;
}

async function scrapeMisspellings() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const allMisspellings = {}
    for (const letter of alphabet) {
        const url = `${baseWikipediaUrl}${letter}`;
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            
            $('ul li').each((index, element) => {
                const text = $(element).text().trim();
                
                if (text.includes('(UTC)') || text.includes('common misspellings')
                   || text.includes('(Top)') || text.includes('(click for Wikipedia search)')) 
                    return;
                
                const parts = text.split(' (');
                if (parts.length === 2) {
                    let misspelled = parts[0].trim()
                        .replace(/['\"]/g, '')
                    
                    let correct = parts[1].split(',')[0].trim();
                    correct = correct.replace(')', '');
                    correct = correct.replace(/\[.*?\]/g, '').trim();
                    
                    if (correct.indexOf('variant of') > -1 || correct.indexOf('spelling of') > -1) {
                        correct = correct.replace(/.*(spelling|variant) of /, '');
                    }

                    correct = correct.replace(/[\'\"]/g, '')
                    
                    if (correct.includes('; ')) 
                        correct = correct.split('; ')[0];

                    if (correct.includes(': ')) 
                        correct = correct.split(': ')[0];

                     
                    correct = correct.replace(/.*(informal for|synonym for| for the) /, '');

                    Object.assign(allMisspellings, {[misspelled]: correct});
                }
            });
            
        } catch (error) {
            console.error(`Error fetching page for letter ${letter}: ${error.message}`);
        }
    }

    return allMisspellings;
}

/**
 * Common Misspelled Typos Dataset Importer
 *  Script to download, decompress, parse and process into JSON
 * Total unique typos collected: 7969  
 * 
 * 
 * @author Crowd-sourced often-updated Wikipedia list of common misspellings 
 * https://en.wikipedia.org/wiki/Wikipedia:Lists_of_common_misspellings
 * @returns {object} 

*/
export async function importMisspelledTypos() {
    try {
        console.log('Processing Github YAML Typos...');

        await downloadFile(url, zipFilePath);
        
        const zip = new AdmZip(zipFilePath);
        zip.extractAllTo('.', true);
        
        const files = Array.from({length: 26}, (_, i) => String.fromCharCode(97 + i) + '.yaml');
        const yamlResult = {};
        
        for (const file of files) {
            const filePath = path.join(mapsDir, file);
            if (fs.existsSync(filePath)) {
                Object.assign(yamlResult, processYamlFile(filePath));
            } else {
                console.log(`File ${file} does not exist. Skipping.`);
            }
        }
        
        console.log('YAML processing complete.');
        
        console.log('Scraping Wikipedia misspellings...');
        const wikiMisspellings = await scrapeMisspellings();
        console.log('Wikipedia scraping complete.');
        
        const combinedResult = { ...yamlResult, ...wikiMisspellings };
        
        console.log('Sorting combined results...');
        const sortedResult = Object.fromEntries(
            Object.entries(combinedResult).sort(([a], [b]) => a.localeCompare(b))
        );
        
        fs.writeFileSync(finalJsonFilePath, JSON.stringify(sortedResult, null, OPTION_JSON_SPACING));
        console.log(`Sorted combined results written to ${finalJsonFilePath}`);
        
        fs.unlinkSync(zipFilePath);
        fs.rmdirSync(extractDir, { recursive: true });
        console.log('Cleanup complete.');
        
        console.log(`Total unique typos collected: ${Object.keys(sortedResult).length}`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

importMisspelledTypos();