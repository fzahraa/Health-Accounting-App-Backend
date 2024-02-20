import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';
import { UpdateShotDto } from '../dto/update-shot.dto';

@Injectable()
export default class UpdateShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async updateShot(id: number, category_id: number, updateShotDto : UpdateShotDto): Promise<string | null> {
    try{
    const result = await this.shotRepository.updateShot(id, category_id, updateShotDto);
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
