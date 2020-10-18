import { describe, test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../lib/index.js';

const moduleFileName = fileURLToPath(import.meta.url);
const absoluteDir = dirname(moduleFileName);
const getFixturePath = (fileName) => join(absoluteDir, '..', '__tests__', '__fixtures__', fileName);

const formats = [['.json'], ['.yaml'], ['.ini']];

describe('Tests with empty fixtures', () => {
  test.each(formats)(' with %s format', (format) => {
    expect(
      genDiff(getFixturePath(`empty${format}`), getFixturePath(`empty${format}`), 'stylish'),
    ).toEqual('{}');
    expect(
      genDiff(getFixturePath(`empty${format}`), getFixturePath(`empty${format}`), 'plain'),
    ).toEqual('');
  });
});

describe('Tests with both non-empty fixtures', () => {
  test.each(formats)('with %s files, default (stylish) formatter', (format) => {
    const diffStylish = genDiff(getFixturePath(`file1${format}`), getFixturePath(`file2${format}`));
    expect(diffStylish).not.toEqual('{}');
    expect(diffStylish).not.toBeNull();
    expect(diffStylish).not.toBeUndefined();
    expect(diffStylish).toMatchSnapshot();
  });

  test.each(formats)('with %s files, plain formatter', (format) => {
    const diffStylish = genDiff(
      getFixturePath(`file1${format}`),
      getFixturePath(`file2${format}`),
      'plain',
    );
    expect(diffStylish).not.toEqual('');
    expect(diffStylish).not.toBeNull();
    expect(diffStylish).not.toBeUndefined();
    expect(diffStylish).toMatchSnapshot();
  });
});
