import { Module } from '@nestjs/common';
import { ProcedureRepository } from '../procedure.repository';
import GetProcedureUseCase from './get-procedure.usecase';
import UpdateProcedureUseCase from './update-procedure.usecase';
import CreateProcedureUseCase from './create-procedure.usecase';
import DeleteProcedureUseCase from './delete-procedure.usecase';

@Module({
  imports: [],
  providers: [ProcedureRepository, GetProcedureUseCase, CreateProcedureUseCase, DeleteProcedureUseCase, UpdateProcedureUseCase],
  exports: [GetProcedureUseCase, CreateProcedureUseCase, DeleteProcedureUseCase, UpdateProcedureUseCase],
})
export class UsecasesModule {}
