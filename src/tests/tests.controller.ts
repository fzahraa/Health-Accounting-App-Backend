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
import { ReadTestsDto } from './dto/read-tests.dto';
  
  @Controller('tests')
  export class TestsController {
    constructor(private getTestsUseCase: GetTestsUseCase, private createTestsUseCase: CreateTestsUseCase,
      private updateTestsUseCase: UpdateTeststUseCase, private deleteTestsUseCase: DeleteTestsUseCase){}

    @Get()
    async get(): Promise<ReadTestsDto[]> {
      return this.getTestsUseCase.getTests();
    }

    @Get('getByCategoryID/:category_id')
    async getByCategoryID(@Param('category_id') category_id: number): Promise<ReadTestsDto[]> {
      return this.getTestsUseCase.getTestsByCategoryID(category_id);
    }


    @Post()
    async post(@Body() createTestsDto: CreateTestsDto[]): Promise<string>{
      try {
        return await this.createTestsUseCase.createTest(createTestsDto);
      } catch (error) {
        return error;
      }
    }
    @Put(':id/:category_id')
    async put(@Param('id') id: number,
    @Param('category_id') category_id: number, @Body() updateTestsDto: UpdateTestsDto): Promise<string>{
      try {
        return await this.updateTestsUseCase.updateTest(id, category_id, updateTestsDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id/:category_id')
    async deete(@Param('id') id: number,
    @Param('category_id') category_id: number): Promise<string>{
      try {
        return await this.deleteTestsUseCase.deleteTest(id, category_id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }

  }
  