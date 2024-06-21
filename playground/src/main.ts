import { Log4jsLogger } from '@nest-let/log4js';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // https://docs.nestjs.cn/9/techniques?id=%e6%97%a5%e5%bf%97
    bufferLogs: process.env.NODE_ENV === 'prod',
  });

  // config
  const configService = app.get(ConfigService);
  const { host, port } = configService.get('webserver');

  // logger
  app.useLogger(app.get(Log4jsLogger));
  const logger = app.get(Logger);

  await app.listen(port);

  logger.log(`服务已启动 => http://${host}:${port}/`);
})();
