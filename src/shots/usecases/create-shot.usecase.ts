import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { ShotRepository } from '../shot.repository';
import { CreateShotDto } from '../dto/create-shot.dto';

@Injectable()
export default class CreateShotUseCase {
  constructor(private shotRepository: ShotRepository) {}

  async execute(createShotDto : CreateShotDto): Promise<string | null> {
    try{
      const result = await this.shotRepository.insert(createShotDto);
      return result;
    }catch (error) {
      // Handle the exception
      if (error instanceof AppException) {
        console.error('Internal Error:', error.internalMessage);
      }
      if (error.isOperational) {
        console.error('Operational Error:', error.externalMessage);
      } else {
        console.error('Non-Operational Error:', error.externalMessage);
      }
      throw error;
    }
  }
}
