import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import joi from 'joi';
import { decrypt } from './common/helpers/encryption.helper';
import { QueueModule } from './common/config/queue/queue.module';
import { DatabaseModule } from './common/config/database/database.module';
import { CacheModule } from './common/config/cache/cache.module';
import { LoggerModule } from './common/logger/logger.module';
import { AWSModule } from './common/config/aws/aws.module';
import { PostStatusInterceptor } from './common/interceptors/post-status.interceptor';
import { HelloModule } from './hello/hello.module';
import { ShotModule } from './shots/shot.module';
import { XrayModule } from './xrays/xray.module';
import { LabsModule } from './labs/labs.module';
import { ProceduresModule } from './procedures/procedure.module';
import { TestsModule } from './tests/tests.module';

const configValidationSchema = joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'test', 'sandbox', 'live')
    .required(),
  PORT: joi.number().required().default(3000),
  DB_HOST: joi.string().required(),
  DB_USER: joi.string().required(),
  DB_PASSWORD: joi.string().required(),
  DB_NAME: joi.string().required(),
  DB_CONNECTION_LIMIT: joi.number().required(),
  DB_PORT: joi.number().required().default(5432),
  // LOG_DIR: joi.string().required(),
  // LOG_FILENAME: joi.string().required(),
  // RABBITMQ_PROTOCOL: joi.string().required(),
  // RABBITMQ_HOST: joi.string().required(),
  // RABBITMQ_USER: joi.string().required(),
  // RABBITMQ_PASSWORD: joi.string().required(),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    // CacheModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     environment: configService.get('NODE_ENV'),
    //     port: configService.get('REDIS_PORT'),
    //     host: configService.get('REDIS_HOST'),
    //     username: decrypt(configService.get('REDIS_USER')),
    //     password: decrypt(configService.get('REDIS_PASSWORD')),
    //     db: configService.get('REDIS_DB'),
    //   }),
    // }),
    // QueueModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     protocol: configService.get('RABBITMQ_PROTOCOL'),
    //     hostname: configService.get('RABBITMQ_HOST'),
    //     username: decrypt(configService.get('RABBITMQ_USER')),
    //     password: decrypt(configService.get('RABBITMQ_PASSWORD')),
    //   }),
    // }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: (configService.get('DB_USER')),
        password: (configService.get('DB_PASSWORD')),
        // username: decrypt(configService.get('DB_USER')),
        // password: decrypt(configService.get('DB_PASSWORD')),
        connectionLimit: configService.get('DB_CONNECTION_LIMIT'),
      }),
    }),
    // AWSModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     region: configService.get('AWS_REGION'),
    //     accessKeyId: decrypt(configService.get('AWS_ACCESS_KEY_ID')),
    //     secretAccessKey: decrypt(configService.get('AWS_SECRET_ACCESS_KEY')),
    //     batchWithdrawalBucket: configService.get('AWS_BATCH_WITHDRAWAL_BUCKET'),
    //   }),
    // }),
    //LoggerModule,
    HelloModule,
    ShotModule,
    XrayModule,
    TestsModule,
    ProceduresModule,
    LabsModule,
  ],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: PostStatusInterceptor,
  //   },
  // ],
})
export class AppModule {}
