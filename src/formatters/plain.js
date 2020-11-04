import _ from 'lodash';
import { TYPES } from '../treebuilder.js';

const formatValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const format = (diffTree, path = '') => diffTree
  .reduce((acc, node) => {
    const {
      type, key, oldValue, newValue, children,
    } = node;

    switch (type) {
      case TYPES.REMOVED: {
        return [...acc, `Property '${path}${key}' was removed\n`];
      }
      case TYPES.UPDATED: {
        return [
          ...acc,
          `Property '${path}${key}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}\n`,
        ];
      }
      case TYPES.ADDED: {
        return [
          ...acc,
          `Property '${path}${key}' was added with value: ${formatValue(newValue)}\n`,
        ];
      }
      case TYPES.NESTED: {
        return [...acc, format(children, `${path}${key}.`)];
      }

      default: return acc;
    }
  }, [])
  .join('');

export default format;
