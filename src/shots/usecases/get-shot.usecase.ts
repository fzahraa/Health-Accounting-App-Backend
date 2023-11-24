import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';

@Injectable()
export default class GetShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async execute(): Promise<string | null> {
    const result = await this.shotRepository.get();

    return result;
  }
}
