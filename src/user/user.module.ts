import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UsecasesModule } from './usecases/usecases.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/auth.constant';
import { LocalStrategy } from 'src/auth/local.strategy';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    UsecasesModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [UserRepository],
  controllers: [UserController],
})
export class UserModule {}
