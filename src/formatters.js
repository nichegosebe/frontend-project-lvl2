import * as STATE from './constants.js';

const formatValueStylish = (valueToParse, whiteSpaces = 0) => {
  if (valueToParse === null) return 'null';
  if (typeof valueToParse !== 'object') return `${valueToParse}`;
  if (Array.isArray(valueToParse)) return `[${valueToParse}]`;
  const indent = ' '.repeat(whiteSpaces + 4);
  const objectAsString = Object.entries(valueToParse)
    .map(([key, value]) => {
      if (value === null) return `${indent}  ${key}: null`;
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `${indent}    ${key}: ${formatValueStylish(value, whiteSpaces + 4)}`;
      }
      return `${indent}    ${key}: ${value}`;
    })
    .join('\n');
  return `{\n${objectAsString}\n${indent}}`;
};

const formatValuePlain = (value) => {
  if (typeof value === 'object') return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const formatStylish = (diffArray, whiteSpaces = 0) => {
  if (diffArray.length === 0) {
    return '{}';
  }

  const indent = ' '.repeat(whiteSpaces);

  const arrayAsString = diffArray
    .map((item) => {
      if (item.length === 0) {
        return [''];
      }
      const [state, key, value, oldValue, children] = item;
      if (children.length === 0) {
        switch (state) {
          case STATE.REMOVED: {
            return `${indent}  - ${key}: ${formatValueStylish(value, whiteSpaces)}`;
          }
          case STATE.ADDED: {
            return `${indent}  + ${key}: ${formatValueStylish(value, whiteSpaces)}`;
          }
          case STATE.UPDATED: {
            return [
              `${indent}  - ${key}: ${formatValueStylish(oldValue, whiteSpaces)}`,
              `${indent}  + ${key}: ${formatValueStylish(value, whiteSpaces)}`,
            ].join('\n');
          }
          default: {
            return `${indent}    ${key}: ${formatValueStylish(value, whiteSpaces)}`;
          }
        }
      }
      return `${indent}    ${key}: ${formatStylish(children, whiteSpaces + 4)}`;
    })
    .join('\n');

  return `{\n${arrayAsString}\n${indent}}`;
};

const formatPlain = (diffArray, parentKeyPath = '') => {
  if (diffArray.length === 0) {
    return '';
  }

  return diffArray
    .reduce((acc, item) => {
      const [state, key, value, oldValue, children] = item;

      if (children.length !== 0) return [...acc, formatPlain(children, `${parentKeyPath}${key}.`)];

      if (state === STATE.REMOVED) {
        return [...acc, `Property '${parentKeyPath}${key}' was removed`];
      }

      if (state === STATE.UPDATED) {
        return [
          ...acc,
          `Property '${parentKeyPath}${key}' was updated. From ${formatValuePlain(
            oldValue,
          )} to ${formatValuePlain(value)}`,
        ];
      }

      if (state === STATE.ADDED) {
        return [
          ...acc,
          `Property '${parentKeyPath}${key}' was added with value: ${formatValuePlain(value)}`,
        ];
      }

      return acc;
    }, [])
    .join('\n');
};

export { formatStylish, formatPlain };
