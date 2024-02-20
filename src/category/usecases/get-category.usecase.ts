import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { CategoryRepository } from '../category.repository';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ReadCategoryDto } from '../dto/read-category.dto';

@Injectable()
export default class GetCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategorys(): Promise<ReadCategoryDto[]> {
    try {
      const result = await this.categoryRepository.getCategories();
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

  async getAllCategoriesAndCharges(): Promise<ReadCategoryDto[]> {
    try {
      const result = await this.categoryRepository.getCategories();
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

  async getCategoryByID(id : number): Promise<ReadCategoryDto[]> {
    try {
      const result = await this.categoryRepository.getCategoryByID(id);
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
