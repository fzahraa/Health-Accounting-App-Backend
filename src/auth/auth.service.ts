import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    const plainObject = JSON.parse(JSON.stringify(user[0]));
    const match = await bcrypt.compare(password, plainObject.password);
    if (match) {
      return user;
    }

    return null;
  }
  

}