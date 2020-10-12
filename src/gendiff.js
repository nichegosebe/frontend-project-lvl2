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
      console.error(`Error while reading JSON data from file ${filePath}`, err);
    }
  }
  return false;
};

const genDiff = (object1, object2) => {
  const diffString = Object.keys({...object1, ...object2})
    .sort()
    .reduce((acc, key) => {
      if (object2[key] === undefined) {
        return [...acc, ` - ${key}:${object1[key]}`];
      }
      if (object1[key] === undefined) {
        return [...acc, ` + ${key}:${object2[key]}`];
      }
      if (object1[key] !== object2[key]) {
        return [...acc, ` - ${key}:${object1[key]}`, ` + ${key}:${object2[key]}`];
      }
      return [...acc, `   ${key}:${object1[key]}`];
    }, []).join('\n ');
  return `{\n ${diffString}\n}`;
};

export default (filePath1, filePath2) => {
  const object1 = JSON.parse(readDataFromFile(filePath1));
  const object2 = JSON.parse(readDataFromFile(filePath2));
  if (!object1 || !object2) return false;
  return genDiff(object1, object2);
};
