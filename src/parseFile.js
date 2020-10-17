import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  return readFileSync(fullFilePath, 'UTF-8');
};

const jsonParser = (data) => JSON.parse(data);

const yamlParser = (data) => {
  const res = yaml.safeLoad(data);
  return res && res.length > 0 ? res[0] : {};
};

const iniParser = (data) => {
  const res = ini.safe(data);
  return res;
};

export default (filePath) => {
  const fileExtension = extname(filePath);
  switch (fileExtension) {
    case '.json':
      return jsonParser(readDataFromFile(filePath));
    case '.yaml':
      return yamlParser(readDataFromFile(filePath));
    case '.yml':
      return yamlParser(readDataFromFile(filePath));
    case '.ini':
      return iniParser(readDataFromFile(filePath));
    default:
      throw new Error(`Unknown file format ${fileExtension}`);
  }
};
