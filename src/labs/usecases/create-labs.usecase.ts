import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';
import { CreateLabsDto } from '../dto/create-labs.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}


  async createLabs(createLabsDto : CreateLabsDto[]): Promise<string | null> {
    try {
        const result = await this.labsRepository.insertLabs(createLabsDto);
        return result;
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Test:', error);
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
