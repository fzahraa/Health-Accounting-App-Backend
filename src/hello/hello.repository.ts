import { Injectable } from '@nestjs/common';
import { XurpayDbService } from 'src/common/config/database/xurpay-db.service';

@Injectable()
export class HelloRepository {
  constructor(private sqlDb: XurpayDbService) {}
  get(): string {
    return 'Hello World!';
  }
}
