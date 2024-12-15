/**
 * This function extracts and cleans content between XML-style tags and returns a JSON object.
 * @param {string} text - Input text to parse
 * @param {string} [key='questions'] - Tag name to look for
 * @category Generate
 * @returns {Object[]} Array of objects containing cleaned content items
 */
export function convertLanguageReplyToJSON(text, key = null) {
  // Return empty string for invalid input
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Find content between tags
  let startTag = `<${key}>`;
  if (!key) {
    const lines = text.split('\n').filter(line => /^\d+[.)]\s*|\s*[-*•]\s/.test(line)).map(line => line.replace(/^\s*[-*•]|\d+[.)]\s*|[\u2022]\s*/g, ''));
    return lines
  }
  let endTag = `</${key}>`;
  const startIndex = text.indexOf(startTag);
  const endIndex = text.indexOf(endTag);

  // Return empty string if tags aren't found
  if (startIndex === -1 || endIndex === -1) {
    return '';
  }

  // Extract content between tags
  const contentStartIndex = startIndex + startTag.length;
  const content = text.slice(contentStartIndex, endIndex).trim();

  // Remove list markers and clean whitespace
  return content
    .replace(/^\s*[-*•]|\d+[.)]\s*|[\u2022]\s*/gm, '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
}
