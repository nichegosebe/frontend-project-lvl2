import genDiff from '../src/gendiff.js';
import parseFile from '../src/parseFile.js';

export default (filePath1, filePath2) => genDiff(parseFile(filePath1), parseFile(filePath2));
