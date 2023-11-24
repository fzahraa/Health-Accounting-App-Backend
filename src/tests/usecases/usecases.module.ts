import { Module } from '@nestjs/common';
import { TestsRepository } from '../tests.repository';
import GetTestsUseCase from './get-tests.usecase';
import CreateTestsUseCase from './create-tests.usecase';
import DeleteTestsUseCase from './delete-tests.usecase';
import UpdateTestsUseCase from './update-tests.usecase';

@Module({
  imports: [],
  providers: [TestsRepository, GetTestsUseCase, CreateTestsUseCase, DeleteTestsUseCase, UpdateTestsUseCase],
  exports: [GetTestsUseCase, CreateTestsUseCase, DeleteTestsUseCase, UpdateTestsUseCase],
})
export class UsecasesModule {}
