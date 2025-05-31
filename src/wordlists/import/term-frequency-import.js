
const fs = require('fs');
const readline = require('readline');
const https = require('https');
const zlib = require('zlib');
const path = require('path');

const url = 'https://raw.githubusercontent.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset/master/en/wiki_tfidf_terms.csv.gz';
const gzipFilePath =  'data/wiki_tfidf_terms.csv.gz';
const csvFilePath =  'data/wiki_tfidf_terms.csv';
const outputPath =  'data/wiki-word-freq-325k.json';

function downloadFile(fileUrl, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(fileUrl, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download file. Status Code: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (error) => {
            fs.unlink(outputPath, () => reject(error));
        });
    });
}

function decompressGzip(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const gunzip = zlib.createGunzip();
        const inputStream = fs.createReadStream(inputPath);
        const outputStream = fs.createWriteStream(outputPath);

        inputStream.pipe(gunzip).pipe(outputStream);

        gunzip.on('error', (error) => {
            console.error('Error during decompression:', error);
            reject(error);
        });

        outputStream.on('finish', resolve);
        outputStream.on('error', reject);
    });
}

async function processWikiTermFrequency() {
    const rl = readline.createInterface({
        input: fs.createReadStream(csvFilePath),
        crlfDelay: Infinity
    });

    const minFreq = 32;
    let wikiTermFrequency = {};
    let lineNum = 0;
    let errorLines = [];

    for await (const line of rl) {
        lineNum++;
        if (!line) continue;  // Skip empty lines

        try {
            let [term, frequency] = line.split(',');
            frequency = Number(frequency);

            if (!term || isNaN(frequency)) {
                errorLines.push({ lineNum, line });
                continue;
            }

            if (term.includes('-') || term.includes('\\') || term.includes('"') || frequency < minFreq) continue;

            if (lineNum % 50000 === 0) {
                console.log(`Processed ${lineNum} lines. Current term: ${term}, Frequency: ${frequency}`);
            }

            wikiTermFrequency[term] = frequency;
        } catch (error) {
            errorLines.push({ lineNum, line, error: error.message });
        }
    }

    if (errorLines.length > 0) {
        console.error(`Encountered ${errorLines.length} problematic lines:`);
        errorLines.slice(0, 10).forEach(({ lineNum, line, error }) => {
            console.error(`Line ${lineNum}: ${line} ${error ? `(Error: ${error})` : ''}`);
        });
        if (errorLines.length > 10) {
            console.error(`... and ${errorLines.length - 10} more.`);
        }
    }

    return wikiTermFrequency;
}

function filterTerms(wikiTermFrequency) {
    function removeNonEnglish(text) {
        const regex = /^[\d\p{P}\p{S}]+$/u;
        return regex.test(text);
    }

    const words = Object.keys(wikiTermFrequency);
    let removedCount = 0;
    for (let term of words) {
        if (term.length <= 2 || term.length >= 23) {
            delete wikiTermFrequency[term];
            removedCount++;
        } else if ((term.endsWith('.') && term.split('.').length == 2) || term.includes('/')) {
            delete wikiTermFrequency[term];
            removedCount++;
        } else if (removeNonEnglish(term)) {
            delete wikiTermFrequency[term];
            removedCount++;
        }
    }
    console.log(`Filtered out ${removedCount} terms.`);
    return wikiTermFrequency;
}

/**
 * Script to download, decompress, parse and process 
 * Wikipedia term frequency dataset, compiled by SmartDataAnalytics 
 * in 2020 and containing term frequencies on Wikipedia articles.
 * All words in English Wikipedia are sorted by number of pages they are in for 
 * 325K words with frequencies of at least 32 wikipages, between 3 to 23 characters 
 * of Latin alphanumerics like az09, punctuation like .-, and diacritics like éï, 
 * but filtering out numbers and foreign language. <br />
 * <b>Total Terms (frequency>=32)</b>: 324896 <br />
 * <b>Filesize (JSON, frequency>=32)</b>: 4MB  <br />
 * <b>Total Articles (Wiki-en-2020)</b>: 5,989,879 <br /> <br />
 * 
 *  @author
 *  Galkin, M., Malykh, V. (2020). Wikipedia TF-IDF Dataset Release (v1.0). 
 * Zenodo. https://doi.org/10.5281/zenodo.3631674 https://github.com/SmartDataAnalytics/Wikipedia_TF_IDF_Dataset

 * @returns {object} 

*/

export async function importTermFrequency() {
    try {
        console.log('Creating data directory...');
        fs.mkdirSync(path.dirname(gzipFilePath), { recursive: true });

        if (fs.existsSync(csvFilePath)) {
            console.log('CSV file already exists. Skipping download and decompression.');
        } else {
            console.log('Downloading file...');
            await downloadFile(url, gzipFilePath);
            console.log('Download complete.');

            console.log('Decompressing file...');
            try {
                await decompressGzip(gzipFilePath, csvFilePath);
                console.log('Decompression complete.');
            } catch (decompressError) {
                console.error('Error during decompression. The downloaded file might be corrupted or not a valid gzip file.');
                throw decompressError;
            }
        }

        console.log('Processing Wikipedia term frequency...');
        let wikiTermFrequency = await processWikiTermFrequency();
        console.log(`Processed ${Object.keys(wikiTermFrequency).length} terms.`);

        console.log('Filtering terms...');
        wikiTermFrequency = filterTerms(wikiTermFrequency);
        console.log(`Final term count: ${Object.keys(wikiTermFrequency).length}`);

        console.log('Writing results to file...');
        fs.writeFileSync(outputPath, ` ${JSON.stringify(wikiTermFrequency)}`);
        console.log(`Results written to ${outputPath}`);

        // Delete temporary files
        console.log('Cleaning up temporary files...');
        if (fs.existsSync(gzipFilePath)) {
            await fs.promises.unlink(gzipFilePath);
            console.log('Deleted gzip file.');
        }
        // Note: We're not deleting the CSV file here, in case it's needed for future runs
        console.log('Cleanup complete.');

    } catch (error) {
        console.error('An error occurred:', error);
        // Attempt to clean up any partial files
        try {
            if (fs.existsSync(gzipFilePath)) await fs.promises.unlink(gzipFilePath);
        } catch (cleanupError) {
            console.error('Error during cleanup:', cleanupError);
        }
    }
}

importTermFrequency();