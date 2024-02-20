import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { CategoryRepository } from '../category.repository';

@Injectable()
export default class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async deleteCategory(id: number): Promise<string | null> { 
    try {
      const result = await this.categoryRepository.deleteCategory(id);
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
