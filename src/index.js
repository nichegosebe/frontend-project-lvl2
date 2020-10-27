import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import { buildTree } from './treebuilder';
import parse from './parsers';
import format from './formatters/index';

const absolutePath = (filePath) => resolve(process.cwd(), filePath);

export const readDataFromFile = (filePath) => readFileSync(absolutePath(filePath), 'UTF-8');

export const readTypeFromExtension = (filePath) => extname(filePath).slice(1);

export default (filePath1, filePath2, formatName = 'stylish') => {
  const rawData1 = readDataFromFile(filePath1);
  const rawData2 = readDataFromFile(filePath2);
  const dataType1 = readTypeFromExtension(filePath1);
  const dataType2 = readTypeFromExtension(filePath2);

  const tree = buildTree(parse(rawData1, dataType1), parse(rawData2, dataType2));

  return `${format(tree, formatName)}\n`;
};
