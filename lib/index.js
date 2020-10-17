import genDiff from '../src/gendiff.js';
import parseFile from '../src/parseFile.js';

export default (filePath1, filePath2) => {
  const fileData1 = parseFile(filePath1);
  const fileData2 = parseFile(filePath2);
  if (fileData1 && fileData2) {
    console.log(genDiff(fileData1, fileData2));
  } else {
    console.error('Something went wrong, sorry :(');
  }
};
