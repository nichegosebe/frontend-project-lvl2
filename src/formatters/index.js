import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './json.js';

export default (formatName) => {
  if (formatName === 'plain') return formatPlain;
  if (formatName === 'json') return formatJSON;
  return formatStylish;
};
