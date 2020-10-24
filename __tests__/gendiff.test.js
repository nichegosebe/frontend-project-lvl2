import { describe, test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../lib/index.js';

const getFixturePath = (fileName) => join(process.cwd(), '__tests__', '__fixtures__', fileName);

const fixtureSets = [
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
  ['file1.ini', 'file2.ini'],
  ['file1.ini', 'file2.json'],
  ['file1.yaml', 'file2'],
  ['file1.yaml', 'file2.ini'],
];

const stylishDiffString = readFileSync(getFixturePath('stylish.txt'), 'UTF-8');
const plainDiffString = readFileSync(getFixturePath('plain.txt'), 'UTF-8');
const jsonDiffString = readFileSync(getFixturePath('json.txt'), 'UTF-8');

describe('Tests with both empty files', () => {
  test('empty files ', () => {
    expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'))).toEqual('{}\n');
    expect(genDiff(getFixturePath('empty.yaml'), getFixturePath('empty.yaml'))).toEqual('{}\n');
    expect(genDiff(getFixturePath('empty.ini'), getFixturePath('empty.ini'))).toEqual('{}\n');
  });
});

describe('Tests with both non-empty fixtures', () => {
  test.each(fixtureSets)('%s and %s with default (stylish) formatter', (fileName1, fileName2) => {
    expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2))).toEqual(
      stylishDiffString,
    );
  });

  test.each(fixtureSets)('%s and %s with plain formatter', (fileName1, fileName2) => {
    expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'plain')).toEqual(
      plainDiffString,
    );
  });

  test.each(fixtureSets)('%s and %s with json formatter', (fileName1, fileName2) => {
    expect(genDiff(getFixturePath(fileName1), getFixturePath(fileName2), 'json')).toEqual(
      jsonDiffString,
    );
  });
});
