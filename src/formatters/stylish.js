import _ from 'lodash';

const stringify = (value, depthlevel, replacer, spacecount) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const intendSize = depth * spacecount;
    const intend = replacer.repeat(intendSize);
    const bracketIntend = replacer.repeat(intendSize - spacecount);
    const result = Object
      .entries(data)
      .map((arr) => {
        const [key, val] = arr;
        return `${intend}${key}: ${iter(val, depth + 1)}`;
      });
    return ['{', ...result, `${bracketIntend}}`].join('\n');
  };
  return iter(value, depthlevel);
};

const formatToStylish = (value, replacer = '  ', spacecount = 2) => {
  const iter = (data, depth) => {
    const intendSize = depth * spacecount;
    const bigIntend = replacer.repeat(intendSize);
    const smallIntend = replacer.repeat(intendSize - 1);
    const bracketIntend = replacer.repeat(intendSize - spacecount);
    const result = data.map((obj) => {
      const { status } = obj;
      switch (status) {
        case 'added':
          return `${smallIntend}+ ${obj.key}: ${stringify(obj.value, depth + 1, replacer, spacecount)}`;
        case 'deleted':
          return `${smallIntend}- ${obj.key}: ${stringify(obj.value, depth + 1, replacer, spacecount)}`;
        case 'changed':
          return `${smallIntend}- ${obj.key}: ${stringify(obj.oldValue, depth + 1, replacer, spacecount)}\n${smallIntend}+ ${obj.key}: ${stringify(obj.newValue, depth + 1, replacer, spacecount)}`;
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
