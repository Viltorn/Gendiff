import _ from 'lodash';
import path from 'path';
import { readFileSync } from 'fs';
import { cwd } from 'process';

const normalizePath = (filepath) => path.resolve(cwd(), filepath);

const getFileData = (filepath) => {
  const fileData = readFileSync(normalizePath(filepath), 'utf8');
  return JSON.parse(fileData);
};

const genDiff = (file1, file2) => {
  const file1Data = getFileData(file1);
  const file2Data = getFileData(file2);
  const keys1 = Object.keys(file1Data);
  const keys2 = Object.keys(file2Data);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = unionKeys.sort();
  const comparedData = sortedKeys.flatMap((value) => {
    if (!Object.hasOwn(file1Data, value)) {
      return `  + ${value}: ${file2Data[value]}`;
    }
    if (!Object.hasOwn(file2Data, value)) {
      return `  - ${value}: ${file1Data[value]}`;
    }
    if (file1Data[value] !== file2Data[value]) {
      return [`  - ${value}: ${file1Data[value]}`, `  + ${value}: ${file2Data[value]}`];
    }
    return `    ${value}: ${file1Data[value]}`;
  });
  console.log(normalizePath(file1));
  return `{\n${comparedData.join('\n')}\n}`;
};

export default genDiff;
