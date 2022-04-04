import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const formatData = (data, formatter) => {
  switch (formatter) {
    case 'stylish':
      return formatStylish(data);
    case 'plain':
      return formatPlain(data);
    default:
      throw new Error(`Unknown formatter ${formatter}`);
  }
};
export default formatData;
