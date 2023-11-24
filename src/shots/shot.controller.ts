import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Delete,
    Param,
  } from '@nestjs/common';
  import GetShotUseCase from './usecases/get-shot.usecase';
  import CreateShotUseCase from './usecases/create-shot.usecase';
  import UpdateShotUseCase from './usecases/update-shot.usecase';
  import DeleteShotUseCase from './usecases/delete-shot.usecase';
  import { CreateShotDto } from './dto/create-shot.dto';
  import { UpdateShotDto } from './dto/update-shot.dto';
  
  @Controller('shots')
  export class ShotController {
    constructor(private getShotUseCase: GetShotUseCase, private createShotUseCase: CreateShotUseCase,
      private updateShotUseCase: UpdateShotUseCase, private deleteShotUseCase: DeleteShotUseCase){}

    @Get()
    async get(): Promise<string> {
      return this.getShotUseCase.execute();
    }

    @Post()
    async post(@Body() createShotDto: CreateShotDto): Promise<string>{
      try {
        return await this.createShotUseCase.execute(createShotDto);
      } catch (error) {
        return 'Error during insert:'  +  error;
      }
    }
    @Put(':id')
    async put(@Param('id') id: number, @Body() updateShotDto: UpdateShotDto): Promise<string>{
      console.log(updateShotDto);
      try {
        return await this.updateShotUseCase.execute(id, updateShotDto);
      } catch (error) {
        return 'Error during update:'  +  error;
      }
    }
    @Delete(':id')
    async deete(@Param('id') id: number): Promise<string>{
      try {
        return await this.deleteShotUseCase.execute(id);
      } catch (error) {
        return 'Error during delete:' +  error;
      }
    }
    //constructor(private shotService: ShotService) {}
  
    //get all shots
    // @Get()
    // getShots() {
    //   console.log("hi");
    // }

  // //add shot
  // @Post()
  // async store(@Body() createShotDto: CreateShotDto, @Res() res: Response) {
  //   console.log(createShotDto);
  //   if (
  //       createShotDto.name != null &&
  //       createShotDto.code != null &&
  //       createShotDto.price != null
  //   ) {
  //       await this.shotService.findShotByCode(createShotDto.code).then(async(data) => {
  //         if (data) {
  //           res.status(HttpStatus.FORBIDDEN).send({
  //             message: 'Code against this Shot Already Exists.',
  //           });
  //           return res;
  //         } else {
  //           this.shotService.addShot(createShotDto).then((obj) => {
  //             res.status(HttpStatus.OK).send({
  //               message: 'Shot Successfully Added.',
  //             });
  //           });
  //         }
  //       });

  //   }
  //   return res;
  // }
  }
  