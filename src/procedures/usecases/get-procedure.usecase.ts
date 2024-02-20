import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ProcedureRepository } from '../procedure.repository';
import { ReadProcedureDto } from '../dto/read-procedures.dto';

@Injectable()
export default class GetProcedureUseCase {

  constructor(private procedureRepository: ProcedureRepository) {}
  
  async getProceduresByCategoryID(category_id:number): Promise<ReadProcedureDto[]> {
    try{
    const result = await this.procedureRepository.getProceduresByCategoryID(category_id);

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
  async getProcedures(): Promise<ReadProcedureDto[]> {
    try{
    const result = await this.procedureRepository.getProcedures();

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
