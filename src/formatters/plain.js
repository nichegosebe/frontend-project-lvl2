import _ from 'lodash';
import { STATES } from '../treebuilder.js';

const formatValue = (valueToFormat) => {
  if (valueToFormat === null) return 'null';
  if (_.isObject(valueToFormat)) return '[complex value]';
  if (_.isString(valueToFormat)) return `'${valueToFormat}'`;
  return valueToFormat;
};

const formatDiffTreePlain = (diffTree, path = '') => diffTree
  .reduce((acc, node) => {
    const {
      state, key, oldValue, newValue, children,
    } = node;

    switch (state) {
      case STATES.REMOVED: {
        return [...acc, `Property '${path}${key}' was removed`];
      }
      case STATES.UPDATED: {
        return [
          ...acc,
          `Property '${path}${key}' was updated. From ${formatValue(oldValue)} to ${formatValue(
            newValue,
          )}`,
        ];
      }
      case STATES.ADDED: {
        return [
          ...acc,
          `Property '${path}${key}' was added with value: ${formatValue(newValue)}`,
        ];
      }
      case STATES.NESTED: {
        return [...acc, formatDiffTreePlain(children, `${path}${key}.`)];
      }

      default:
        return acc;
    }
  }, [])
  .join('\n');

export default formatDiffTreePlain;
