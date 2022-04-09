import _ from 'lodash';

const formatToJson = (value, replacer = ' ', spacecount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      const valueType = typeof currentValue;
      return valueType === 'string' ? `"${currentValue}"` : currentValue;
    }
    const intendSize = depth * spacecount;
    const currentIntend = replacer.repeat(intendSize);
    const bracketIntend = replacer.repeat(intendSize - spacecount);
    const lines = Object.entries(currentValue);
    const result = lines.map((arr) => {
      const [key, val] = arr;
      if (lines.indexOf(arr) === lines.length - 1) {
        return `${currentIntend}"${key}": ${iter(val, depth + 1)}`;
      }
      return `${currentIntend}"${key}": ${iter(val, depth + 1)},`;
    });
    return ['{', ...result, `${bracketIntend}}`].join('\n');
  };
  return iter(value, 1);
};
export default formatToJson;
