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

  async getTestsByCategoryID(category_id:number): Promise<ReadTestsDto[]> {
    try{
    const sql = 'SELECT * FROM tstg_det where category_id = $1';
    const params = [category_id]
    const result = await this.Db.queryToModel(ReadTestsDto, sql, params);
    return result;
  }catch(error){
    throw error;
  }
  }

  async insertTest(createTestsDto: CreateTestsDto[]): Promise<string | null> {
    try {
      if (createTestsDto.length === 0) {
        return null; // Nothing to insert
      }
        const valuesPlaceholder = createTestsDto.map(
        (_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
      ).join(', ');
  
      const sql = `
        INSERT INTO tstg_det (name, price, code, category_id)
        VALUES ${valuesPlaceholder}
      `;
  
      const params = createTestsDto.flatMap(
        ({ name, price, code, category_id }) => [name, price, code, category_id]
      );
  
      await this.Db.executeNonQuery(sql, params);
  
      return 'Insert Successful';
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

  async updateTest(id: number, category_id:number, updateTestsDto: UpdateTestsDto): Promise<string | null> {
    const { name, price, code} = updateTestsDto[0];
    const sql = 'UPDATE tstg_det SET name = $1, price = $2, code = $3 where id = $4 and category_id = $5';
    const params = [name, price, code, id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteTest(id : number, category_id:number): Promise<string | null> {
    const sql = 'DELETE FROM tstg_det WHERE id = $1 and category_id = $2';
    const params = [id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}