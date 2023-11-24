import { Inject, Injectable } from '@nestjs/common';
import client, { Connection } from 'amqplib';
import { QueueOptions } from './queue-options.type';
import { QUEUE_CONFIG_OPTIONS } from './queue-options.type';

@Injectable()
export default class QueueService {
  private connectionPromise: Promise<Connection>;
  private connection: Connection;

  constructor(@Inject(QUEUE_CONFIG_OPTIONS) private options: QueueOptions) {
    this.connectionPromise = client
      .connect({
        protocol: this.options.protocol,
        hostname: this.options.hostname,
        username: this.options.username,
        password: this.options.password,
      })
      .catch((error) => {
        throw error;
      });
  }

  async sendToQueue(queueName: string, message: string): Promise<boolean> {
    if (!this.connection) this.connection = await this.connectionPromise;
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    return channel.sendToQueue(queueName, Buffer.from(message), {
      contentType: 'application/json',
    });
  }
}
