import { Module } from '@nestjs/common';
import { HelloRepository } from '../hello.repository';
import GetHelloUseCase from './get-hello.usecase';

@Module({
  imports: [],
  providers: [HelloRepository, GetHelloUseCase],
  exports: [GetHelloUseCase],
})
export class UsecasesModule {}
