import { describe, test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join } from 'path';
import genDiff from '../index';

const getFixturePath = (fileName) => join(process.cwd(), '__tests__', '__fixtures__', fileName);

const fixtureSets = [
  ['file1.json', 'file2.json'],
  ['file1.yaml', 'file2.yaml'],
  ['file1.ini', 'file2.ini'],
];

const stylishDiffString = readFileSync(getFixturePath('stylish.txt'), 'UTF-8');
const plainDiffString = readFileSync(getFixturePath('plain.txt'), 'UTF-8');
const jsonDiffString = readFileSync(getFixturePath('json.txt'), 'UTF-8');

describe('Tests with different formats', () => {
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
