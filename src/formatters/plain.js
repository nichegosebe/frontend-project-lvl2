import * as STATE from '../constants.js';

const formatValuePlain = (valueToFormat) => {
  if (valueToFormat === null) return 'null';
  if (typeof valueToFormat === 'object') return '[complex value]';
  if (typeof valueToFormat === 'string') return `'${valueToFormat}'`;
  return valueToFormat;
};

const formatPlain = (diffAsArray, parentKeyPath = '') => {
  if (diffAsArray.length === 0) {
    return '';
  }

  return diffAsArray
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

export default formatPlain;
