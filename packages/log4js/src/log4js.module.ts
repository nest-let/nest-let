import {
  DynamicModule,
  Global,
  Logger,
  LoggerService,
  Module,
} from '@nestjs/common';

import { Log4jsLogger } from './log4js.classes';
import {
  Log4jsModuleAsyncOptions,
  Log4jsModuleOptions,
} from './log4js.interfaces';
import {
  createLog4jsAsyncProviders,
  createLog4jsProviders,
  createNestLog4jsLogger,
} from './log4js.providers';

@Global()
@Module({
  exports: [Log4jsLogger],
})
export class Log4jsModule {
  public static forRoot(options: Log4jsModuleOptions = {}): DynamicModule {
    const providers = [...createLog4jsProviders(options), Logger];

    return {
      module: Log4jsModule,
      providers,
      exports: providers,
    };
  }

  public static forRootAsync(options: Log4jsModuleAsyncOptions): DynamicModule {
    const providers = [...createLog4jsAsyncProviders(options), Logger];

    return {
      module: Log4jsModule,
      imports: options.imports,
      providers,
      exports: [...providers],
    };
  }

  public static createLogger(options: Log4jsModuleOptions): LoggerService {
    return createNestLog4jsLogger(options);
  }
}
