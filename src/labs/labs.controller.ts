import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import GetLabsUseCase from './usecases/get-labs.usecase';
  import CreateLabsUseCase from './usecases/create-labs.usecase';
  import UpdateLabsUseCase from './usecases/update-labs.usecase';
  import DeleteLabsUseCase from './usecases/delete-labs.usecase';
  import { CreateLabsDto } from './dto/create-labs.dto';
  import { UpdateLabsDto } from './dto/update-labs.dto';
  import { ReadLabsDto } from './dto/read-labs.dto';
  
  @Controller('labs')
  export class LabsController {
    constructor(private getLabsUseCase: GetLabsUseCase, private createLabsUseCase: CreateLabsUseCase,
      private updateLabsUseCase: UpdateLabsUseCase, private deleteLabsUseCase: DeleteLabsUseCase){}

    @Get()
    async get(): Promise<ReadLabsDto[]> {
      return this.getLabsUseCase.getLabs();
    }

    @Get('getByCategoryID/:category_id')
    async getByCategoryID(@Param('category_id') category_id: number): Promise<ReadLabsDto[]> {
      return this.getLabsUseCase.getLabsByCategoryID(category_id);
    }

    @Post()
    async post(@Body() createLabsDto: CreateLabsDto[]): Promise<string>{
      try {
        return await this.createLabsUseCase.createLabs(createLabsDto);
      } catch (error) {
        return error;
      }
    }
    @Put(':id/:category_id')
    async put(@Param('id') id: number, @Param('category_id') category_id: number, @Body() updateLabsDto: UpdateLabsDto): Promise<string>{
      try {
        return await this.updateLabsUseCase.updateLabs(id, category_id, updateLabsDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id/:category_id')
    async deete(@Param('id') id: number, @Param('category_id') category_id: number): Promise<string>{
      try {
        return await this.deleteLabsUseCase.deleteLabs(id, category_id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }
  }
  