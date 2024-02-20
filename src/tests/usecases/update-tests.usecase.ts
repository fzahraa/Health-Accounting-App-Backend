import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';
import { UpdateTestsDto } from '../dto/update-tests.dto';

@Injectable()
export default class UpdateTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async updateTest(id: number, category_id:number, updatetestsDto : UpdateTestsDto): Promise<string | null> {
    try{
    const result = await this.testsRepository.updateTest(id, category_id, updatetestsDto);
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
