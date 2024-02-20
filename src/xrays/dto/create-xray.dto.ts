import { IsNumber, IsString } from 'class-validator';

export class CreateXrayDto {
    @IsString()
    name: string ;
  
    @IsNumber()
    price: number = 0;
  
    @IsString()
    code: string;

    @IsNumber()
    category_id: number = 0;
}

