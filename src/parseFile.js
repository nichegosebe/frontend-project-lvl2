import { readFileSync } from 'fs';
import { resolve } from 'path';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  return readFileSync(fullFilePath, 'UTF-8');
};

export default (filePath) => JSON.parse(readDataFromFile(filePath));
