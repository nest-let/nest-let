import { ModuleMetadata, Type } from '@nestjs/common';
import { Configuration } from 'log4js';

export type Log4jsModuleOptions = {
  name?: string;
  dir?: string;
} & Partial<Configuration>;

export interface Log4jsModuleOptionsFactory {
  createLog4jsModuleOptions():
    | Promise<Log4jsModuleOptions>
    | Log4jsModuleOptions;
}

export interface Log4jsModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useFactory?: (
    ...args: any[]
  ) => Promise<Log4jsModuleOptions> | Log4jsModuleOptions;
  inject?: any[];
  useClass?: Type<Log4jsModuleOptionsFactory>;
  useExisting?: Type<Log4jsModuleOptionsFactory>;
}
