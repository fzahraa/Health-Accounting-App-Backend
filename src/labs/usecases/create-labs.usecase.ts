import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';
import { CreateLabsDto } from '../dto/create-labs.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}


  async createLabs(createLabsDto : CreateLabsDto): Promise<string | null> {
    let codeExistsException = false;
    try {
      const codeExists = await this.labsRepository.findExistingLabsCode(createLabsDto.code);
      if(codeExists){
        codeExistsException = true;
        throw exceptions;
      }
      else{
        const result = await this.labsRepository.insertLabs(createLabsDto);
        return result;
      }
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Test:', error);

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
