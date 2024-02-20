import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';
import { CreateXrayDto } from '../dto/create-xray.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async createXray(createXrayDto: CreateXrayDto[]): Promise<string | null> {
    try {
        const result = await this.xrayRepository.insertXrays(createXrayDto);
        return result;
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Xray:', error);
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
