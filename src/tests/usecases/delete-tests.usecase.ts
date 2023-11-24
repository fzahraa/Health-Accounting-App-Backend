import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';

@Injectable()
export default class DeleteTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async execute(id: number): Promise<string | null> {
    const result = await this.testsRepository.delete(id);

    return result;
  }
}
