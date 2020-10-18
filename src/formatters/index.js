import formatPlain from './plain';
import formatStylish from './stylish';

export default (format) => {
  if (format === 'plain') return formatPlain;
  return formatStylish;
};
