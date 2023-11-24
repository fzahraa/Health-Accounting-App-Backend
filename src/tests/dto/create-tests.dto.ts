import { IsEmail, IsNumber, IsString, isString } from 'class-validator';

export class CreateTestsDto {
    @IsString()
    name: string ;
  
    @IsNumber()
    price: number = 0;
  
    @IsString()
    code: string;
}

