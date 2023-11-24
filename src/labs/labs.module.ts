import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { LabsController } from './labs.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [LabsController],
})
export class LabsModule {}

