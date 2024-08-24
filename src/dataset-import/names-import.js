const axios = require('axios');
const fs = require('fs').promises;

var githubRoot =
    "https://raw.githubusercontent.com/righteousgambit/quiet-riot/main/wordlists/";
var commonNamesUrls = [
    githubRoot + "familynames-usa-top1000.txt",
    githubRoot + "malenames-usa-top1000.txt",
    githubRoot + "femalenames-usa-top1000.txt",
];

// Combine the two sets of URLs
const urls = {
    lastNames: [
        commonNamesUrls[0],
        "https://raw.githubusercontent.com/arineng/arincli/master/lib/last-names.txt"
    ],
    maleFirstNames: [
        commonNamesUrls[1],
        "https://raw.githubusercontent.com/arineng/arincli/master/lib/male-first-names.txt"
    ],
    femaleFirstNames: [
        commonNamesUrls[2],
        "https://raw.githubusercontent.com/arineng/arincli/master/lib/female-first-names.txt"
    ]
};

async function downloadAndFormatNames(urls) {
    try {
        const nameData = {};

        for (const [key, urlList] of Object.entries(urls)) {
            for (const url of urlList) {
                const response = await axios.get(url);
                const names = response.data
                    .split('\n')
                    .map(line => line.trim().toLowerCase())
                    .filter(line => line);

                const value = key === 'lastNames' ? 2 : 1;
                names.forEach(name => {
                    nameData[name] = value;
                });
            }
        }

        // Convert the object to a JSON string
        const jsonData = JSON.stringify(nameData, null, 0);

        // Save the JSON data to a file
        await fs.writeFile('./data/human-names-92k.json', jsonData);

        console.log(Object.keys(nameData).length + " names have been downloaded, formatted, and saved to 'names.json'");

    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

// Run the function
downloadAndFormatNames(urls);
