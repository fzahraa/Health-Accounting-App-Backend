import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';

@Injectable()
export default class DeleteShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async execute(id: number): Promise<string | null> {
    const result = await this.shotRepository.delete(id);

    return result;
  }
}
