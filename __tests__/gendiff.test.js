import { describe, test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../lib/index.js';

const moduleFileName = fileURLToPath(import.meta.url);
const absolutePath = dirname(moduleFileName);
const getFixturePath = (fileName) => join(absolutePath, '..', '__tests__/__fixtures__', fileName);

const formats = [['.json'], ['.yaml'], ['.ini']];
const formatters = [['stylish'], ['plain']];

describe('Tests with empty fixtures', () => {
  test.each(formats)('.test with %s format', (format) => {
    expect(
      genDiff(getFixturePath(`empty${format}`), getFixturePath(`empty${format}`), 'stylish'),
    ).toEqual('{}');
  });
});

describe('Tests with both non-empty fixtures', () => {
  test.each(formats)('.test with %s format', (format) => {
    const diff = genDiff(getFixturePath(`file1${format}`), getFixturePath(`file2${format}`));
    expect(diff).not.toEqual('{}');
    expect(diff).not.toBeNull();
    expect(diff).not.toBeUndefined();
    expect(diff).toMatchSnapshot();
  });
});

// describe('Snapshot tests with both non-empty fixtures', () => {
//   test.each(bothNonEmptyFixtures)('.test with %s, %s', (file1, file2) => {
//     const diff = genDiff(getFixturePath(file1), getFixturePath(file2));
//     expect(diff).not.toEqual('{}');
//     expect(diff).not.toBeNull();
//     expect(diff).not.toBeUndefined();
//     expect(diff).toMatchSnapshot();
//   });
// });
