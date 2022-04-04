import formatToPlain from './plain.js';
import formatToStylish from './stylish.js';
import formatToJson from './json.js';

const formatData = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return formatToStylish(data);
    case 'plain':
      return formatToPlain(data);
    case 'json':
      return formatToJson(data);
    default:
      throw new Error(`Unknown formatter ${formatter}`);
  }
};
export default formatData;
