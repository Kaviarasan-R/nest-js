import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('TEST_QUEUE1', {
  concurrency: 3,
})
export class TestProcessor1 extends WorkerHost {
  private readonly logger = new Logger(TestProcessor1.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing ${job.id}`);
    if (job.name === 'Q1') this.task(job.data);
    else if (job.name === 'Q2') this.task(job.data);
  }

  task(data: any) {
    console.log('--->' + data.fail);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Active ${job.id}`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    this.logger.debug(`Progress ${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Completed ${job.id}`);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, err: any) {
    const { id, name, queueName, failedReason } = job;
    this.logger.error(
      `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`,
    );

    if (job.attemptsMade < 3) {
      console.log(`Retrying job ${job.id}, attempt ${job.attemptsMade}`);
      await job.retry();
    } else {
      console.log(err);
      job.discard();
    }
  }
}

@Processor('TEST_QUEUE2', {
  concurrency: 3,
})
export class TestProcessor2 extends WorkerHost {
  private readonly logger = new Logger(TestProcessor1.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing ${job.id}`);
    if (job.name === 'Q1') this.task(job.data);
    else if (job.name === 'Q2') this.task(job.data);
  }

  task(data: any) {
    console.log('--->' + data.fail);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    this.logger.log(`Active ${job.id}`);
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    this.logger.debug(`Progress ${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    this.logger.log(`Completed ${job.id}`);
  }

  @OnWorkerEvent('failed')
  async onFailed(job: Job, err: any) {
    const { id, name, queueName, failedReason } = job;
    this.logger.error(
      `Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`,
    );

    if (job.attemptsMade < 3) {
      console.log(`Retrying job ${job.id}, attempt ${job.attemptsMade}`);
      await job.retry();
    } else {
      console.log(err);
      job.discard();
    }
  }
}
