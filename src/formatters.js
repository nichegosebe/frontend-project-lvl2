const formatStylishObject = (objectToParse, whiteSpace = 0) => {
  const indent = ' '.repeat(whiteSpace);
  if (objectToParse === null) return `${indent}  null`;
  const objectAsString = Object.entries(objectToParse)
    .map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        return `   ${indent} ${key}: ${formatStylishObject(value, whiteSpace + 4)}`;
      }
      return `  ${indent}  ${key}: ${value}`;
    })
    .join('\n');
  return `{\n${objectAsString}\n${indent}}`;
};

const formatStylish = (diffArray, whiteSpace = 0) => {
  if (diffArray.length === 0) {
    return '{}';
  }
  const indent = ' '.repeat(whiteSpace);
  const arrayAsString = diffArray
    .map((item) => {
      if (item.length === 0) return [''];
      const [prefix, key, value, children] = item;
      if (children.length === 0) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          return `  ${indent}${prefix} ${key}: ${formatStylishObject(value, whiteSpace + 4)}`;
        }
        return `  ${indent}${prefix} ${key}: ${value}`;
      }
      return `  ${indent}${prefix} ${key}: ${formatStylish(children, whiteSpace + 4)}`;
    })
    .join('\n');
  return `{\n${arrayAsString}\n${indent}}`;
};

const formatPlain = (diffArray) => {
  if (diffArray.length === 0) return '{}';
  return `{\n ${diffArray.join('\n **** ')}\n}`;
};

export { formatStylish, formatPlain };
