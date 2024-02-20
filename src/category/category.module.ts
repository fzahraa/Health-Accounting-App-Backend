import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { CategoryController } from './category.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [CategoryController],
})
export class CategoryModule {}

