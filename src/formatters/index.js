import formatPlain from './plain.js';
import formatStylish from './stylish.js';
import formatJSON from './json.js';

export default (format) => {
  if (format === 'plain') return formatPlain;
  if (format === 'json') return formatJSON;
  return formatStylish;
};
