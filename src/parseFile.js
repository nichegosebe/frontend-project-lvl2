import { existsSync, readFileSync } from 'fs';

const isFfileExists = (filePath) => {
  try {
    if (existsSync(filePath)) {
      return true;
    }
  } catch (err) {
    console.error(`Error while checking if ${filePath} exists:`, err);
  }
  return false;
};

const readDataFromFile = (filePath) => {
  if (isFfileExists(filePath)) {
    try {
      return readFileSync(filePath, 'UTF-8');
    } catch (err) {
      console.error(`Error reading JSON data from file ${filePath}`, err);
    }
  } else {
    console.error(`Error: file ${filePath} is not found!`);
  }
  return false;
};

export default (filePath) => JSON.parse(readDataFromFile(filePath));
