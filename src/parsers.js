import yaml from 'js-yaml';

const extension = { json: JSON.parse, yml: yaml.load, yaml: yaml.load };

const parseData = (data, ext) => {
  if (extension[ext]) {
    const parser = extension[ext];
    return parser(data);
  }
  throw new Error(`Unsupported file extension ${ext}`);
};

export default parseData;
