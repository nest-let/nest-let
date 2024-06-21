import { Provider, Type } from '@nestjs/common';
import merge from 'deepmerge';
import * as log4js from 'log4js';
import { Configuration, Logger } from 'log4js';

import { Log4jsLogger } from './log4js.classes';
import {
  getDefaultConfig,
  LOG4JS_MODULE_OPTIONS,
  LOG4JS_MODULE_PROVIDER,
} from './log4js.constants';
import { parseNestModuleCallStack } from './log4js.extentions';
import {
  Log4jsModuleAsyncOptions,
  Log4jsModuleOptions,
  Log4jsModuleOptionsFactory,
} from './log4js.interfaces';

const createLog4js = (options: Log4jsModuleOptions = {}) => {
  // 排除 name, dir
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, dir, ...rest } = options;
  const config = merge<Configuration>(getDefaultConfig(options.dir), rest);
  return log4js.configure(config).getLogger();
};

const createLog4jsLogger = (logger: Logger) => {
  logger.setParseCallStackFunction(parseNestModuleCallStack);

  return new Log4jsLogger(logger);
};

export const createNestLog4jsLogger = (
  options: Log4jsModuleOptions,
): Log4jsLogger => createLog4jsLogger(createLog4js(options));

export const createLog4jsProviders = (
  options: Log4jsModuleOptions,
): Provider[] => {
  return [
    {
      provide: LOG4JS_MODULE_PROVIDER,
      useFactory: () => createLog4js(options),
    },
    {
      provide: options.name || Log4jsLogger,
      useFactory: createLog4jsLogger,
      inject: [LOG4JS_MODULE_PROVIDER],
    },
  ];
};

export const createLog4jsAsyncProviders = (
  options: Log4jsModuleAsyncOptions,
): Provider[] => {
  const providers: Provider[] = [
    {
      provide: LOG4JS_MODULE_PROVIDER,
      useFactory: (options: Log4jsModuleOptions) => {
        return createLog4js(options);
      },
      inject: [LOG4JS_MODULE_OPTIONS],
    },
    {
      provide: options.name || Log4jsLogger,
      useFactory: createLog4jsLogger,
      inject: [LOG4JS_MODULE_PROVIDER],
    },
  ];

  if (options.useClass) {
    const useClass = options.useClass as Type<Log4jsModuleOptionsFactory>;
    providers.push(
      ...[
        {
          provide: LOG4JS_MODULE_OPTIONS,
          useFactory: async (optionsFactory: Log4jsModuleOptionsFactory) =>
            await optionsFactory.createLog4jsModuleOptions(),
          inject: [useClass],
        },
        {
          provide: useClass,
          useClass,
        },
      ],
    );
  }

  if (options.useFactory) {
    providers.push({
      provide: LOG4JS_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    });
  }

  return providers;
};
