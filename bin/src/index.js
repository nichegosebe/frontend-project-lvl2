import { existsSync, readFileSync } from 'fs';

const isFfileExists = (filePath) => {
  try {
    if (existsSync(filePath)) {
      return true;
    }
  } catch (err) {
    console.error(`Error while checking if ${filePath} exists:`, err);
  }
  console.log('File not found', filePath);
  return false;
};

const readDataFromFile = (filePath) => {
  if (isFfileExists(filePath)) {
    try {
      return readFileSync(filePath, 'UTF-8');
    } catch (err) {
      console.error(`Error while reading JSON data from file ${filePath}`, err);
    }
  }
  return false;
};

export default (filePath1, filePath2) => {
  const data1 = JSON.parse(readDataFromFile(filePath1));
  const data2 = JSON.parse(readDataFromFile(filePath2));
  if (!data1 || !data2) return false;
  return { ...data1, ...data2 };
};
