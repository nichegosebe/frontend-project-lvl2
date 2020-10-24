import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { buildTree } from '../src/treebuilder.js';
import parse from '../src/parse.js';
import format from '../src/formatters/index.js';

const readDataFromFile = (filePath) => {
  const absolutePath = resolve(process.cwd(), filePath);
  return readFileSync(absolutePath, 'UTF-8');
};

const dataType = (filePath) => extname(filePath).slice(1);

export default (filePath1, filePath2, formatName = 'stylish') => {
  const rawData1 = readDataFromFile(filePath1);
  const rawData2 = readDataFromFile(filePath2);
  const dataType1 = dataType(filePath1);
  const dataType2 = dataType(filePath2);

  const tree = buildTree(parse(rawData1, dataType1), parse(rawData2, dataType2));

  return `${format(tree, formatName)}\n`;
};
