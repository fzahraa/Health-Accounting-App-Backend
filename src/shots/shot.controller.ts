import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import GetShotUseCase from './usecases/get-shot.usecase';
  import CreateShotUseCase from './usecases/create-shot.usecase';
  import UpdateShotUseCase from './usecases/update-shot.usecase';
  import DeleteShotUseCase from './usecases/delete-shot.usecase';
  import { CreateShotDto } from './dto/create-shot.dto';
  import { UpdateShotDto } from './dto/update-shot.dto';
  import { AuthGuard } from '@nestjs/passport';
import { ReadShotDto } from './dto/read-shot.dto';
  
  //@UseGuards(AuthGuard('jwt'))
  @Controller('shots')
  export class ShotController {
    constructor(private getShotUseCase: GetShotUseCase, private createShotUseCase: CreateShotUseCase,
      private updateShotUseCase: UpdateShotUseCase, private deleteShotUseCase: DeleteShotUseCase){}
    
    
    @Get()
    async get(): Promise<ReadShotDto[]> {
      return this.getShotUseCase.getShots();
    }

    @Get('getByCategoryID/:category_id')
    async getByCategoryID(@Param('category_id') category_id: number): Promise<ReadShotDto[]> {
      return this.getShotUseCase.getShotsByCategoryID(category_id);
    }


    @Post()
    async post(@Body() createShotDto: CreateShotDto[]): Promise<string | null>{
      try {
        return await this.createShotUseCase.createShot(createShotDto);
      } catch (error) {
        return error;
      }
    }
    @Put(':id/:category_id')
    async put(@Param('id') id: number, @Param('category_id') category_id: number, @Body() updateShotDto: UpdateShotDto): Promise<string>{
      try {
        return await this.updateShotUseCase.updateShot(id, category_id, updateShotDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id/:category_id')
    async deete(@Param('id') id: number,
    @Param('category_id') category_id: number): Promise<string>{
      try {
        return await this.deleteShotUseCase.deleteShot(id, category_id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }
  }
  