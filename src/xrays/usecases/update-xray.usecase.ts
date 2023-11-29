import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';
import { UpdateXrayDto } from '../dto/update-xray.dto';

@Injectable()
export default class UpdateXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async updateXrays(id: number, updateXrayDto : UpdateXrayDto): Promise<string | null> {
    try {
      const result = await this.xrayRepository.updateXray(id, updateXrayDto);
      return result;
    } catch (error) {

    const appException = new AppException(
      'Internal server error',
      'An unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
      true,
    );

    // Throw the custom exception
    throw appException;
  }
  }
}
