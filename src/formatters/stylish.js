import _ from 'lodash';
import { TYPES } from '../treebuilder.js';

const whiteSpaceWidth = 4;
const whiteSpace = ' '.repeat(whiteSpaceWidth);

const formatValue = (value, level = 0) => {
  if (Array.isArray(value)) return `[${value}]`;
  if (!_.isPlainObject(value)) return `${value}`;

  const indent = whiteSpace.repeat(level + 1);
  const objectAsString = Object.entries(value)
    .map(([key, innerValue]) => {
      if (innerValue === null) return `${indent}${whiteSpace}${key}: null`;
      if (typeof innerValue === 'object' && !Array.isArray(innerValue)) {
        return `${indent}${whiteSpace}${key}: ${formatValue(innerValue, level + 1)}`;
      }
      return `${indent}${whiteSpace}${key}: ${innerValue}`;
    })
    .join('\n');
  return `{\n${objectAsString}\n${indent}}`;
};

const format = (diffTree, level = 0) => {
  if (diffTree.length === 0) {
    return '{}';
  }

  const indent = whiteSpace.repeat(level);

  const formattedTree = diffTree
    .map((node) => {
      const {
        state, key, newValue, oldValue, children,
      } = node;

      switch (state) {
        case TYPES.NESTED: {
          return `${indent}${whiteSpace}${key}: ${format(children, level + 1)}`;
        }
        case TYPES.REMOVED: {
          return `${indent}  - ${key}: ${formatValue(oldValue, level)}`;
        }
        case TYPES.ADDED: {
          return `${indent}  + ${key}: ${formatValue(newValue, level)}`;
        }
        case TYPES.UPDATED: {
          return [
            `${indent}  - ${key}: ${formatValue(oldValue, level)}`,
            `${indent}  + ${key}: ${formatValue(newValue, level)}`,
          ].join('\n');
        }
        default: {
          return `${indent}${whiteSpace}${key}: ${formatValue(oldValue, level)}`;
        }
      }
    })
    .join('\n');

  return `{\n${formattedTree}\n${indent}}`;
};

export default format;
