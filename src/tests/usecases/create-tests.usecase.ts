import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';
import { CreateTestsDto } from '../dto/create-tests.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async createTest(createTestDto: CreateTestsDto): Promise<string | null> {
    let codeExistsException = false;
    try {
      const codeExists = await this.testsRepository.findExistingTestCode(createTestDto.code);
      if(codeExists){
        codeExistsException = true;
        throw exceptions;
      }
      else{
        const result = await this.testsRepository.insertTest(createTestDto);
        return result;
      }
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Test:', error);

      // We can use AppException here to create a custom exception
      if(codeExistsException){
        const appException = new AppException(
          'Bad Request',
          'Code Already Exists',
          HttpStatus.BAD_REQUEST,
          true,
        );
        // Throw the custom exception
        throw appException;
      }
      else{
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
}
