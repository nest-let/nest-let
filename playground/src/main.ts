import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config
  const configService = app.get(ConfigService);
  const { host, port } = configService.get('webserver');

  await app.listen(port);

  console.log(`服务已启动 => http://${host}:${port}/`);
})();
