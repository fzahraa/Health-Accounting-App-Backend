import {IsString} from 'class-validator';

export class UpdateXrayDto {
    @IsString()
    name: string;
  
    @IsString()
    price: number;
  
    @IsString()
    code: string;
}