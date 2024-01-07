import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/common/exception/app.exception';
import { UserRepository } from '../user.repository';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export default class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(createUserDto : CreateUserDto): Promise<string | null> {
    const result = await this.userRepository.insert(createUserDto);
    return result;
  }
}
