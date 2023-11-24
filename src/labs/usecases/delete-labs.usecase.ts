import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';

@Injectable()
export default class DeleteLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async execute(id: number): Promise<string | null> {
    const result = await this.labsRepository.delete(id);

    return result;
  }
}
