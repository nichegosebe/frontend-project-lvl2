import { STATE } from '../treebuilder.js';

const whiteSpaces = 4;
const whiteSpace = ' '.repeat(whiteSpaces);

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

const formatStylish = (diffTree, level = 0) => {
  if (diffTree.length === 0) {
    return '{}';
  }

  const indent = whiteSpace.repeat(level);

  const formatTree = diffTree
    .map((node) => {
      if (node.length === 0) {
        return [''];
      }
      const [state, key, value, oldValue, children] = node;
      if (children.length === 0) {
        switch (state) {
          case STATE.REMOVED: {
            return `${indent}  - ${key}: ${formatValueStylish(value, level)}`;
          }
          case STATE.ADDED: {
            return `${indent}  + ${key}: ${formatValueStylish(value, level)}`;
          }
          case STATE.UPDATED: {
            return [
              `${indent}  - ${key}: ${formatValueStylish(oldValue, level)}`,
              `${indent}  + ${key}: ${formatValueStylish(value, level)}`,
            ].join('\n');
          }
          default: {
            return `${indent}${whiteSpace}${key}: ${formatValueStylish(value, level)}`;
          }
        }
      }
      return `${indent}${whiteSpace}${key}: ${formatStylish(children, level + 1)}`;
    })
    .join('\n');

  return `{\n${formatTree}\n${indent}}`;
};

export default formatStylish;
