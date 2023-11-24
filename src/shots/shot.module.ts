import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { ShotController } from './shot.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [ShotController],
})
export class ShotModule {}

