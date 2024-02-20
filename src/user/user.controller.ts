import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import CreateUserUseCase from './usecases/create-user.usecase';
import GetUserUseCase from './usecases/get-user.usecase';

@Controller('user')
export class UserController {
  constructor(private userRepository: UserRepository, private createUserUseCase: CreateUserUseCase,
    private getUserUseCase: GetUserUseCase) {}

  //get all users
  @Get()
  getUsers() {
    return this.userRepository.get();
  }

  //sign up
  @Post('/signUp')
  async store(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (
      createUserDto.email != null &&
      createUserDto.password != null &&
      createUserDto.name != null
    ) {
      if (createUserDto.password == createUserDto.confirmPassword) {
        await this.getUserUseCase.getUserbyEmail(createUserDto.email).then(async(data) => {
          if (data) {
            res.status(HttpStatus.FORBIDDEN).send({
              message: 'Email Already Exists.',
            });
            return res;
          } else {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
            createUserDto.password = hash;
            this.createUserUseCase.execute(createUserDto).then((obj) => {
              res.status(HttpStatus.OK).send({
                message: 'User Successfully Added.',
              });
            });
          }
        });
      } else if (createUserDto.password != createUserDto.confirmPassword) {
        res.status(HttpStatus.FORBIDDEN).send({
          message: 'Password Not Matched.',
        });
      } else {
        res.status(HttpStatus.BAD_REQUEST).send({
          message:
            'There is an Error while creating this user. Please Try Again.',
        });
      }
    }
    return res;
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req: any) {
    return this.userRepository.login(req.user);
  }

  //get a specific user
  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.getUserUseCase.getUserbyID(userId);
  }

  //delete a user
  @Delete('/:userId')
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userRepository.delete(userId);
  }
}
