import JSZip from 'jszip';
import fs from 'fs/promises';
import path from 'path';

/**
 * Reads a JSON file, compresses it to a zip file, then converts to a base64-encoded string.
 * 
 * @param {string} filePath - The path to the JSON file
 * @param {string} [filename] - The filename to use inside the zip (defaults to the original filename)
 * @returns {Promise<string>} A promise that resolves to the base64-encoded string representation of the zipped JSON
 */
async function fileToCompressedZipToBase64(filePath, filename) {
  try {
    // Read the JSON file
    const jsonString = await fs.readFile(filePath, 'utf8');

    // Use the original filename if not provided
    if (!filename) {
      filename = path.basename(filePath);
    }

    // Create a new zip file
    const zip = new JSZip();

    // Add the JSON string to the zip file with highest compression
    zip.file(filename, jsonString, {
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9 // Highest compression level
      }
    });

    // Generate the zip file as a Uint8Array
    const zipUint8Array = await zip.generateAsync({ 
      type: 'uint8array',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9 // Highest compression level
      }
    });

    // Convert the Uint8Array to a base64 string
    const base64 = Buffer.from(zipUint8Array).toString('base64');

    return base64;
  } catch (error) {
    console.error('Error converting file to compressed zip to base64:', error);
    throw error;
  }
}

/**
 * Writes the base64 string to a JavaScript file as a variable assignment.
 * 
 * @param {string} base64String - The base64 string to write
 * @param {string} outputPath - The path where to write the output file
 * @returns {Promise<void>}
 */
async function writeBase64ToJSFile(base64String, outputPath) {
  const content = `export default "${base64String}";\n`;
  await fs.writeFile(outputPath, content, 'utf8');
}

// Function to decode the base64 zip and extract JSON
async function decodeBase64ZipToJson(base64Zip) {
  try {
    const zip = new JSZip();
    await zip.loadAsync(Buffer.from(base64Zip, 'base64'));

    // Extract the JSON file
    const jsonString = await zip.file(Object.keys(zip.files)[0]).async('string');

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding base64 zip to JSON:', error);
    throw error;
  }
}

// Example usage
async function example() {
  const filePath = './src/lib/autocomplete/wiki-phrases-model-240k.json';
  const outputPath = 'compressed-model-json-z64.js';

  try {
    console.log('Processing file:', filePath);

    const base64Zip = await fileToCompressedZipToBase64(filePath);
    console.log('Base64 encoded compressed zip containing JSON:');
    console.log(base64Zip.substring(0, 100) + '...'); // Show first 100 characters
    console.log('Length of base64 string:', base64Zip.length);

    // Write the base64 string to a file
    await writeBase64ToJSFile(base64Zip, outputPath);
    console.log(`Base64 string written to ${outputPath}`);

    // Verify by decoding back to JSON
    const decodedJson = await decodeBase64ZipToJson(base64Zip);
    console.log('Decoded JSON (first 100 characters):');
    console.log(JSON.stringify(decodedJson).substring(0, 100) + '...');

    // Compare file sizes
    const originalSize = (await fs.stat(filePath)).size;
    const compressedSize = Math.ceil(base64Zip.length * 3 / 4); // Approximate size of decoded base64
    const outputSize = (await fs.stat(outputPath)).size;
    console.log('Original file size:', originalSize, 'bytes');
    console.log('Compressed size:', compressedSize, 'bytes');
    console.log('Output file size:', outputSize, 'bytes');
    console.log('Compression ratio:', ((1 - compressedSize / originalSize) * 100).toFixed(2) + '%');
  } catch (error) {
    console.error('Failed to convert or decode:', error);
  }
}

example();