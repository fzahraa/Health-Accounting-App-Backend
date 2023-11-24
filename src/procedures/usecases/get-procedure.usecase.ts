import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ProcedureRepository } from '../procedure.repository';

@Injectable()
export default class GetProcedureUseCase {
  constructor(private procedureRepository: ProcedureRepository) {}

  async execute(): Promise<string | null> {
    const result = await this.procedureRepository.get();

    return result;
  }
}
