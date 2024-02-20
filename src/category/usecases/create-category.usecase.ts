import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { CategoryRepository } from '../category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { exceptions } from 'winston';

@Injectable()
export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<string | null> {
    let codeExistsException = false;
    try {
      const codeExists = await this.categoryRepository.getCategoryByName(createCategoryDto.name);
      if(codeExists.length > 0){
        codeExistsException = true;
        throw exceptions;
      }
      else{
        const result = await this.categoryRepository.insertCategory(createCategoryDto);
        return result;
      }
    } catch (error) {
      // Log the error or handle it as needed
      console.error('Error creating Category:', error);

      // We can use AppException here to create a custom exception
      if(codeExistsException){
        const appException = new AppException(
          'Bad Request',
          'Code Already Exists',
          HttpStatus.BAD_REQUEST,
          true,
        );
        // Throw the custom exception
        throw appException;
      }
      else{
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
}
