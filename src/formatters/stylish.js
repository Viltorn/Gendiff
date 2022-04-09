import _ from 'lodash';

const formatToStylish = (value, replacer = '  ', spacecount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const intendSize = depth * spacecount;
    const bigIntend = replacer.repeat(intendSize);
    const smallIntend = replacer.repeat(intendSize - 1);
    const bracketIntend = replacer.repeat(intendSize - spacecount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => {
        switch (val.status) {
          case 'added':
            return `${smallIntend}+ ${key}: ${iter(val.data, depth + 1)}`;
          case 'deleted':
            return `${smallIntend}- ${key}: ${iter(val.data, depth + 1)}`;
          case 'changed':
            return `${smallIntend}- ${key}: ${iter(val.oldData, depth + 1)}\n${smallIntend}+ ${key}: ${iter(val.newData, depth + 1)}`;
          case 'unchanged':
            return `${bigIntend}${key}: ${iter(val.data, depth + 1)}`;
          case 'nested':
            return `${bigIntend}${key}: ${iter(val.data, depth + 1)}`;
          default:
            return `${bigIntend}${key}: ${iter(val, depth + 1)}`;
        }
      });
    return ['{', ...lines, `${bracketIntend}}`].join('\n');
  };
  return iter(value, 1);
};
export default formatToStylish;
