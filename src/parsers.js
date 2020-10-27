import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const numberify = (data) => Object.entries(data).reduce((acc, [key, value]) => {
  if (_.isObject(value) && !_.isArray(value)) return { ...acc, [key]: numberify(value) };
  const parsedValue = parseInt(value, 10);
  if (!Number.isNaN(parsedValue)) {
    return { ...acc, [key]: parsedValue };
  }
  return { ...acc, [key]: value };
}, {});

const parseIni = (data) => numberify(ini.parse(data));

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  yml: yaml.safeLoad,
  ini: parseIni,
};

export default (data, dataType) => {
  if (dataType === undefined) {
    throw new Error('Cannot parse undefined data type!');
  }

  const parse = dataType === '' ? parsers.json : parsers[dataType];

  if (!parse) {
    throw new Error(`Cannot parse: unknown data type: ${dataType}`);
  }
  return parse(data);
};
