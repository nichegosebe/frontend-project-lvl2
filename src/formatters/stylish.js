import * as STATE from '../constants.js';

const whiteSpace = '    ';

const formatValueStylish = (valueToParse, whiteSpacesCount = 0) => {
  if (valueToParse === null) return 'null';
  if (typeof valueToParse !== 'object') return `${valueToParse}`;
  if (Array.isArray(valueToParse)) return `[${valueToParse}]`;

  const indent = whiteSpace.repeat(whiteSpacesCount + 1);
  const objectAsString = Object.entries(valueToParse)
    .map(([key, value]) => {
      if (value === null) return `${indent}  ${key}: null`;
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `${indent}${whiteSpace}${key}: ${formatValueStylish(value, whiteSpacesCount + 1)}`;
      }
      return `${indent}${whiteSpace}${key}: ${value}`;
    })
    .join('\n');
  return `{\n${objectAsString}\n${indent}}`;
};

const formatStylish = (diffArray, whiteSpacesCount = 0) => {
  if (diffArray.length === 0) {
    return '{}';
  }

  const indent = whiteSpace.repeat(whiteSpacesCount);

  const arrayAsString = diffArray
    .map((item) => {
      if (item.length === 0) {
        return [''];
      }
      const [state, key, value, oldValue, children] = item;
      if (children.length === 0) {
        switch (state) {
          case STATE.REMOVED: {
            return `${indent}  - ${key}: ${formatValueStylish(value, whiteSpacesCount)}`;
          }
          case STATE.ADDED: {
            return `${indent}  + ${key}: ${formatValueStylish(value, whiteSpacesCount)}`;
          }
          case STATE.UPDATED: {
            return [
              `${indent}  - ${key}: ${formatValueStylish(oldValue, whiteSpacesCount)}`,
              `${indent}  + ${key}: ${formatValueStylish(value, whiteSpacesCount)}`,
            ].join('\n');
          }
          default: {
            return `${indent}${whiteSpace}${key}: ${formatValueStylish(value, whiteSpacesCount)}`;
          }
        }
      }
      return `${indent}${whiteSpace}${key}: ${formatStylish(children, whiteSpacesCount + 1)}`;
    })
    .join('\n');

  return `{\n${arrayAsString}\n${indent}}`;
};

export default formatStylish;
