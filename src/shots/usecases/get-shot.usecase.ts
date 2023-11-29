import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';
import { ReadShotDto } from '../dto/read-shot.dto';

@Injectable()
export default class GetShotUseCase {
  constructor(private shotRepository: ShotRepository) {}
//business logic must be here
  async getShots(): Promise<ReadShotDto[]> {
    try{
    const result = await this.shotRepository.getShots();
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
