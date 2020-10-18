import { readFileSync } from 'fs';
import { resolve } from 'path';
import genDiff from '../src/gendiff.js';
import parsers from '../src/parsers.js';
import formatters from '../src/formatters/index.js';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  return readFileSync(fullFilePath, 'UTF-8');
};

export default (filePath1, filePath2, formatName = 'stylish') => {
  const parseData1 = parsers(filePath1);
  const parseData2 = parsers(filePath2);
  const formatOutput = formatters(formatName);
  const data1 = parseData1(readDataFromFile(filePath1)) || {};
  const data2 = parseData2(readDataFromFile(filePath2)) || {};

  return `${formatOutput(genDiff(data1, data2))}\n`;
};
