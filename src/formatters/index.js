import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formats = {
  plain: formatPlain,
  stylish: formatStylish,
  json: JSON.stringify,
  default: false,
};

export default (data, formatName) => {
  const formatTree = formats[formatName];
  if (!formatTree) throw new Error(`Unknown format name: ${formatName}`);
  return formatTree(data);
};
