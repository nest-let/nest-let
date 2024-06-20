import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  /**
   * 判断服务是否正常
   * @returns string
   */
  @Get('ok')
  health() {
    return `I'm OK`;
  }
}
