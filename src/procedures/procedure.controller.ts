import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import GetProcedureUseCase from './usecases/get-procedure.usecase';
  import UpdateProcedureUseCase from './usecases/update-procedure.usecase';
  import CreateProcedureUseCase from './usecases/create-procedure.usecase';
  import DeleteProcedureUseCase from './usecases/delete-procedure.usecase';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ReadProcedureDto } from './dto/read-procedures.dto';
  
  @Controller('procedure')
  export class ProcedureController {
    constructor(private getProcedureUseCase: GetProcedureUseCase, private createProcedureUseCase: CreateProcedureUseCase,
      private updateProecdureUseCase: UpdateProcedureUseCase, private deleteProcedureUseCase: DeleteProcedureUseCase){}

    @Get()
    async get(): Promise<ReadProcedureDto[]> {
      return this.getProcedureUseCase.getProcedures();
    }

    @Get('getByCategoryID/:category_id')
    async getByCategoryID(@Param('category_id') category_id: number): Promise<ReadProcedureDto[]> {
      return this.getProcedureUseCase.getProceduresByCategoryID(category_id);
    }


    @Post()
    async post(@Body() createProcedureDto: CreateProcedureDto[]): Promise<string>{
      try {
        return await this.createProcedureUseCase.createProcedure(createProcedureDto);
      } catch (error) {
        return error;
      }
    }
    @Put(':id/:category_id')
    async put(@Param('id') id: number, @Param('category_id') category_id: number, @Body() updateProcedureDto: UpdateProcedureDto): Promise<string>{
      try {
        return await this.updateProecdureUseCase.updateProcedure(id, category_id, updateProcedureDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id/:category_id')
    async deete(@Param('id') id: number, @Param('category_id') category_id: number): Promise<string>{
      try {
        return await this.deleteProcedureUseCase.deleteProcedure(id, category_id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }
   
  }
  