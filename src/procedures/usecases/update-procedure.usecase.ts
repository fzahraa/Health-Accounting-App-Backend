import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ProcedureRepository } from '../procedure.repository';
import { UpdateProcedureDto } from '../dto/update-procedure.dto';

@Injectable()
export default class UpdateProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async execute(id: number, updateProcedureDto : UpdateProcedureDto): Promise<string | null> {
    const result = await this.procedureRepository.update(id, updateProcedureDto);
    return result;
  }
}
