import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { XrayRepository } from '../xray.repository';
import { CreateXrayDto } from '../dto/create-xray.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateXrayUseCase {
  constructor(private xrayRepository: XrayRepository) {}

  async createXray(createXrayDto: CreateXrayDto): Promise<string | null> {
    let codeExistsException = false;
    try {
      const codeExists = await this.xrayRepository.findExistingXrayCode(createXrayDto.code);
      if(codeExists){
        codeExistsException = true;
        throw exceptions;
      }
      else{
        const result = await this.xrayRepository.insertXray(createXrayDto);
        return result;
      }
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Xray:', error);

      // We can use AppException here to create a custom exception
      if(codeExistsException){
        const appException = new AppException(
          'Bad Request',
          'Code Already Exists',
          HttpStatus.BAD_REQUEST,
          true,
        );
        // Throw the custom exception
        throw appException;
      }
      else{
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
}
