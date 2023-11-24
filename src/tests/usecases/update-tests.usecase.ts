import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { TestsRepository } from '../tests.repository';
import { UpdateTestsDto } from '../dto/update-tests.dto';

@Injectable()
export default class UpdateTestsUseCase {
  constructor(private testsRepository: TestsRepository) {}

  async execute(id: number, updatetestsDto : UpdateTestsDto): Promise<string | null> {
    const result = await this.testsRepository.update(id, updatetestsDto);
    return result;
  }
}
