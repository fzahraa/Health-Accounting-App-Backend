import { IsEmail, IsNumber, IsString, isString } from 'class-validator';

export class CreateProcedureDto {
    @IsString()
    name: string ;
  
    @IsNumber()
    price: number = 0;
  
    @IsString()
    code: string;
    
    @IsNumber()
    category_id: number = 0;
}

