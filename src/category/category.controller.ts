import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import GetCategoryUseCase from './usecases/get-category.usecase';
  import CreateCategoryUseCase from './usecases/create-category.usecase';
  import UpdateCategoryUseCase from './usecases/update-category.usecase';
  import DeleteCategoryyUseCase from './usecases/delete-category.usecase';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReadCategoryDto } from './dto/read-category.dto';
  
  @Controller('category')
  export class CategoryController {
    constructor(private getCategoryUseCase: GetCategoryUseCase, private createCategoryUseCase: CreateCategoryUseCase,
      private updateCategoryUseCase: UpdateCategoryUseCase, private deleteCategoryUseCase: DeleteCategoryyUseCase){}

    @Get()
    async get(): Promise<ReadCategoryDto[]> {
      return this.getCategoryUseCase.getCategorys();
    }

    @Get(':id')
    async getByID(@Param('id') id: number): Promise<ReadCategoryDto[]> {
      return this.getCategoryUseCase.getCategoryByID(id);
    }

    @Post()
    async addCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<string | null>{
      try {
        var data = await this.createCategoryUseCase.createCategory(createCategoryDto);
        return "1";
      } catch (error) {
        return error;
      }
    }
    @Put(':id')
    async put(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto): Promise<string>{
      try {
        return await this.updateCategoryUseCase.updateCategorys(id, updateCategoryDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id')
    async deete(@Param('id') id: number): Promise<string>{
      try {
        return await this.deleteCategoryUseCase.deleteCategory(id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }

  }
  