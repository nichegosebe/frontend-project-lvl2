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
      genDiff(getFixturePath('noExistingFixture.json'), getFixturePath('flat2.json'));
    }).toThrowError('ENOENT');
  });

  test('- non-existings second file', () => {
    expect(() => {
      genDiff(getFixturePath('flat1.json'), getFixturePath('noExistingFixture.json'));
    }).toThrowError('ENOENT');
  });
});

describe('Test with flat and empty files:', () => {
  test('- two empty flat JSON files', () => {
    expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'))).toEqual('{}');
  });

  test('- two non-empty flat JSON files', () => {
    const diff = genDiff(getFixturePath('flat1.json'), getFixturePath('flat2.json'));
    expect(diff).not.toEqual('{}');
    expect(diff).toMatchSnapshot();
  });

  test('- two empty YAML flat files', () => {
    expect(genDiff(getFixturePath('empty.yaml'), getFixturePath('empty.yaml'))).toEqual('{}');
  });

  test('- two non-empty flat YAML files', () => {
    const diff = genDiff(getFixturePath('flat1.yaml'), getFixturePath('flat2.yaml'));
    expect(diff).not.toEqual('{}');
    expect(diff).toMatchSnapshot();
  });

  test('- two non-empty flat YAML files with different extensions', () => {
    const diff = genDiff(getFixturePath('flat1.yaml'), getFixturePath('flat2.yml'));
    expect(diff).not.toEqual('{}');
    expect(diff).toMatchSnapshot();
  });
});
