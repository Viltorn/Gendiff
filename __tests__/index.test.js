import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let result;
let expectedresult;

test('gendiff json, stylish format', () => {
  result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  expectedresult = readFile('result.txt');
  expect(result).toEqual(expectedresult);
  console.log(getFixturePath('file1.json'));
  console.log(process.cwd());
});

test('gendiff yaml, stylish format', () => {
  result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  expectedresult = readFile('result.txt');
  expect(result).toEqual(expectedresult);
  console.log(process.cwd());
});

test('gendiff json, plain format', () => {
  result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expectedresult = readFile('result-plain.txt');
  expect(result).toEqual(expectedresult);
  console.log(process.cwd());
});

test('gendiff yaml, plain format', () => {
  result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expectedresult = readFile('result-plain.txt');
  expect(result).toEqual(expectedresult);
  console.log(process.cwd());
});
