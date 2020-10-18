import { readFileSync } from 'fs';
import { resolve } from 'path';
import genDiff from '../src/gendiff.js';
import selectParser from '../src/parsers.js';
import selectFormat from '../src/formatters/index.js';

const readDataFromFile = (filePath) => {
  const fullFilePath = resolve(process.cwd(), filePath);
  return readFileSync(fullFilePath, 'UTF-8');
};

export default (filePath1, filePath2, formatName = 'stylish') => {
  const parseData1 = selectParser(filePath1);
  const parseData2 = selectParser(filePath2);
  const formatOutput = selectFormat(formatName);
  const data1 = parseData1(readDataFromFile(filePath1)) || {};
  const data2 = parseData2(readDataFromFile(filePath2)) || {};

  return formatOutput(genDiff(data1, data2));
};
