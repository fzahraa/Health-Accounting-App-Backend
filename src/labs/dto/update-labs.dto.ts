import { IsDate, IsEmail, IsNumber, IsString, isDate, isNumber } from 'class-validator';

export class UpdateLabsDto {
    @IsString()
    name: string;
  
    @IsString()
    price: number;
  
    @IsString()
    code: string;
}