import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';
import { UpdateShotDto } from '../dto/update-shot.dto';

@Injectable()
export default class UpdateShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async execute(id: number, updateShotDto : UpdateShotDto): Promise<string | null> {
    const result = await this.shotRepository.update(id, updateShotDto);
    return result;
  }
}
