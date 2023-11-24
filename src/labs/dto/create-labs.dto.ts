import { IsEmail, IsNumber, IsString, isString } from 'class-validator';

export class CreateLabsDto {
    @IsString()
    name: string ;
  
    @IsNumber()
    price: number = 0;
  
    @IsString()
    code: string;
}

