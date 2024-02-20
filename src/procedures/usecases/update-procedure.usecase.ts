import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ProcedureRepository } from '../procedure.repository';
import { UpdateProcedureDto } from '../dto/update-procedure.dto';

@Injectable()
export default class UpdateProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async updateProcedure(id: number, category_id:number, updateProcedureDto : UpdateProcedureDto): Promise<string | null> {
    try{
    const result = await this.procedureRepository.updateProcedure(id, category_id, updateProcedureDto);
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
