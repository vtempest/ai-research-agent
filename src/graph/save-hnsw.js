const fs = require('fs');
/**
 * Writes an HNSW index to a base64 encoded string.
 * 
 * @param {object} index - The HNSW index object.
 * @param {number} numDimensions - The number of dimensions in the index.
 * @param {number} maxElements - The maximum number of elements in the index.
 * @returns {string} A base64 encoded string representation of the index.
 * @throws {Error} If there's an error during the index serialization process.
 */
export function   convertEmbeddingsIndexToBase64(index, numDimensions, maxElements) {
  try {
    // Create a temporary file path
    const tmpFilePath = `./hnsw.tmp`;

    // Write the index to the temporary file
    index.writeIndexSync(tmpFilePath);

    // Read the file back into memory
    const indexData = fs.readFileSync(tmpFilePath);

    // Delete the temporary file
    fs.unlinkSync(tmpFilePath);

    // Convert the buffer to a base64 string
    const base64String = indexData.toString('base64');

    return base64String
  } catch (error) {
    throw new Error(`Failed to serialize HNSW index: ${error.message}`);
  }
}