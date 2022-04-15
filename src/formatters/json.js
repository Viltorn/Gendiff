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
    if (!Array.isArray(currentValue)) {
      const objEntries = Object.entries(currentValue);
      const innerLines = objEntries
        .map((arr) => {
          const [key, val] = arr;
          if (objEntries.indexOf(arr) === objEntries.length - 1) {
            return `${currentIntend}"${key}": ${iter(val, depth + 1)}`;
          }
          return `${currentIntend}"${key}": ${iter(val, depth + 1)},`;
        });
      return ['{', ...innerLines, `${bracketIntend}}`].join('\n');
    }
    const newintendSize = (depth + 1) * spacecount;
    const newCurrentIntend = replacer.repeat(newintendSize);
    const newBracketIntend = replacer.repeat(newintendSize - spacecount);
    const result = currentValue.map((obj) => {
      const objEntries = Object.entries(obj);
      const innerLines = objEntries
        .map((arr) => {
          const [key, val] = arr;
          if (objEntries.indexOf(arr) === objEntries.length - 1) {
            return `${newCurrentIntend}"${key}": ${iter(val, depth + 2)}`;
          }
          return `${newCurrentIntend}"${key}": ${iter(val, depth + 2)},`;
        });
      if (currentValue.indexOf(obj) === currentValue.length - 1) {
        return [`${newBracketIntend}{`, ...innerLines, `${newBracketIntend}}`].join('\n');
      }
      return [`${newBracketIntend}{`, ...innerLines, `${newBracketIntend}},`].join('\n');
    });
    return ['[', ...result, `${bracketIntend}]`].join('\n');
  };
  return iter(value, 1);
};
export default formatToJson;
