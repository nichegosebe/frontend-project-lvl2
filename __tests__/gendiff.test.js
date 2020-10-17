import { describe, test, expect } from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../lib/index.js';

const moduleFileName = fileURLToPath(import.meta.url);
const absolutePath = dirname(moduleFileName);
const getFixturePath = (fileName) => join(absolutePath, '..', '__tests__/__fixtures__', fileName);

describe('Test files parsing:', () => {
  test('- both arguments missing', () => {
    expect(() => {
      genDiff();
    }).toThrow();
  });

  test('- non-existings first file', () => {
    expect(() => {
      genDiff(getFixturePath('noExistingFixture.json'), getFixturePath('fixture2.json'));
    }).toThrowError('ENOENT');
  });

  test('- non-existings second file', () => {
    expect(() => {
      genDiff(getFixturePath('fixture1.json'), getFixturePath('noExistingFixture.json'));
    }).toThrowError('ENOENT');
  });
});

describe('Test genDiff:', () => {
  test('- empty JSON files', () => {
    expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'))).toEqual('{}');
  });
});
