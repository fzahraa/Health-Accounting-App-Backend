import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';

@Injectable()
export default class DeleteXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async deleteXray(id: number): Promise<string | null> { 
    try {
      const result = await this.xrayRepository.deleteXray(id);
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
