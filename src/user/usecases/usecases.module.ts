// usecases.module.ts
import { Module } from '@nestjs/common';
import { UserRepository } from '../user.repository';
import CreateUserUseCase from './create-user.usecase';
import { JwtModule } from '@nestjs/jwt';
import GetUserUseCase from './get-user.usecase';

@Module({
  imports: [
    // Import JwtModule and configure it as needed
    JwtModule.register({
      secret: 'your-secret-key', // replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UserRepository, CreateUserUseCase, GetUserUseCase],
  exports: [CreateUserUseCase, GetUserUseCase],
})
export class UsecasesModule {}