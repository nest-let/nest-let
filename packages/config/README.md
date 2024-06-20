# @nest-let/config

## usage

1. 安装依赖

```sh
npm install @nest-let/config @nestjs/config
```

2. 新建 `src/config` 配置目录

- `src/config/config.yml`
- `src/config/config.dev.yml`
- `src/config/config.prod.yml`

3. 使用

```ts
// src/app.module.ts
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
})
export class AppModule {}
```

4. 配置 `nest-cli.json`

```json
{
  "compilerOptions": {
    "assets": ["**/*.yml"]
  }
}
```

**注意** ：如果 `config` 文件夹与 `src` 文件夹处于同一级别，则添加值为：

```json
// `nest-cli.json`
{
  "compilerOptions": {
    "assets": [{ "include": "../config/*.yaml", "outDir": "./dist/config" }]
  }
}
```

[详情参考](https://docs.nestjs.com/techniques/configuration)

[中文详情参考](https://nest.nodejs.cn/techniques/configuration)

## 配置覆盖顺序

`filepath` 配置文件，后面的配置文件会覆盖前面的字段
