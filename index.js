import _ from 'lodash';
import getFileData from './src/parsers.js';

const stylish = (value, replacer = '  ', spacecount = 2) => {
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
        if (val.status === 'added') {
          return `${smallIntend}+ ${key}: ${iter(val.data, depth + 1)}`;
        }
        if (val.status === 'deleted') {
          return `${smallIntend}- ${key}: ${iter(val.data, depth + 1)}`;
        }
        if (val.status === 'changed') {
          return `${smallIntend}- ${key}: ${iter(val.olddata, depth + 1)}\n${smallIntend}+ ${key}: ${iter(val.newdata, depth + 1)}`;
        }
        if (val.status === 'unchanged' || val.status === 'unset') {
          return `${bigIntend}${key}: ${iter(val.data, depth + 1)}`;
        }
        return `${bigIntend}${key}: ${iter(val, depth + 1)}`;
      });
    return ['{', ...lines, `${bracketIntend}}`].join('\n');
  };
  return iter(value, 1);
};

const getDataDiff = (file1Data, file2Data) => {
  const keys1 = Object.keys(file1Data);
  const keys2 = Object.keys(file2Data);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = unionKeys.sort();
  const result = sortedKeys.reduce((acc, key) => {
    if (!Object.hasOwn(file1Data, key)) {
      acc[key] = { data: file2Data[key], status: 'added' };
    } else if (!Object.hasOwn(file2Data, key)) {
      acc[key] = { data: file1Data[key], status: 'deleted' };
    } else if (_.isObject(file1Data[key]) && _.isObject(file2Data[key])) {
      acc[key] = { data: getDataDiff(file1Data[key], file2Data[key]), status: 'unset' };
    } else if (file1Data[key] !== file2Data[key]) {
      acc[key] = { olddata: file1Data[key], newdata: file2Data[key], status: 'changed' };
    } else {
      acc[key] = { data: file1Data[key], status: 'unchanged' };
    }
    return acc;
  }, {});
  return result;
};

const genDiff = (file1, file2, formatter) => {
  const file1Data = getFileData(file1);
  const file2Data = getFileData(file2);
  const data = getDataDiff(file1Data, file2Data);
  switch (formatter) {
    case 'stylish':
      return stylish(data);
    default:
      return stylish(data);
  }
};

export default genDiff;
