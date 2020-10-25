import { readFileSync } from 'fs';
import { resolve, extname } from 'path';

export const readDataFromFile = (filePath) => {
  const absolutePath = resolve(process.cwd(), filePath);
  return readFileSync(absolutePath, 'UTF-8');
};

export const readTypeFromExtension = (filePath) => extname(filePath).slice(1);
