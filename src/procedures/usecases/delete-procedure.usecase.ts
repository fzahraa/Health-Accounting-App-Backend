import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ProcedureRepository } from '../procedure.repository';

@Injectable()
export default class DeleteProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async execute(id: number): Promise<string | null> {
    const result = await this.procedureRepository.delete(id);

    return result;
  }
}
