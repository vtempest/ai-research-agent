const fs = require('fs');
const https = require('https');
const zlib = require('zlib');
const axios = require('axios');
const path = require('path');
const { XMLParser } = require("fast-xml-parser");

const url = 'https://github.com/globalwordnet/english-wordnet/releases/download/2023-edition/english-wordnet-2023.xml.gz';
const gzipOutputPath = './data/english-wordnet-2023.xml.gz';
const xmlFilePath = './data/english-wordnet-2023.xml';
const jsonOutputPath = './data/english-wordnet-2023.json';



async function downloadFile(url, outputPath) {
    const writer = fs.createWriteStream(outputPath);
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}
function decompressGzip(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const gunzip = zlib.createGunzip();
        const inputStream = fs.createReadStream(inputPath);
        const outputStream = fs.createWriteStream(outputPath);

        inputStream.pipe(gunzip).pipe(outputStream);

        outputStream.on('finish', () => {
            console.log('Decompression completed');
            resolve();
        });

        outputStream.on('error', reject);
    });
}


async function parseXMLToJSON(xmlFilePath, jsonOutputPath) {
    const oewnXML = fs.readFileSync(xmlFilePath, 'utf8');

    const parser = new XMLParser({
        ignoreAttributes: false,
        allowBooleanAttributes: true,
        attributeValueProcessor: (name, val) => {
            return val.replace(/oewn[_-]/g, '').split("__")[0];
        },
        tagValueProcessor: (tagName, tagValue) => {
            if ('Pronunciation'.includes(tagName)) return;
            var o = {};
            o[tagName] = tagValue;
            return o;
        }
    });

    let jObj = parser.parse(oewnXML);
    const jsstr = JSON.stringify(jObj, null, 2);
    
    await fs.writeFile(jsonOutputPath, jsstr, 'utf8');
    console.log('Parsing completed and JSON file saved');
}

async function main() {
    try {
        console.log('Starting download...');
        await downloadFile(url, gzipOutputPath);
        console.log('Starting decompression...');
        await decompressGzip(gzipOutputPath, xmlFilePath);
        console.log('Starting parsing...');

        await parseXMLToJSON(xmlFilePath, jsonOutputPath);
        try{
        // Optionally, delete the gzip and xml files
        fs.unlinkSync(gzipOutputPath);
        fs.unlinkSync(xmlFilePath);
        } catch(err){
        }
        console.log('Zip file deleted');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();