import { ConfigModule } from '@nest-let/config';
import { Module } from '@nestjs/common';
import { resolve } from 'path';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRootAsync({
      filepath: [
        resolve(__dirname, `config`, `config.yaml`),
        resolve(__dirname, `config`, `config.${process.env.NODE_ENV}.yaml`),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
