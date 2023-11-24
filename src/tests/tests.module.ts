import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { TestsController } from './tests.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [TestsController],
})
export class TestsModule {}

