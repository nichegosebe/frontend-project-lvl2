import _ from 'lodash';
import { STATE } from '../treebuilder';

const formatValuePlain = (valueToFormat) => {
  if (valueToFormat === null) return 'null';
  if (_.isObject(valueToFormat)) return '[complex value]';
  if (_.isString(valueToFormat)) return `'${valueToFormat}'`;
  return valueToFormat;
};

const formatDiffTreePlain = (diffTree, parentKeyPath = '') => diffTree
  .reduce((acc, node) => {
    const {
      state, key, oldValue, newValue, children,
    } = node;

    if (children) return [...acc, formatDiffTreePlain(children, `${parentKeyPath}${key}.`)];

    if (state === STATE.REMOVED) {
      return [...acc, `Property '${parentKeyPath}${key}' was removed`];
    }

    if (state === STATE.UPDATED) {
      return [
        ...acc,
        `Property '${parentKeyPath}${key}' was updated. From ${formatValuePlain(
          oldValue,
        )} to ${formatValuePlain(newValue)}`,
      ];
    }

    if (state === STATE.ADDED) {
      return [
        ...acc,
        `Property '${parentKeyPath}${key}' was added with value: ${formatValuePlain(newValue)}`,
      ];
    }

    return acc;
  }, [])
  .join('\n');

export default formatDiffTreePlain;
