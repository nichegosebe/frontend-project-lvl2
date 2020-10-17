import genDiff from '../src/gendiff.js';
import parseFile from '../src/parseFile.js';
import { formatStylish, formatPlain } from '../src/formatters.js';

export default (filePath1, filePath2, formatter = 'stylish') => {
  if (formatter === 'plain') {
    return formatPlain(genDiff(parseFile(filePath1), parseFile(filePath2)));
  }
  return formatStylish(genDiff(parseFile(filePath1), parseFile(filePath2)));
};
