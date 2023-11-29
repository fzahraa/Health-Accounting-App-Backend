import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';
import { CreateXrayDto } from '../dto/create-xray.dto';
import { ReadXrayDto } from '../dto/read-xray.dto';

@Injectable()
export default class GetXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async getXrays(): Promise<ReadXrayDto[]> {
    try {
      const result = await this.xrayRepository.getXrays();
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

  async getXrayByID(id : number): Promise<ReadXrayDto[]> {
    try {
      const result = await this.xrayRepository.getXrayByID(id);
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
