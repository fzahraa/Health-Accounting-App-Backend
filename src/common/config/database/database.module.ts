import { DynamicModule, Global, Module } from '@nestjs/common';
import { XurpayDbService } from './xurpay-db.service';
import {
  DatabaseOptions,
  DATABASE_CONFIG_OPTIONS,
  DatabaseAsyncOptions,
} from './database-options.type';

@Global()
@Module({
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forRoot(options: DatabaseOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: DATABASE_CONFIG_OPTIONS,
          useValue: options,
        },
        XurpayDbService,
      ],
      exports: [XurpayDbService],
    };
  }

  static forRootAsync(options: DatabaseAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: options.imports,
      providers: [
        {
          provide: DATABASE_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        XurpayDbService,
      ],
      exports: [XurpayDbService],
    };
  }
}
