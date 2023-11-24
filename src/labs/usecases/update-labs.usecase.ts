import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';
import { UpdateLabsDto } from '../dto/update-labs.dto';

@Injectable()
export default class UpdateLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async execute(id: number, updateLabsDto : UpdateLabsDto): Promise<string | null> {
    const result = await this.labsRepository.update(id, updateLabsDto);
    return result;
  }
}
