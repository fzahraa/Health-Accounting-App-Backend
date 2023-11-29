import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateTestsDto } from './dto/create-tests.dto';
import { UpdateTestsDto } from './dto/update-tests.dto';
import { ReadTestsDto } from './dto/read-tests.dto';

@Injectable()
export class TestsRepository {
  constructor(private Db: DbService) {}

  async getTests(): Promise<ReadTestsDto[]> {
    try{
    const sql = 'SELECT * FROM tstg_det';
    const result = await this.Db.queryToModel(ReadTestsDto, sql);
    return result;
  }catch(error){
    throw error;
  }
  }

  async getTestByID(id:number): Promise<ReadTestsDto[]> {
    try{
    const sql = 'SELECT * FROM tstg_det where id = $1';
    const params = [id]
    const result = await this.Db.queryToModel(ReadTestsDto, sql, params);
    return result;
  }catch(error){
    throw error;
  }
  }

  async insertTest(createTestsDto: CreateTestsDto): Promise<string | null> {
    const { name, price, code } = createTestsDto;
    const sql = 'INSERT INTO tstg_det ( name, price, code) VALUES ($1, $2, $3)';
    const params = [name, price, code];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Insert successful!';
    } catch (error) {
      throw error;
    }
  }

  async findExistingTestCode(code : string): Promise<boolean> {
    try{
    const sql = 'SELECT * FROM tstg_det where code = $1';
    const params = [code];
    const result = await this.Db.queryToModel(ReadTestsDto, sql, params);
    return result.length > 0 ? true : false;
    }catch(error){
      throw error;
    }
  }

  async updateTest(id: number, updateTestsDto: UpdateTestsDto): Promise<string | null> {
    const { name, price, code } = updateTestsDto;
    const sql = 'UPDATE tstg_det SET name = $1, price = $2, code = $3 where id = $4';
    const params = [name, price, code, id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteTest(id : number): Promise<string | null> {
    const sql = 'DELETE FROM tstg_det WHERE id = $1';
    const params = [id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}