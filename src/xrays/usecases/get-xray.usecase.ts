import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';

@Injectable()
export default class GetXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async execute(): Promise<string | null> {
    const result = await this.xrayRepository.get();

    return result;
  }
}
