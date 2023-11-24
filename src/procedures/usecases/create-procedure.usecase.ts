import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { CreateProcedureDto } from '../dto/create-procedure.dto';
import { ProcedureRepository } from '../procedure.repository';

@Injectable()
export default class CreateProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async execute(createProcedureDto : CreateProcedureDto): Promise<string | null> {
    const result = await this.procedureRepository.insert(createProcedureDto);
    return result;
  }
}
