import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';

@Injectable()
export default class DeleteLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async deleteLabs(id: number, category_id:number): Promise<string | null> {
    try{
    const result = await this.labsRepository.deleteLabs(id, category_id);

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
