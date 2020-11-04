import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildTree from './treebuilder.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getAbsolutePath = (filePath) => resolve(process.cwd(), filePath);

const getData = (filePath, dataType) => parse(readFileSync(getAbsolutePath(filePath), 'UTF-8'), dataType);

const getType = (filePath) => extname(filePath).slice(1);

export default (filePath1, filePath2, formatName = 'stylish') => {
  const dataType1 = getType(filePath1);
  const dataType2 = getType(filePath2);

  const data1 = getData(filePath1, dataType1);
  const data2 = getData(filePath2, dataType2);

  const tree = buildTree(data1, data2);

  return format(tree, formatName);
};
