import { test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let result;
let expectedResult;

test('gendiff json, stylish format', () => {
  result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expectedResult = readFile('result.txt');
  expect(result).toEqual(expectedResult);
  console.log(getFixturePath('file1.json'));
  console.log(process.cwd());
});

test('gendiff yaml, stylish format', () => {
  result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  expectedResult = readFile('result.txt');
  expect(result).toEqual(expectedResult);
  console.log(process.cwd());
});

test('gendiff json, plain format', () => {
  result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expectedResult = readFile('result-plain.txt');
  expect(result).toEqual(expectedResult);
  console.log(process.cwd());
});

test('gendiff yaml, plain format', () => {
  result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expectedResult = readFile('result-plain.txt');
  expect(result).toEqual(expectedResult);
  console.log(process.cwd());
});

test('gendiff json format', () => {
  result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  expectedResult = readFile('result-json.json');
  expect(result).toEqual(expectedResult);
  console.log(process.cwd());
});

test('gendiff unsupported file extension', () => {
  expect(() => {
    genDiff(getFixturePath('file.txt'), getFixturePath('file2.json'));
  }).toThrow();
});

test('gendiff unsupported formatter', () => {
  expect(() => {
    genDiff(getFixturePath('file.json'), getFixturePath('file2.json'), 'cool');
  }).toThrow();
});
