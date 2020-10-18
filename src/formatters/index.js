import formatPlain from './plain.js';
import formatStylish from './stylish.js';

export default (formatName) => {
  if (formatName === 'plain') return formatPlain;
  if (formatName === 'json') return JSON.stringify;
  return formatStylish;
};
