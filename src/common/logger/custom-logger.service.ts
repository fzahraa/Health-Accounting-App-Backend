import { Injectable, LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';
import rTracer from 'cls-rtracer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: LoggerService;
  constructor(configService: ConfigService) {
    const logDir = configService.get('LOG_DIR');
    const logFileName = configService.get('LOG_FILENAME');
    this.logger = WinstonModule.createLogger({
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.DailyRotateFile({
          level: 'info',
          filename: `${logDir}/${logFileName}-%DATE%.info.log`,
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new transports.DailyRotateFile({
          level: 'error',
          filename: `${logDir}/${logFileName}-%DATE%.error.log`,
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d',
        }),
        // we also want to see logs in our console
        //new transports.Console(),
      ],
    });
  }

  private getRequestId(): any {
    const rid = rTracer.id();
    return rid;
  }
  log(message: any, ...optionalParams: any[]) {
    const reqId = this.getRequestId();
    if (reqId) this.logger.log(message, { reqId: this.getRequestId() });
    else this.logger.log(message);
  }
  error(message: any, ...optionalParams: any[]) {
    const reqId = this.getRequestId();
    if (reqId)
      this.logger.error(message, {
        reqId: this.getRequestId(),
        stack: message.stack,
      });
    else this.logger.error(message);
  }
  warn(message: any, ...optionalParams: any[]) {
    const reqId = this.getRequestId();
    if (reqId) this.logger.log(message, { reqId: this.getRequestId() });
    else this.logger.log(message);
  }
  debug?(message: any, ...optionalParams: any[]) {
    const reqId = this.getRequestId();
    if (reqId) this.logger.debug(message, { reqId: this.getRequestId() });
    else this.logger.debug(message);
  }
}
