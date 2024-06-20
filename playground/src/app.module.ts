import { ConfigModule } from '@nest-let/config';
import { Module } from '@nestjs/common';
import { resolve } from 'path';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRootAsync({
      filepath: [
        resolve(__dirname, `config`, `config.yml`),
        resolve(__dirname, `config`, `config.${process.env.NODE_ENV}.yml`),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
