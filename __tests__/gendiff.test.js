import { describe, test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../lib/index.js';

const moduleFileName = fileURLToPath(import.meta.url);
const absoluteDir = dirname(moduleFileName);
const getFixturePath = (fileName) => join(absoluteDir, '..', '__tests__', '__fixtures__', fileName);

const fileFormats = [['.json'], ['.yaml'], ['.ini']];

describe('Tests with both empty fixtures', () => {
  test.each(fileFormats)(' with %s format', (fileFormat) => {
    expect(
      genDiff(
        getFixturePath(`empty${fileFormat}`),
        getFixturePath(`empty${fileFormat}`),
        'stylish',
      ),
    ).toEqual('{}');
    expect(
      genDiff(getFixturePath(`empty${fileFormat}`), getFixturePath(`empty${fileFormat}`), 'plain'),
    ).toEqual('');
  });
});

describe('Tests with both non-empty fixtures', () => {
  test.each(fileFormats)('with %s files, default (stylish) formatter', (fileFormat) => {
    const diffStylish = genDiff(
      getFixturePath(`file1${fileFormat}`),
      getFixturePath(`file2${fileFormat}`),
    );
    expect(diffStylish).not.toEqual('{}');
    expect(diffStylish).not.toBeNull();
    expect(diffStylish).not.toBeUndefined();
    expect(diffStylish).toMatchSnapshot();
  });

  test.each(fileFormats)('with %s files, plain formatter', (fileFormat) => {
    const diffPlain = genDiff(
      getFixturePath(`file1${fileFormat}`),
      getFixturePath(`file2${fileFormat}`),
      'plain',
    );
    expect(diffPlain).not.toEqual('');
    expect(diffPlain).not.toBeNull();
    expect(diffPlain).not.toBeUndefined();
    expect(diffPlain).toMatchSnapshot();
  });
});

describe('Tests with one non-empty fixtures', () => {
  test.each(fileFormats)('with %s files, default (stylish) formatter', (fileFormat) => {
    const diffStylish = genDiff(
      getFixturePath(`empty${fileFormat}`),
      getFixturePath(`file2${fileFormat}`),
    );
    expect(diffStylish).not.toEqual('{}');
    expect(diffStylish).not.toBeNull();
    expect(diffStylish).not.toBeUndefined();
    expect(diffStylish).toMatchSnapshot();
  });
});
