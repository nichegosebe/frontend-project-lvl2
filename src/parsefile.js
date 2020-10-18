import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  return readFileSync(fullFilePath, 'UTF-8');
};

const mapParser = (fileExtension) => {
  switch (fileExtension) {
    case '':
      return JSON.parse;
    case '.json':
      return JSON.parse;
    case '.yaml':
      return yaml.safeLoad;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return ini.parse;
    default:
      throw new Error(`Unknown file extension ${fileExtension}`);
  }
};

export default (filePath) => {
  const parse = mapParser(extname(filePath));
  return parse(readDataFromFile(filePath));
};
