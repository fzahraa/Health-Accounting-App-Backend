import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';

@Injectable()
export class HelloRepository {
  constructor(private sqlDb: DbService) {}
  get(): string {
    return 'Hello World!';
  }
}
