import _ from 'lodash';

const formatToStylish = (value, replacer = '  ', spacecount = 2) => {
  const iter = (currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return currentValue;
    }
    const intendSize = depth * spacecount;
    const bigIntend = replacer.repeat(intendSize);
    const smallIntend = replacer.repeat(intendSize - 1);
    const bracketIntend = replacer.repeat(intendSize - spacecount);
    if (!Array.isArray(currentValue)) {
      const result = Object
        .entries(currentValue)
        .map((arr) => {
          const [key, val] = arr;
          return `${bigIntend}${key}: ${iter(val, depth + 1)}`;
        });
      return ['{', ...result, `${bracketIntend}}`].join('\n');
    }
    const result = currentValue.map((obj) => {
      const { status } = obj;
      switch (status) {
        case 'added':
          if (obj.value !== undefined) {
            return `${smallIntend}+ ${obj.key}: ${obj.value}`;
          }
          return `${smallIntend}+ ${obj.key}: ${iter(obj.children, depth + 1)}`;
        case 'deleted':
          if (obj.value !== undefined) {
            return `${smallIntend}- ${obj.key}: ${obj.value}`;
          }
          return `${smallIntend}- ${obj.key}: ${iter(obj.children, depth + 1)}`;
        case 'changed':
          return `${smallIntend}- ${obj.key}: ${iter(obj.oldValue, depth + 1)}\n${smallIntend}+ ${obj.key}: ${iter(obj.newValue, depth + 1)}`;
        case 'unchanged':
          return `${bigIntend}${obj.key}: ${obj.value}`;
        default:
          return `${bigIntend}${obj.key}: ${iter(obj.children, depth + 1)}`;
      }
    });
    return ['{', ...result, `${bracketIntend}}`].join('\n');
  };
  return iter(value, 1);
};
export default formatToStylish;
