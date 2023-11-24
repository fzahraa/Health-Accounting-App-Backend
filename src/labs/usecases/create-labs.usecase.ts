import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';
import { CreateLabsDto } from '../dto/create-labs.dto';

@Injectable()
export default class CreateLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async execute(createLabsDto : CreateLabsDto): Promise<string | null> {
    const result = await this.labsRepository.insert(createLabsDto);
    return result;
  }
}
