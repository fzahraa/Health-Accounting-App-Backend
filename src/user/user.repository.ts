import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DbService } from 'src/common/config/database/db.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { RowDataPacket } from 'mysql2';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { createECDH } from 'crypto';

@Injectable()
export class UserRepository {
  constructor(private Db: DbService, private jwtService: JwtService,) {}
  
  async get(): Promise<string> {
    const sql = 'SELECT * FROM user_det';
    const result = await this.Db.executeNonQuery(sql);
    console.log(result);
    // Assuming we want to return the result as a JSON string
    const jsonString = JSON.stringify(result);
    return jsonString;
  }

  async getByEmail(email: string): Promise<CreateUserDto[]> {
    const sql = 'SELECT * FROM user_det where email = $1';
    const params = [email];
    const result = await this.Db.queryToModel(CreateUserDto, sql, params);
    return result;
  }

  async getById(id: number): Promise<string> {
    const sql = 'SELECT * FROM user_det where id = $1';
    const params = [id];
    const result = await this.Db.executeNonQuery(sql, params);
    console.log(result);
    // Assuming we want to return the result as a JSON string
    const jsonString = JSON.stringify(result);
    return jsonString;
  }


  async insert(createUserDto: CreateUserDto): Promise<string | null> {
    const { name, email, password} = createUserDto;
    const sql = 'INSERT INTO user_det (name, email, password) VALUES ($1, $2, $3)';
    const params = [name, email, password];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Insert successful!';
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<string | null> {
    const { password, confirmPassword } = updateUserDto;
    const sql = 'UPDATE user_det SET password = $1, confirmPassword = $2 where id = $4';
    const params = [password, confirmPassword];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async delete(id : number): Promise<string | null> {
    const sql = 'DELETE FROM user_det WHERE id = $1';
    const params = [id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}