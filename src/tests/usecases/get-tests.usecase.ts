import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';
import { CreateTestsDto } from '../dto/create-tests.dto';
import { ReadTestsDto } from '../dto/read-tests.dto';

@Injectable()
export default class GetTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async getTests(): Promise<ReadTestsDto[]> {
    try{
    const result = await this.testsRepository.getTests();
    return result;
  } catch (error) {

    const appException = new AppException(
      'Internal server error',
      'An unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
      true,
    );

    // Throw the custom exception
    throw appException;
  }
  }
}
