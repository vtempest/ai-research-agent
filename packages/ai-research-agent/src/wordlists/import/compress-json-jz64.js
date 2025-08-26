// import JSZip from "jszip";

/**
 * Compress/decompress any data (such as JSON or text) with JSZip then 
 * convert zip binary to a Base64Zip text string which is easier to
 *  store in db or files.
 * @param {string} dataOrZip data to compress, or Base64Zip to decompress
 * @param {Object} [options]
  * @param {number} options.compressionLevel default=9 0-9, 9 has smallest size  at ~40%  but takes longer
 * @param {boolean} options.decompress default=false  false to compress, true to decompress
 * @returns {Promise<string>} base64-encoded string of the zipped data

 */
export async function compressBase64ZipText(dataOrZip, options = {}) {
  try {
    var { compressionLevel = 9, decompress = false } = options;

    const zip = new JSZip();

    if (decompress) {
      try {
        //Decompress the base64 zip and extract data or Text
        await zip.loadAsync(Buffer.from(base64Zip, "base64"));
        return await zip.file(Object.keys(zip.files)?.[0]).async("string");
      } catch (e) {
        return false;
      }
    }

    // Add the JSON string to the zip file with highest compression
    zip.file("data", dataOrZip, {
      compression: "DEFLATE",
      compressionOptions: {
        level: compressionLevel,
      },
    });

    // Generate the zip file as a Uint8Array
    const zipUint8Array = await zip.generateAsync({
      type: "uint8array",
      compression: "DEFLATE",
      compressionOptions: {
        level: compressionLevel,
      },
    });

    // Convert the Uint8Array to a base64 string
    const base64 = Buffer.from(zipUint8Array).toString("base64");

    return base64;
  } catch (error) {
    console.error("Error converting file to compressed zip to base64:", error);
    throw error;
  }
}

/**
 * Compress topic model to b64z string.
 * @param {string} base64Zip
 * @returns {Promise<string>} original JSON or Text

 * @private
 */
async function compressTopicModel() {
  const fs = await import("fs/promises");
  const filePath = "./src/lib/autocomplete/wiki-phrases-model-240k.json";
  const outputPath = "compressed-model-json-z64.js";

  try {
    console.log("Processing file:", filePath);

    // Read the JSON file
    const textData = await fs.readFile(filePath, "utf8");

    const base64Zip = await compressBase64ZipText(textData);
    console.log("Base64 encoded compressed zip containing JSON:");
    console.log(base64Zip.substring(0, 100) + "..."); // Show first 100 characters
    console.log("Length of base64 string:", base64Zip.length);

    const content = `export default "${base64String}";\n`;
    await fs.writeFile(outputPath, content, "utf8");

    console.log(`Base64 string written to ${outputPath}`);

    // Verify by decoding back to JSON
    const decodedJson = await compressBase64ZipText(base64Zip, {decompress: true});
    console.log("Decoded JSON (first 100 characters):");
    console.log(JSON.stringify(decodedJson).substring(0, 100) + "...");

    // Compare file sizes
    const originalSize = (await fs.stat(filePath)).size;
    const compressedSize = Math.ceil((base64Zip.length * 3) / 4); // Approximate size of decoded base64
    const outputSize = (await fs.stat(outputPath)).size;
    console.log("Original file size:", originalSize, "bytes");
    console.log("Compressed size:", compressedSize, "bytes");
    console.log("Output file size:", outputSize, "bytes");
    console.log(
      "Compression ratio:",
      ((1 - compressedSize / originalSize) * 100).toFixed(2) + "%"
    );
  } catch (error) {
    console.error("Failed to convert or decode:", error);
  }
}

// compressTopicModel();
