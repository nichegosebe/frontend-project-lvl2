import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  return readFileSync(fullFilePath, 'UTF-8');
};

// const mapParser

const jsonParser = (data) => JSON.parse(data);

const yamlParser = (data) => yaml.safeLoad(data);

const iniParser = (data) => ini.parse(data);

export default (filePath) => {
  const fileExtension = extname(filePath);
  switch (fileExtension) {
    case '':
      return jsonParser(readDataFromFile(filePath));
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
