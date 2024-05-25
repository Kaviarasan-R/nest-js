import { Injectable } from '@nestjs/common';
import { CustomConfigService } from './dynamic-module/custom-config.service';
import { InjectTest1Queue, InjectTest2Queue } from './queues/queue.module';
import { Queue } from 'bullmq';

@Injectable()
export class AppService {
  private helloMessage: string;

  constructor(
    customConfigService: CustomConfigService,
    @InjectTest1Queue() private testQueue1: Queue,
    @InjectTest2Queue() private testQueue2: Queue,
  ) {
    this.helloMessage = customConfigService.get('MESSAGE');
  }

  getHello(): string {
    return this.helloMessage;
  }

  addToQueue1(fail: boolean) {
    this.testQueue1.add('Q1', { fail });
    return 'OK';
  }

  addToQueue2(fail: boolean) {
    this.testQueue2.add('Q2', { fail });
    return 'OK';
  }
}
