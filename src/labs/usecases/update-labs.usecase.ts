import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';
import { UpdateLabsDto } from '../dto/update-labs.dto';

@Injectable()
export default class UpdateLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async updateLabs(id: number, category_id:number, updateLabsDto : UpdateLabsDto): Promise<string | null> {
    try{
    const result = await this.labsRepository.updateLabs(id, category_id, updateLabsDto);
    return result;
  } catch (error) {

    const appException = new AppException(
      'Internal server error',
      'An unexpected error occurred',
      HttpStatus.INTERNAL_SERVER_ERROR,
      true,
    );

    // Throw the custom exception
    throw appException;
  
  
  }
  }
}
