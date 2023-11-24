import { Module } from '@nestjs/common';
import { LabsRepository } from '../labs.repository';
import GetLabsUseCase from './get-labs.usecase';  
import CreateLabsUseCase from './create-labs.usecase';  
import DeleteLabsUseCase from './delete-labs.usecase';
import UpdateLabsUseCase from './update-labs.usecase';

@Module({
  imports: [],
  providers: [LabsRepository, GetLabsUseCase, CreateLabsUseCase, DeleteLabsUseCase, UpdateLabsUseCase],
  exports: [GetLabsUseCase, CreateLabsUseCase, DeleteLabsUseCase, UpdateLabsUseCase],
})
export class UsecasesModule {}
