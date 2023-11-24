import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { XrayController } from './xray.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [XrayController],
})
export class XrayModule {}

