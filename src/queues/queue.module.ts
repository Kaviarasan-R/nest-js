import { BullBoardModule } from '@bull-board/nestjs';
import {
  ConfigurableModuleBuilder,
  DynamicModule,
  MiddlewareConsumer,
  Module,
} from '@nestjs/common';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullModule, InjectQueue } from '@nestjs/bullmq';
import { TestProcessor1, TestProcessor2 } from './queue.processor';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<{ queues: string[] }>().build();

export const InjectTest1Queue = (): ParameterDecorator =>
  InjectQueue('TEST_QUEUE1');
export const InjectTest2Queue = (): ParameterDecorator =>
  InjectQueue('TEST_QUEUE2');

@Module({})
export class QueueModule extends ConfigurableModuleClass {
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    const bullBoardModules = options.queues.map((name) =>
      BullBoardModule.forFeature({
        name,
        adapter: BullMQAdapter,
      }),
    );

    const bullModules = options.queues.map((name) =>
      BullModule.registerQueue({ name }),
    );

    return {
      module: QueueModule,
      imports: [...bullModules, ...bullBoardModules],
      providers: [TestProcessor1, TestProcessor2],
      exports: [...bullModules, ...bullBoardModules],
    };
  }

  /* Other Method: https://github.com/felixmosh/bull-board/tree/master/examples/with-nestjs */
  /* constructor(@InjectTest1Queue() private readonly testQueue1: Queue, @InjectTest2Queue() private readonly testQueue2: Queue) {}
  
  configure(consumer: MiddlewareConsumer) {
    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath('/queues');

    createBullBoard({
      queues: [new BullMQAdapter(this.testQueue1), new BullMQAdapter(this.testQueue2)],
      serverAdapter,
    });

    // consumer
    //   .apply(BasicAuthMiddleware, serverAdapter.getRouter())
    //   .forRoutes('/queues'); 
  } */
}
