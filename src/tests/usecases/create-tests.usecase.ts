import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';
import { CreateTestsDto } from '../dto/create-tests.dto';

@Injectable()
export default class CreateTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async execute(createtestsDto : CreateTestsDto): Promise<string | null> {
    const result = await this.testsRepository.insert(createtestsDto);
    return result;
  }
}
