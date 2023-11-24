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
  
  @Controller('procedure')
  export class ProcedureController {
    constructor(private getProcedureUseCase: GetProcedureUseCase, private createProcedureUseCase: CreateProcedureUseCase,
      private updateProecdureUseCase: UpdateProcedureUseCase, private deleteProcedureUseCase: DeleteProcedureUseCase){}

    @Get()
    async get(): Promise<string> {
      return this.getProcedureUseCase.execute();
    }

    @Post()
    async post(@Body() createProcedureDto: CreateProcedureDto): Promise<string>{
      try {
        return await this.createProcedureUseCase.execute(createProcedureDto);
      } catch (error) {
        return 'Error during insert:'  +  error;
      }
    }
    @Put(':id')
    async put(@Param('id') id: number, @Body() updateProcedureDto: UpdateProcedureDto): Promise<string>{
      try {
        return await this.updateProecdureUseCase.execute(id, updateProcedureDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id')
    async deete(@Param('id') id: number): Promise<string>{
      try {
        return await this.deleteProcedureUseCase.execute(id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }
   
  }
  