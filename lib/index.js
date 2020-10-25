import { readDataFromFile, readTypeFromExtension } from '../src/fileread';
import { buildTree } from '../src/treebuilder';
import parse from '../src/parsers';
import format from '../src/formatters/index';

export default (filePath1, filePath2, formatName = 'stylish') => {
  const rawData1 = readDataFromFile(filePath1);
  const rawData2 = readDataFromFile(filePath2);
  const dataType1 = readTypeFromExtension(filePath1);
  const dataType2 = readTypeFromExtension(filePath2);

  const tree = buildTree(parse(rawData1, dataType1), parse(rawData2, dataType2));

  return `${format(tree, formatName)}\n`;
};
