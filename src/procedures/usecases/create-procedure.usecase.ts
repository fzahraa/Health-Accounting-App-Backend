import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { CreateProcedureDto } from '../dto/create-procedure.dto';
import { ProcedureRepository } from '../procedure.repository';
import { exceptions } from 'winston';

@Injectable()
export default class CreateProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async createProcedure(createProceduretDto : CreateProcedureDto[]): Promise<string | null> {
    try{
        const result = await this.procedureRepository.insertProcedure(createProceduretDto);
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
