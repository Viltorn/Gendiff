import _ from 'lodash';

const formatOutput = (value) => {
  const valueType = typeof value;
  return valueType === 'string' ? `'${value}'` : value;
};

const formatToPlain = (value) => {
  const iter = (currentValue, path) => {
    const result = currentValue
      .flatMap((obj) => {
        const { status } = obj;
        if (status === 'added') {
          const data = _.isObject(obj.value) ? '[complex value]' : formatOutput(obj.value);
          return `Property '${[...path, obj.key].join('.')}' was added with value: ${data}`;
        }
        if (status === 'deleted') {
          return `Property '${[...path, obj.key].join('.')}' was removed`;
        }
        if (status === 'changed') {
          const oldData = _.isObject(obj.oldValue) ? '[complex value]' : formatOutput(obj.oldValue);
          const newData = _.isObject(obj.newValue) ? '[complex value]' : formatOutput(obj.newValue);
          return `Property '${[...path, obj.key].join('.')}' was updated. From ${oldData} to ${newData}`;
        }
        if (status === 'unchanged') {
          return [];
        }
        return iter(obj.children, [...path, obj.key]);
      });
    return result.join('\n');
  };
  return iter(value, []);
};
export default formatToPlain;
