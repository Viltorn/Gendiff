import formatToPlain from './plain.js';
import formatToStylish from './stylish.js';
import formatToJson from './json.js';

const formatters = { stylish: formatToStylish, plain: formatToPlain, json: formatToJson };

const formatData = (data, formatter) => {
  if (formatters[formatter]) {
    const formater = formatters[formatter];
    return formater(data);
  }
  throw new Error(`Unsupported formatter ${formatter}`);
};

export default formatData;
