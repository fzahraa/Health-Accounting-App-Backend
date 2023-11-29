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

    @Post()
    async post(@Body() createLabsDto: CreateLabsDto): Promise<string>{
      try {
        return await this.createLabsUseCase.createLabs(createLabsDto);
      } catch (error) {
        return error;
      }
    }
    @Put(':id')
    async put(@Param('id') id: number, @Body() updateLabsDto: UpdateLabsDto): Promise<string>{
      console.log(updateLabsDto);
      try {
        return await this.updateLabsUseCase.updateLabs(id, updateLabsDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id')
    async deete(@Param('id') id: number): Promise<string>{
      try {
        return await this.deleteLabsUseCase.deleteLabs(id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }
  }
  