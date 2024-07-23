const https = require('https');
const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const url = 'https://public.ukp.informatik.tu-darmstadt.de/thakur/BEIR/datasets/quora.zip';
const zipFilePath = path.join(__dirname, 'quora.zip');
const dataDir = path.join(__dirname, 'data');

// Function to download the file
function downloadFile(fileUrl, filePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filePath);
        https.get(fileUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (error) => {
            fs.unlink(filePath, () => reject(error));
        });
    });
}

// Main function to orchestrate the process
async function main() {
    try {
        console.log('Downloading file...');
        await downloadFile(url, zipFilePath);
        console.log('Download complete.');

        console.log('Creating data directory...');
        fs.mkdirSync(dataDir, { recursive: true });

        console.log('Moving zip file to data directory...');
        const newZipPath = path.join(dataDir, 'quora.zip');
        fs.renameSync(zipFilePath, newZipPath);

        console.log('Unzipping file...');
        const zip = new AdmZip(newZipPath);
        zip.extractAllTo(dataDir, true);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();