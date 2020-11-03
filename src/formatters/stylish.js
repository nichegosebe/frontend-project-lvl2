import { TYPES } from '../treebuilder.js';

const whiteSpaceWidth = 4;
const whiteSpace = ' '.repeat(whiteSpaceWidth);

const formatValueStylish = (valueToFormat, level = 0) => {
  if (valueToFormat === null) return 'null';
  if (typeof valueToFormat !== 'object') return `${valueToFormat}`;
  if (Array.isArray(valueToFormat)) return `[${valueToFormat}]`;

  const indent = whiteSpace.repeat(level + 1);
  const objectAsString = Object.entries(valueToFormat)
    .map(([key, value]) => {
      if (value === null) return `${indent}${whiteSpace}${key}: null`;
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `${indent}${whiteSpace}${key}: ${formatValueStylish(value, level + 1)}`;
      }
      return `${indent}${whiteSpace}${key}: ${value}`;
    })
    .join('\n');
  return `{\n${objectAsString}\n${indent}}`;
};

const formatDiffTreeStylish = (diffTree, level = 0) => {
  if (diffTree.length === 0) {
    return '{}';
  }

  const indent = whiteSpace.repeat(level);

  const formattedTree = diffTree
    .map((node) => {
      if (node.length === 0) {
        return [''];
      }
      const {
        state, key, newValue, oldValue, children,
      } = node;

      switch (state) {
        case TYPES.NESTED: {
          return `${indent}${whiteSpace}${key}: ${formatDiffTreeStylish(children, level + 1)}`;
        }
        case TYPES.REMOVED: {
          return `${indent}  - ${key}: ${formatValueStylish(oldValue, level)}`;
        }
        case TYPES.ADDED: {
          return `${indent}  + ${key}: ${formatValueStylish(newValue, level)}`;
        }
        case TYPES.UPDATED: {
          return [
            `${indent}  - ${key}: ${formatValueStylish(oldValue, level)}`,
            `${indent}  + ${key}: ${formatValueStylish(newValue, level)}`,
          ].join('\n');
        }
        default: {
          return `${indent}${whiteSpace}${key}: ${formatValueStylish(oldValue, level)}`;
        }
      }
    })
    .join('\n');

  return `{\n${formattedTree}\n${indent}}`;
};

export default formatDiffTreeStylish;
