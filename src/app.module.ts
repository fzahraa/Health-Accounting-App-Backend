import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import joi from 'joi';
import { decrypt } from './common/helpers/encryption.helper';
import { DatabaseModule } from './common/config/database/database.module';
import { PostStatusInterceptor } from './common/interceptors/post-status.interceptor';
import { HelloModule } from './hello/hello.module';
import { ShotModule } from './shots/shot.module';
import { XrayModule } from './xrays/xray.module';
import { LabsModule } from './labs/labs.module';
import { ProceduresModule } from './procedures/procedure.module';
import { TestsModule } from './tests/tests.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

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
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
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
    //LoggerModule,
    HelloModule,
    ShotModule,
    XrayModule,
    TestsModule,
    ProceduresModule,
    LabsModule,
    UserModule,
    AuthModule
  ],
  // providers: [
  //   {
  //     provide: APP_INTERCEPTOR,
  //     useClass: PostStatusInterceptor,
  //   },
  // ],
})
export class AppModule {}
