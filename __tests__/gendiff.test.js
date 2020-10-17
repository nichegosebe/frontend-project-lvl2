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

describe('Test genDiff:', () => {
  test('- two empty JSON files', () => {
    expect(genDiff(getFixturePath('empty.json'), getFixturePath('empty.json'))).toEqual('{\n\n}');
  });

  test('- two non-empty JSON files', () => {
    const diff = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
    expect(diff).not.toEqual('{}');
    expect(diff).not.toBeNull();
    expect(diff).not.toBeUndefined();
    expect(diff).toMatchSnapshot();
  });

  test('- two empty YAML files', () => {
    expect(genDiff(getFixturePath('empty.yaml'), getFixturePath('empty.yaml'))).toEqual('{\n\n}');
  });

  test('- two non-empty YAML files', () => {
    const diff = genDiff(getFixturePath('flat1.yaml'), getFixturePath('flat2.yaml'));
    expect(diff).not.toEqual('{}');
    expect(diff).not.toBeNull();
    expect(diff).not.toBeUndefined();
    expect(diff).toMatchSnapshot();
  });

  test('- two non-empty YAML files with different extensions', () => {
    const diff = genDiff(getFixturePath('flat1.yaml'), getFixturePath('flat2.yml'));
    expect(diff).not.toEqual('{}');
    expect(diff).not.toBeNull();
    expect(diff).not.toBeUndefined();
    expect(diff).toMatchSnapshot();
  });
});
