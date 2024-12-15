import { parseDebateDocx } from "./parse-debate-docx";
import fs from "fs";
import zip from "adm-zip";
import path from "path";

/**
 * Get all docx in zip as file paths array and process data
 * @param {string} dir
 * @param {string[]} files
 * @returns {string[]} files array of file paths
 */
export async function handleZipOfDocx(zipPath, outputFolder) {
  var zipEntries = (new zip(zipPath)).getEntries(); // an array of ZipEntry records

  for (var i in zipEntries) {
    var filename = zipEntries[i];

    if (filename.entryName.endsWith("docx")) {
      var filedata = filename.getData();

      var evCollection = await parseDebateDocx(filedata);
      var outputPath = path.join(
        outputFolder,
        filename.entryName.replace(".docx", ".json")
      );

      var output = JSON.stringify(evCollection, null, 2);

      var outputDir = outputPath.match(/(.*)[\/\\]/)[1] || "";
      fs.mkdirSync(outputDir, { recursive: true });
      if (output) fs.writeFileSync(outputPath, output);
    }
  }

  return zipEntries;
}

/**
 * Get all files in folder and subfolders as file paths array
 *
 * @param {string} dir the directory to browse for files
 * @param {string[]} files (omit this param, used for recursion)
 * @returns {string[]} files array of file paths
 */
export function getFilesInFolder(dir, files = []) {
  if (!dir) return;
  const dirFiles = fs.readdirSync(dir);
  for (const f of dirFiles) {
    const stat = fs.lstatSync(dir + "/" + f);
    if (stat.isDirectory()) getFilesInFolder(dir + "/" + f, files);
    else files.push(dir + "/" + f);
  }
  return files;
}
