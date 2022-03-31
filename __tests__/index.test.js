import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff json', () => {
  expect(genDiff('/Users/viktor/Desktop/Веб_разработка/frontend-project-lvl2/__fixtures__/file1.json', '/Users/viktor/Desktop/Веб_разработка/frontend-project-lvl2/__fixtures__/file2.json')).toEqual(readFile('result-plain.txt'));
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(readFile('result-plain.txt'));
});
