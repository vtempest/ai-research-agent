const axios = require("axios");
const fs = require("fs").promises;

/**
 * Import 92k  first and last human names sorted by popularity.
 * 
 * @author [American Registry for Internet Numbers
 * (2011)](https://github.com/arineng/arincli/tree/master/lib)
 * @returns {object}

 */
export async function importHumanNames() {
  // Define the base URL
  const baseUrl =
    "https://raw.githubusercontent.com/arineng/arincli/master/lib/";

  const urls = {
    lastNames: ["last-names.txt"],
    maleFirstNames: ["male-first-names.txt"],
    femaleFirstNames: ["female-first-names.txt"],
  };

  try {
    const nameData = {};

    for (const [key, urlList] of Object.entries(urls)) {
      for (const url of urlList) {
        const response = await axios.get(baseUrl + url);
        const names = response.data
          .split("\n")
          .map((line) => line.trim().toLowerCase())
          .filter((line) => line);

        const value = key === "lastNames" ? 2 : 1;
        names.forEach((name) => {
          nameData[name] = value;
        });
      }
    }

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(nameData, null, 0);

    // Save the JSON data to a file
    await fs.writeFile("./src/wordlists/human-names-92k.json", jsonData);

    console.log(
      Object.keys(nameData).length +
        " names have been downloaded, formatted, and saved to 'names.json'"
    );
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Run the function
importHumanNames();
