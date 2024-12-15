import JSZip from "jszip";
import { Parser } from "htmlparser2";

import * as tokens from "./docx-tokens";

/**
 * Converts docx file to array or token objects with text and formatting
 *  1 - open document.xml and styles.xml by unzipping .docx file
 *  2 - tokenize document.xml and pull info on named styles from styles.xml
 * @param {string|File|Blob|ArrayBuffer} docxInput - File Path, File object, Blob, or ArrayBuffer of a DOCX file
 * @param {object} options - { simplified: boolean }
 * @returns {Promise<Array>} Array of token objects with text and formatting
 */
export async function documentToTokens(docxInput, options = {}) {
  if (!docxInput) return;

  let arrayBuffer;

  try {
    if (typeof docxInput === 'string') {
      // If it's a URL
      if (docxInput.startsWith('http') || docxInput.startsWith('https')) {
        const response = await fetch(docxInput);
        arrayBuffer = await response.arrayBuffer();
      } else {
        // If it's a local file path, this won't work in the browser.
        // You'll need to handle file input differently in a browser environment.
        throw new Error("Local file paths are not supported in browser environments");
      }
    } else if (docxInput instanceof File || docxInput instanceof Blob) {
      arrayBuffer = await docxInput.arrayBuffer();
    } else if (docxInput instanceof ArrayBuffer) {
      arrayBuffer = docxInput;
    } else {
      throw new Error("Unsupported input type");
    }

    const zip = new JSZip();
    await zip.loadAsync(arrayBuffer);

    const styleXML = await zip.file("word/styles.xml").async("string");
    const docXML = await zip.file("word/document.xml").async("string");

    const styleData = await createStyleParser(styleXML);
    const blocks = await createTokenizer(docXML, styleData);

    if (options.simplified) {
      return blocks.map(tokens.simplifyTokens);
    }
    return blocks;
  } catch (e) {
    console.error("Error processing DOCX file:", e);
    throw e;
  }
}

/** 
  1 - open document.xml
  2 - tokenize xml
  3 - reconstruct cleaned html
*/
export async function  documentToMarkup  (filepath) {
  const docTokens = await documentToTokens(filepath);
  return tokens.tokensToMarkup(docTokens);
};


export async function createStyleParser (styleXML) {
  const parsedStyles = {};
  let styleName = "";
  return await new Promise((resolve, reject) => {
    var parser = new Parser(
      {
        onopentag(name, attributes) {
          if (name === "w:style") {
            styleName = attributes["w:styleId"];
            parsedStyles[styleName] = {
              underline: false,
              strong: false,
              mark: false,
            };
          }

          if (styleName) {
            var styles = parsedStyles[styleName];

            if (name === "w:u")
              styles.underline = attributes["w:val"] !== "none";
            else if (
              name === "w:highlight" ||
              styleName.toLowerCase().includes("highli")
            )
              styles.mark = true;
            else if (name === "w:b")
              styles.strong = attributes["w:val"] !== "0";
          }
        },
        onend: () => resolve(parsedStyles),
        onerror: reject,
      },
      { xmlMode: true }
    );

    parser.write(styleXML);

    parser.end();
  });
};


/**
 * Parses doc xml to tokenize each text range into
 * {text: "", format: { underline, strong, mark }
 * @param {string} docXML string from docx unzip
 * @param {object} styleData parsed object of style class names
 * @returns {array}  blocks[]
 */
export async function createTokenizer (docXML, styleData) {
  const blocks = [];
  let block;
  let token;
  return await new Promise((resolve, reject) => {
    var parser = new Parser(
      {
        onopentag(name, attributes) {
          if (name === "w:p") block = { format: "text", tokens: [] };
          else if (name === "w:pStyle")
            block.format = tokens.getStyleNameByXml(attributes["w:val"]);
          else if (name === "w:outlineLvl")
            block.format = tokens.getOutlineLvlName(+attributes["w:val"] + 1);
          else if (name === "w:r")
            token = {
              text: "",
              format: { underline: false, strong: false, mark: false },
            };
          else if (token) {
            if (name === "w:rStyle")
              token.format = { ...styleData[attributes["w:val"]] };

            if (name === "w:u")
              token.format.underline = attributes["w:val"] !== "none";
            else if (name === "w:highlight") token.format.mark = true;
            else if (name === "w:b")
              token.format.strong = attributes["w:val"] !== "0";
          }
        },
        ontext(data) {
          if (token) token.text += data;
        },
        onclosetag(name) {
          if (name === "w:p" && block.tokens.length) blocks.push(block);
          else if (name === "w:r" && token.text) block.tokens.push(token);
        },
        onend: () => resolve(blocks),
        onerror: reject,
      },
      { xmlMode: true }
    );

    parser.write(docXML);

    parser.end();
  });
};
