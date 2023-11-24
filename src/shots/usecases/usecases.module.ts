import { Module } from '@nestjs/common';
import { ShotRepository } from '../shot.repository';
import GetShotUseCase from './get-shot.usecase';
import CreateShotUseCase from './create-shot.usecase';
import DeleteShotUseCase from './delete-shot.usecase';
import UpdateShotUseCase from './update-shot.usecase';

@Module({
  imports: [],
  providers: [ShotRepository, GetShotUseCase, CreateShotUseCase, DeleteShotUseCase, UpdateShotUseCase],
  exports: [GetShotUseCase, CreateShotUseCase, DeleteShotUseCase, UpdateShotUseCase],
})
export class UsecasesModule {}
