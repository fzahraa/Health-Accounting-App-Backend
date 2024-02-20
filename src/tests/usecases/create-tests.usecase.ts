import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';
import { CreateTestsDto } from '../dto/create-tests.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async createTest(createTestDto: CreateTestsDto[]): Promise<string | null> {
    try {
        const result = await this.testsRepository.insertTest(createTestDto);
        return result;
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Test:', error);
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
