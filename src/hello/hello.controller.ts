import { Controller, Get } from '@nestjs/common';
import GetHelloUseCase from './usecases/get-hello.usecase';

@Controller()
export class HelloController {
  constructor(private getHelloUseCase: GetHelloUseCase) {}

  @Get()
  async get(): Promise<string> {
    return this.getHelloUseCase.execute();
  }
}
