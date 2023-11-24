import { Module } from '@nestjs/common';
import { UsecasesModule } from './usecases/usecases.module';
import { HelloController } from './hello.controller';

@Module({
  imports: [UsecasesModule],
  controllers: [HelloController],
})
export class HelloModule {}
