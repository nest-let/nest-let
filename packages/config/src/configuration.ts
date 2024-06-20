import merge from 'deepmerge';
import { promises } from 'fs';
import * as yaml from 'js-yaml';

export const parseYaml = async (filepath: string) => {
  return yaml.load(await promises.readFile(filepath, 'utf-8')) || {};
};

export const parseConfig = (filepath: string | string[]) => {
  return async () => {
    if (typeof filepath === 'string') {
      filepath = [filepath];
    }

    const task = filepath.map((item) => parseYaml(item));
    const result = await Promise.all(task);

    return result.reduce<Record<string, any>>(
      (res, item) => merge(res, item),
      {},
    );
  };
};
