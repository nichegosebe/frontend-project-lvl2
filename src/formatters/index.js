import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const mapFormat = {
  plain: formatPlain,
  stylish: formatStylish,
  json: JSON.stringify,
};

export default (data, formatName) => {
  const formatTree = mapFormat[formatName];
  if (!formatTree) throw new Error(`Unknown format name: ${formatName}`);
  return formatTree(data);
};
