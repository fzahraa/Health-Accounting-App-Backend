import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import GetTestsUseCase from './usecases/get-tests.usecase';
  import CreateTestsUseCase from './usecases/create-tests.usecase';
  import UpdateTeststUseCase from './usecases/update-tests.usecase';
  import DeleteTestsUseCase from './usecases/delete-tests.usecase';
  import { CreateTestsDto } from './dto/create-tests.dto';
  import { UpdateTestsDto } from './dto/update-tests.dto';
  
  @Controller('shots')
  export class TestsController {
    constructor(private getTestsUseCase: GetTestsUseCase, private createTestsUseCase: CreateTestsUseCase,
      private updateTestsUseCase: UpdateTeststUseCase, private deleteTestsUseCase: DeleteTestsUseCase){}

    @Get()
    async get(): Promise<string> {
      return this.getTestsUseCase.execute();
    }

    @Post()
    async post(@Body() createTestsDto: CreateTestsDto): Promise<string>{
      try {
        return await this.createTestsUseCase.execute(createTestsDto);
      } catch (error) {
        return 'Error during insert:'  +  error;
      }
    }
    @Put(':id')
    async put(@Param('id') id: number, @Body() updateTestsDto: UpdateTestsDto): Promise<string>{
      try {
        return await this.updateTestsUseCase.execute(id, updateTestsDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id')
    async deete(@Param('id') id: number): Promise<string>{
      try {
        return await this.deleteTestsUseCase.execute(id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }

  }
  