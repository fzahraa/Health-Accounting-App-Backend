import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rTracer from 'cls-rtracer';
import helmet from 'helmet';
import compression from 'compression';
import { AppExceptionFilter } from './common/filters/app-exception.filter';
import { CustomLoggerService } from './common/logger/custom-logger.service';
import { HttpStatus, Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { optionsMiddleware } from './common/middlewares/options.middleware';

/* Custom overrides start */
// This is used let JSON know how to serialize a bigint.
// https://github.com/GoogleChromeLabs/jsbi/issues/30#issuecomment-1017073129
BigInt.prototype['toJSON'] = function () {
  return this.toString();
};
/* Custom overrides end */

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    const allowedOrigins = ['http://localhost:4200', 'http://localhost:4300'];
    const options: CorsOptions = {
      origin: allowedOrigins,
      credentials: true,
      preflightContinue: false,
      optionsSuccessStatus: HttpStatus.OK,
    };
    app.enableCors(options);
  }
  app.use(optionsMiddleware);
  app.setGlobalPrefix('api');

  app.use(helmet());
  app.use(compression());
  app.use(
    rTracer.expressMiddleware({
      useHeader: true,
      headerName: 'x-request-id',
    }),
  );
  app.useGlobalFilters(new AppExceptionFilter());
  
  await app.listen(process.env.PORT, () => {
    //app.useLogger(app.get(CustomLoggerService));
    //Logger.log(`Running on http://localhost:3000`);
    Logger.log(`Running on http://localhost:${process.env.PORT}`);
  });
}
bootstrap();
