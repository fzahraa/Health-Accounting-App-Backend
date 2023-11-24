import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';

@Injectable()
export default class DeleteXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async execute(id: number): Promise<string | null> {
    const result = await this.xrayRepository.delete(id);

    return result;
  }
}
