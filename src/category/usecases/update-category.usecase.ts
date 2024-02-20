import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { CategoryRepository } from '../category.repository';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export default class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async updateCategorys(id: number, updateCategoryDto : UpdateCategoryDto): Promise<string | null> {
    try {
      const result = await this.categoryRepository.updateCategory(id, updateCategoryDto);
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
