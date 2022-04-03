import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

let result;
let expectedresult;

test('gendiff json', () => {
  result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expectedresult = readFile('result.txt');
  expect(result).toEqual(expectedresult);
  console.log(getFixturePath('file1.json'));
  console.log(process.cwd());
});

test('gendiff yaml', () => {
  result = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expectedresult = readFile('result.txt');
  expect(result).toEqual(expectedresult);
  console.log(process.cwd());
});
