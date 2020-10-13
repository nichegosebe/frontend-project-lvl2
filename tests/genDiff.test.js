import genDiff from '../src/gendiff.js';

test('simple genDiff test', () => {
  expect(genDiff({ a: 1 }, { a: 2 })).notToBe(null);
});
