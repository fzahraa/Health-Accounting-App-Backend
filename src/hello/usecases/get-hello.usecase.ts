import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { HelloRepository } from '../hello.repository';

@Injectable()
export default class GetHelloUseCase {
  constructor(private helloRepository: HelloRepository) {}

  async execute(): Promise<string | null> {
    const result = await this.helloRepository.get();

    return result;
  }
}
