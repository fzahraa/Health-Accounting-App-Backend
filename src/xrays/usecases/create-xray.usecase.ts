import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';
import { CreateXrayDto } from '../dto/create-xray.dto';

@Injectable()
export default class CreateXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async execute(createXrayDto : CreateXrayDto): Promise<string | null> {
    const result = await this.xrayRepository.insert(createXrayDto);
    return result;
  }
}
