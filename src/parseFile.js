import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  try {
    if (existsSync(fullFilePath)) {
      try {
        return readFileSync(fullFilePath, 'UTF-8');
      } catch (err) {
        console.error(`Error reading JSON data from file ${filePath}`, err);
      }
    } else {
      console.error(`Error: file ${filePath} is not found!`);
    }
  } catch (err) {
    console.error(`Error checking if file ${filePath} exists!`);
  }
  return false;
};

export default (filePath) => JSON.parse(readDataFromFile(filePath));
