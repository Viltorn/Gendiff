import _ from 'lodash';

const formatValue = (value) => {
  const valueType = typeof value;
  return valueType === 'string' ? `'${value}'` : value;
};

const isComplexValue = (value) => _.isObject(value);

const formatPlain = (value) => {
  const iter = (currentValue, path) => {
    const result = Object
      .entries(currentValue)
      .flatMap(([key, val]) => {
        if (val.status === 'added') {
          const data = isComplexValue(val.data) ? '[complex value]' : formatValue(val.data);
          return `Property '${[...path, key].join('.')}' was added with value: ${data}`;
        }
        if (val.status === 'deleted') {
          return `Property '${[...path, key].join('.')}' was removed`;
        }
        if (val.status === 'changed') {
          const oldData = isComplexValue(val.oldData) ? '[complex value]' : formatValue(val.oldData);
          const newData = isComplexValue(val.newData) ? '[complex value]' : formatValue(val.newData);
          return `Property '${[...path, key].join('.')}' was updated. From ${oldData} to ${newData}`;
        }
        if (val.status === 'unchanged') {
          return [];
        }
        return iter(val.data, [...path, key]);
      });
    return result.join('\n');
  };
  return iter(value, []);
};
export default formatPlain;
