
const fs = require('fs');
const readline = require('readline');
const https = require('https');
const zlib = require('zlib');
const path = require('path');

const maxPagesCount = 200000; //somewill be filtered to get to 100k
const baseUrl = 'https://dumps.wikimedia.org/other/pageviews/2024/2024-07/';

function getRandomPageviewUrl() {
    const currentDate = new Date();
    const randomDaysAgo = Math.floor(Math.random() * 4); // 0 to 3 days ago
    const randomHour = Math.floor(Math.random() * 24);
    
    const targetDate = new Date(currentDate.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
    targetDate.setHours(randomHour, 0, 0, 0);
    
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const hour = String(targetDate.getHours()).padStart(2, '0');
    
    const fileName = `pageviews-${year}${month}${day}-${hour}0000.gz`;
    return `${baseUrl}${fileName}`;
}

const url = getRandomPageviewUrl();
console.log('Using Data:', url);
const gzipFilePath =  'data/pageviews-temp.gz'
const extractedFilePath =  'data/pageviews-temp'
const outputFilePath =  'data/wiki-pages-200k.json'

function downloadFile(fileUrl, outputPath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(outputPath);
        https.get(fileUrl, (response) => {
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

        outputStream.on('finish', resolve);
        outputStream.on('error', reject);
    });
}

async function parseWikiPageviews(inputFile) {
    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
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
        .filter(
            ({ pageTitle }) =>
                !pageTitle.includes(":") &&
                !["Main_Page", "-"].includes(pageTitle) &&
                !/[^\x00-\x7F]/.test(pageTitle)
        )
        .sort((a, b) => b.viewCount - a.viewCount)
        .slice(0, maxPagesCount)
        .map((pageview) => pageview.pageTitle);

    //unique
    pageviews = [...new Set(pageviews)];

    return pageviews;
}

/**
 * Script to download, decompress, parse and process Wiki Page Titles by Views 
 *  @author [Wikimedia Foundation](https://dumps.wikimedia.org/other/pageviews)
 * @returns {void} 

*/
export async function importWikiPageTitles() {
    try {
        console.log('Creating data directory...');
        fs.mkdirSync(path.dirname(gzipFilePath), { recursive: true });

        console.log('Downloading file...');
        await downloadFile(url, gzipFilePath);
        console.log('Download complete.');

        console.log('Decompressing file...');
        await decompressGzip(gzipFilePath, extractedFilePath);
        console.log('Decompression complete.');

        console.log('Parsing Wikipedia pageviews...');
        const sortedPageviews = await parseWikiPageviews(extractedFilePath);

        console.log('Writing results to file...');
        fs.writeFileSync(outputFilePath, JSON.stringify(sortedPageviews, null, 2));
        console.log('Process completed successfully.');

        // Delete temporary files
        console.log('Cleaning up temporary files...');
        await fs.promises.unlink(gzipFilePath);
        await fs.promises.unlink(extractedFilePath);
        console.log('Temporary files deleted.');

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

importWikiPageTitles();