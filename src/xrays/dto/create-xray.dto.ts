import { IsEmail, IsNumber, IsString, isString } from 'class-validator';

export class CreateXrayDto {
    @IsString()
    name: string ;
  
    @IsNumber()
    price: number = 0;
  
    @IsString()
    code: string;
}

