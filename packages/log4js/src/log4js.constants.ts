import { Configuration, LoggingEvent } from 'log4js';
import path from 'path';

export const LOG4JS_MODULE_OPTIONS = 'Log4jsModuleOptions';
export const LOG4JS_MODULE_PROVIDER = 'Log4js';

// https://log4js-node.github.io/log4js-node/file.html
export const getDefaultConfig = (dir = './logs'): Configuration => {
  // https://log4js-node.github.io/log4js-node/layouts.html
  const layout = {
    type: 'pattern',
    // log4js default pattern %d{yyyy-MM-dd HH:mm:ss:SSS} [%thread] %-5level %logger{36} - %msg%n
    // '%d{yyyy-MM-dd hh:mm:ss:SSS} %-5.5p --- [%15.15x{name}] %50.40f{3}:%l:%o : %m',
    // we use process id instead thread id
    // pattern: '%d{yyyy-MM-dd hh:mm:ss:SSS} %-5.5p --- [%15.15x{name}] %50.50x{location} : %m',
    pattern:
      '%d{yyyy-MM-dd hh:mm:ss:SSS} %[%-5.5p%] ---%50.50x{location} : %[%m%]',
    tokens: {
      // name: (logEvent: LoggingEvent) => {
      //   const { context } = logEvent;
      //   return (context && context['name']) || '-';
      // },
      location: (logEvent: LoggingEvent) => {
        const { fileName = '', lineNumber, columnNumber } = logEvent;
        let message = `${fileName
          .split(path.sep)
          .slice(-3)
          .join(path.sep)}:${lineNumber}:${columnNumber}`;
        message = message.substring(message.length - 50);
        return `${new Array(50 - message.length).join('-')} ${message}`;
      },
    },
  };

  return {
    appenders: {
      stdout: {
        type: 'stdout',
        layout,
      },
      app: {
        type: 'dateFile', // 写入文件格式，并按照日期分类
        filename: `${dir}/app.log`, // 日志文件名，会命名为：app.2022-05-01.log
        alwaysIncludePattern: true, // 为 true 则每个文件都会按 pattern 命名，否则最新的文件不会按照 pattern 命名
        pattern: `yyyy-MM-dd`, // 日期格式
        daysToKeep: 30, // 文件保存日期 30 天
        numBackups: 3, // 配置日志文件最多存在个数
        compress: true, // 配置日志文件是否压缩
        keepFileExt: true, // 是否保留文件后缀
        layout,
      },
      errorFile: {
        type: 'dateFile',
        filename: `${dir}/error.log`,
        alwaysIncludePattern: true,
        pattern: `yyyy-MM-dd`,
        daysToKeep: 30,
        numBackups: 3,
        compress: true,
        keepFileExt: true,
      },
      errors: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'errorFile',
      },
    },
    categories: {
      default: {
        enableCallStack: true,
        appenders: ['stdout', 'app', 'errors'],
        level: 'debug',
      },
    },
    pm2: true, // 使用 pm2 来管理项目时，打开
    pm2InstanceVar: 'INSTANCE_ID', // 会根据 pm2 分配的 id 进行区分，以免各进程在写日志时造成冲突
  };
};
