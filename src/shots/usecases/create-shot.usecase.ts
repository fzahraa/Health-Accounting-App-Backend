import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';
import { CreateShotDto } from '../dto/create-shot.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async createShot(createShotDto : CreateShotDto[]): Promise<string | null> {
    try {
        const result = await this.shotRepository.insertShot(createShotDto);
        return result;
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Shot:', error);
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
