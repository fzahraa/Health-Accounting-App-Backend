import { Module } from '@nestjs/common';
import { XrayRepository } from '../xray.repository';
import GetXrayUseCase from './get-xray.usecase';
import CreateXrayUseCase from './create-xray.usecase';
import DeleteXrayUseCase from './delete-xray.usecase';
import UpdateXrayUseCase from './update-xray.usecase';

@Module({
  imports: [],
  providers: [XrayRepository, GetXrayUseCase, CreateXrayUseCase, DeleteXrayUseCase, UpdateXrayUseCase],
  exports: [GetXrayUseCase, CreateXrayUseCase, DeleteXrayUseCase, UpdateXrayUseCase],
})
export class UsecasesModule {}
