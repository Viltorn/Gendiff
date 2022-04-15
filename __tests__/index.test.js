import { test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const stylishResult = readFileSync(getFixturePath('result.txt'), 'utf-8');
const plainResult = readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
const jsonResult = readFileSync(getFixturePath('result-json.json'), 'utf-8');

const extension = ['yml', 'json'];

test.each(extension)('gendiff function', (ext) => {
  const file1path = getFixturePath(`file1.${ext}`);
  const file2path = getFixturePath(`file2.${ext}`);
  expect(genDiff(file1path, file2path, 'stylish')).toEqual(stylishResult);
  expect(genDiff(file1path, file2path, 'plain')).toEqual(plainResult);
  expect(genDiff(file1path, file2path, 'json')).toEqual(jsonResult);
  expect(genDiff(file1path, file2path)).toEqual(stylishResult);
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
