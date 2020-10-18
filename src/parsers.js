import { extname } from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export default (filePath) => {
  switch (extname(filePath)) {
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
      throw new Error(`Unknown file extension of file ${filePath}`);
  }
};
