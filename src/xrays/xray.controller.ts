import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import GetXrayUseCase from './usecases/get-xray.usecase';
  import CreateXrayUseCase from './usecases/create-xray.usecase';
  import UpdateXrayUseCase from './usecases/update-xray.usecase';
  import DeleteXrayUseCase from './usecases/delete-xray.usecase';
  import { CreateXrayDto } from './dto/create-xray.dto';
  import { UpdateXrayDto } from './dto/update-xray.dto';
  
  @Controller('xrays')
  export class XrayController {
    constructor(private getXrayUseCase: GetXrayUseCase, private createXrayUseCase: CreateXrayUseCase,
      private updateXrayUseCase: UpdateXrayUseCase, private deleteXrayUseCase: DeleteXrayUseCase){}

    @Get()
    async get(): Promise<string> {
      return this.getXrayUseCase.execute();
    }

    @Post()
    async post(@Body() createXrayDto: CreateXrayDto): Promise<string>{
      try {
        return await this.createXrayUseCase.execute(createXrayDto);
      } catch (error) {
        return 'Error during insert:'  +  error;
      }
    }
    @Put(':id')
    async put(@Param('id') id: number, @Body() updateXrayDto: UpdateXrayDto): Promise<string>{
      try {
        return await this.updateXrayUseCase.execute(id, updateXrayDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id')
    async deete(@Param('id') id: number): Promise<string>{
      try {
        return await this.deleteXrayUseCase.execute(id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }

  }
  