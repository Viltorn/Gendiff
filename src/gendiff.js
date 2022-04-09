import path from 'path';
import { readFileSync } from 'fs';
import formatData from './formatters/index.js';
import parseData from './parsers.js';
import getDataDiff from './datadiff.js';

const makePath = (filepath) => path.resolve(filepath);
const getFileExt = (filepath) => {
  const normalizedExt = path.extname(filepath).slice(1);
  return normalizedExt;
};
const getFileData = (filepath) => readFileSync(filepath, 'utf8');

const genDiff = (file1, file2, formatter = 'stylish') => {
  const file1AbsolutePath = makePath(file1);
  const file2AbsolutePath = makePath(file2);
  const file1Ext = getFileExt(file1AbsolutePath);
  const file2Ext = getFileExt(file2AbsolutePath);
  const file1Data = getFileData(file1AbsolutePath);
  const file2Data = getFileData(file2AbsolutePath);
  const normalizedFile1Data = parseData(file1Data, file1Ext);
  const normalizedFile2Data = parseData(file2Data, file2Ext);
  const data = getDataDiff(normalizedFile1Data, normalizedFile2Data);
  return formatData(data, formatter);
};

export default genDiff;
