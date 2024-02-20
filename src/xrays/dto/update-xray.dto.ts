import {IsNumber, IsString} from 'class-validator';

export class UpdateXrayDto {
    @IsString()
    name: string;
  
    @IsNumber()
    price: number;
  
    @IsString()
    code: string;
}