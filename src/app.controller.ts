import { Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':id')
  addToQueue(@Param('id') id: string, @Query('fail') fail: string) {
    if (id === '1') {
      return this.appService.addToQueue1(fail ? true : false);
    } else {
      return this.appService.addToQueue2(fail ? true : false);
    }
  }
}
