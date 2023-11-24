import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';

@Injectable()
export default class GetLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async execute(): Promise<string | null> {
    const result = await this.labsRepository.get();

    return result;
  }
}
