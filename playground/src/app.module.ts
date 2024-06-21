import { ConfigModule } from '@nest-let/config';
import { Log4jsModule } from '@nest-let/log4js';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    Log4jsModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('log4js');
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
