import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { LabsRepository } from '../labs.repository';
import { ReadLabsDto } from '../dto/read-labs.dto';

@Injectable()
export default class GetLabsUseCase {
  constructor(private labsRepository: LabsRepository) {}

  async getLabs(): Promise<ReadLabsDto[]> {
    try{
    const result = await this.labsRepository.getLabs();

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

  async getLabsByCategoryID(category_id:number): Promise<ReadLabsDto[]> {
    try{
    const result = await this.labsRepository.getLabsByCategoryID(category_id);

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
