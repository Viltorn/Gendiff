import _ from 'lodash';

const getDataDiff = (file1Data, file2Data) => {
  const keys1 = Object.keys(file1Data);
  const keys2 = Object.keys(file2Data);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
  const result = sortedKeys.map((key) => {
    if (!Object.prototype.hasOwnProperty.call(file1Data, `${key}`)) {
      const value = _.isObject(file2Data[key]) ? 'children' : 'value';
      return { key, status: 'added', [value]: file2Data[key] };
    }
    if (!Object.prototype.hasOwnProperty.call(file2Data, `${key}`)) {
      const value = _.isObject(file1Data[key]) ? 'children' : 'value';
      return { key, status: 'deleted', [value]: file1Data[key] };
    }
    if (_.isObject(file1Data[key]) && _.isObject(file2Data[key])) {
      return { key, status: 'nested', children: getDataDiff(file1Data[key], file2Data[key]) };
    }
    if (file1Data[key] !== file2Data[key]) {
      return {
        key, status: 'changed', oldValue: file1Data[key], newValue: file2Data[key],
      };
    }
    return { key, status: 'unchanged', value: file1Data[key] };
  });
  return result;
};

export default getDataDiff;
