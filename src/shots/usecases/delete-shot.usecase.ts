import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';

@Injectable()
export default class DeleteShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async deleteShot(id: number): Promise<string | null> {
    try{
    const result = await this.shotRepository.deleteShot(id);

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
