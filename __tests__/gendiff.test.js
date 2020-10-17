import {
  describe, test, expect, afterAll, beforeEach, jest,
} from '@jest/globals';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../lib/index.js';

const moduleFileName = fileURLToPath(import.meta.url);
const absolutePath = dirname(moduleFileName);
const getFixturePath = (fileName) => join(absolutePath, '..', '__tests__/__fixtures__', fileName);

describe('File parsing tests', () => {
  test('Run with both missing arguments', () => {
    expect(() => {
      genDiff();
    }).toThrow();
  });

  test('Run with non-existings first file', () => {
    expect(() => {
      genDiff(getFixturePath('noExistingFixture.json'), getFixturePath('s2'));
    }).toThrowError('ENOENT');
  });

  test('Run with non-existings second file', () => {
    expect(() => {
      genDiff(getFixturePath('fixture1.json'), getFixturePath('noExistingFixture.json'));
    }).toThrowError('ENOENT');
  });
});

describe('Test genDiff as CLI application', () => {
  const { log } = console;
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterAll(() => {
    console.log = log;
  });

  test('Log difference of empty JSON files', () => {
    genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'));
    expect(console.log).toHaveBeenCalled();
    const message = console.log.mock.calls[0][0];
    expect(message).toEqual('{}');
  });
});
