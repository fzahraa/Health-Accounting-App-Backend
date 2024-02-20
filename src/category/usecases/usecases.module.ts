import { Module } from '@nestjs/common';
import { CategoryRepository } from '../category.repository';
import GetCategoryUseCase from './get-category.usecase';
import CreateCategoryUseCase from './create-category.usecase';
import DeleteCategoryUseCase from './delete-category.usecase';
import UpdateCategoryUseCase from './update-category.usecase';

@Module({
  imports: [],
  providers: [CategoryRepository, GetCategoryUseCase, CreateCategoryUseCase, DeleteCategoryUseCase, UpdateCategoryUseCase],
  exports: [GetCategoryUseCase, CreateCategoryUseCase, DeleteCategoryUseCase, UpdateCategoryUseCase],
})
export class UsecasesModule {}
