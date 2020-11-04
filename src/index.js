import { readFileSync } from 'fs';
import { resolve, extname } from 'path';
import buildTree from './treebuilder.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const getData = (filePath) => {
  const dataType = extname(filePath).slice(1);
  const absolutePath = resolve(process.cwd(), filePath);
  return parse(readFileSync(absolutePath, 'UTF-8'), dataType);
};

export default (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = getData(filePath1);
  const data2 = getData(filePath2);

  const tree = buildTree(data1, data2);

  return format(tree, formatName);
};
