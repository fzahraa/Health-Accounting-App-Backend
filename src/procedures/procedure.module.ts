import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { ProcedureController } from './procedure.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [ProcedureController],
})
export class ProceduresModule {}

