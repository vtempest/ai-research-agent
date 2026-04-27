import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

// Server utilities - hash object for config management
export const hashObj = (obj: { [key: string]: any }) => {
  const json = JSON.stringify(obj, Object.keys(obj).sort());
  const hash = crypto.createHash('sha256').update(json).digest('hex');
  return hash;
};

// File utilities - get file details from uploads
export const getFileDetails = (fileId: string) => {
  const fileLoc = path.join(
    process.cwd(),
    './uploads',
    fileId + '-extracted.json',
  );

  const parsedFile = JSON.parse(fs.readFileSync(fileLoc, 'utf8'));

  return {
    name: parsedFile.title,
    fileId: fileId,
  };
};
