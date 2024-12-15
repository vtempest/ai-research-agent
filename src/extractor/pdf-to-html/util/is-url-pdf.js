

/**
 * Detects if a given URL points to a PDF file by checking
 * the stream's first bytes for %PDF-  then ends  the request.
 * Useful for hidden pdf url that does not end with pdf
 * @param {string} url - The URL to check.
 * @returns {Promise<boolean>} True if the URL points to a PDF, false otherwise.
 * @author [ai-research-agent (2024)](https://airesearch.js.org)
 * @category Extract
 */
export async function isUrlPDF(url) {

  let response;
  try {
    // Fetch the URL with a stream response
    response = await fetch(url);

    //check if content type is pdf from headers
    if (response.headers.get("content-type")?.includes("pdf")) return true;

    if (!response.body || !response.body.getReader)
      return false;

    const reader = response.body.getReader();
    const chunk = new Uint8Array(5);
    let bytesRead = 0;

    while (bytesRead < 5) {
      const { value, done } = await reader.read();

      if (done) break;

      const remainingBytes = 5 - bytesRead;
      const bytesToCopy = Math.min(remainingBytes, value.length);

      chunk.set(value.subarray(0, bytesToCopy), bytesRead);
      bytesRead += bytesToCopy;
    }

    // Check if we read 5 bytes and if they match the PDF signature
    return (
      bytesRead === 5 &&
      chunk[0] === 0x25 && // %
      chunk[1] === 0x50 && // P
      chunk[2] === 0x44 && // D
      chunk[3] === 0x46 && // F
      chunk[4] === 0x2d
    ); // -
  } catch (error) {
    console.error("Error checking URL:", error);
    return false;
  }
}