import { type DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigModule as NestConfigModule,
  type ConfigModuleOptions as NestConfigModuleOptions,
} from '@nestjs/config';

import { parseConfig } from './configuration';

export interface ConfigModuleOptions extends NestConfigModuleOptions {
  filepath: string | string[];
}

@Global()
@Module({})
export class ConfigModule {
  public static forRootAsync(options: ConfigModuleOptions): DynamicModule {
    const { filepath, ...rest } = options;
    return NestConfigModule.forRoot({
      isGlobal: true,
      ...rest,
      load: [parseConfig(filepath)],
    });
  }
}
