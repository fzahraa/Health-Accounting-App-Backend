import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateShotDto } from './dto/create-shot.dto';
import { UpdateShotDto } from './dto/update-shot.dto';
import { ReadShotDto } from './dto/read-shot.dto';

@Injectable()
export class ShotRepository {
  constructor(private Db: DbService) {}

  async getShots(): Promise<ReadShotDto[]> {
    try{
    const sql = 'SELECT * FROM shot_det';
    const result = await this.Db.queryToModel(ReadShotDto, sql);
    return result;
  }catch(error){
    throw error
  }
  }
  
  async getShotsByCategoryID(category_id : number): Promise<ReadShotDto[]> {
    try{
    const sql = 'SELECT * FROM shot_det where category_id = $1';
    const params = [category_id];
    const result = await this.Db.queryToModel(ReadShotDto, sql, params);
    return result;
  }catch(error){
    throw error
  }
  }

  async getShotByID(id : number): Promise<ReadShotDto[]> {
    try{
    const sql = 'SELECT * FROM shot_det where id = $1';
    const params = [id];
    const result = await this.Db.queryToModel(ReadShotDto, sql, params);
    return result;
  }catch(error){
    throw error
  }
  }

  async findExistingShotCode(code : string): Promise<boolean> {
    try{
    const sql = 'SELECT * FROM shot_det where code = $1';
    const params = [code];
    const result = await this.Db.queryToModel(ReadShotDto, sql, params);
    return result.length > 0 ? true : false;
    }catch(error){
      throw error
    }
  }

  async insertShot(createShotDto: CreateShotDto[]): Promise<string | null> {
    try {
      if (createShotDto.length === 0) {
        return null; // Nothing to insert
      }
        const valuesPlaceholder = createShotDto.map(
        (_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
      ).join(', ');
  
      const sql = `
        INSERT INTO shot_det (name, price, code, category_id)
        VALUES ${valuesPlaceholder}
      `;
  
      const params = createShotDto.flatMap(
        ({ name, price, code, category_id }) => [name, price, code, category_id]
      );
  
      await this.Db.executeNonQuery(sql, params);
  
      return 'Insert Successful';
    } catch (error) {
      throw error;
    }
  }

  async updateShot(id: number, category_id:number, updateShotDto: UpdateShotDto): Promise<string | null> {
    const { name, price, code } = updateShotDto[0];
    const sql = 'UPDATE shot_det SET name = $1, price = $2, code = $3 where id = $4 and category_id = $5';
    const params = [name, price, code, id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteShot(id : number, category_id:number): Promise<string | null> {
    const sql = 'DELETE FROM shot_det WHERE id = $1 and category_id = $2';
    const params = [id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}