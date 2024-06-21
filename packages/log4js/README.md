# @nest-let/log4js

## usage

1. 安装依赖

```sh
npm install @nest-let/log4js log4js
```

2. 引入模块

```ts
// src/app.module.ts
@Module({
  imports: [
    Log4jsModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('log4js');
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

3. 使用

```ts
// src/main.ts
const app = await NestFactory.create(AppModule, {
  // https://docs.nestjs.cn/9/techniques?id=%e6%97%a5%e5%bf%97
  bufferLogs: process.env.NODE_ENV === 'prod',
});
app.useLogger(app.get(Log4jsLogger));
const logger = app.get(Logger);

logger.log(`服务已启动 => http://${host}:${port}/`);
```
