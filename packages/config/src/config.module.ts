import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { parseConfig } from './parse-config';

export interface ConfigModuleOptions {
  filepath: string | string[];
}

@Global()
@Module({})
export class ConfigModule {
  public static forRootAsync(options: ConfigModuleOptions): DynamicModule {
    return NestConfigModule.forRoot({
      isGlobal: true,
      load: [parseConfig(options.filepath)],
    });
  }
}
