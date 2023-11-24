import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';
import { UpdateXrayDto } from '../dto/update-xray.dto';

@Injectable()
export default class UpdateXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async execute(id: number, updateXrayDto : UpdateXrayDto): Promise<string | null> {
    const result = await this.xrayRepository.update(id, updateXrayDto);
    return result;
  }
}
