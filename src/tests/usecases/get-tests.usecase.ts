import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';

@Injectable()
export default class GetTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async execute(): Promise<string | null> {
    const result = await this.testsRepository.get();

    return result;
  }
}
