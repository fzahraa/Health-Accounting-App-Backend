import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateLabsDto } from './dto/create-labs.dto';
import { UpdateLabsDto } from './dto/update-labs.dto';
import { ReadLabsDto } from './dto/read-labs.dto';

@Injectable()
export class LabsRepository {
  constructor(private Db: DbService) {}

  async getLabs(): Promise<ReadLabsDto[]> {
    const sql = 'SELECT * FROM labs_det';
    try{
      const result = await this.Db.queryToModel(ReadLabsDto, sql);
      return result;
    }catch(error){
      throw error
    }
  }

  async getLabsByCategoryID(category_id : number): Promise<ReadLabsDto[]> {
    try{
    const sql = 'SELECT * FROM labs_det where category_id = $1';
    const params = [category_id];
    const result = await this.Db.queryToModel(ReadLabsDto, sql, params);
    return result;
    }catch(error){
      throw error
    }
  }

  async getLabsByID(id : number): Promise<ReadLabsDto[]> {
    try{
    const sql = 'SELECT * FROM labs_det where id = $1';
    const params = [id];
    const result = await this.Db.queryToModel(ReadLabsDto, sql, params);
    return result;
    }catch(error){
      throw error
    }
  }

  async insertLabs(createLabsDto: CreateLabsDto[]): Promise<string | null> {
    try {
      if (createLabsDto.length === 0) {
        return null; // Nothing to insert
      }
        const valuesPlaceholder = createLabsDto.map(
        (_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
      ).join(', ');
  
      const sql = `
        INSERT INTO labs_det (name, price, code, category_id)
        VALUES ${valuesPlaceholder}
      `;
  
      const params = createLabsDto.flatMap(
        ({ name, price, code, category_id }) => [name, price, code, category_id]
      );
  
      await this.Db.executeNonQuery(sql, params);
  
      return 'Insert Successful';
    } catch (error) {
      throw error;
    }
  }

  async findExistingLabsCode(code : string): Promise<boolean> {
    try{
    const sql = 'SELECT * FROM labs_det where code = $1';
    const params = [code];
    const result = await this.Db.queryToModel(ReadLabsDto, sql, params);
    return result.length > 0 ? true : false;
    }
    catch(error){
      throw error
    }
  }

  async updateLabs(id: number, category_id:number, updateLabsDto: UpdateLabsDto): Promise<string | null> {
    const { name, price, code } = updateLabsDto[0];
    const sql = 'UPDATE labs_det SET name = $1, price = $2, code = $3 where id = $4 and category_id = $5';
    const params = [name, price, code, id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteLabs(id : number, category_id:number): Promise<string | null> {
    const sql = 'DELETE FROM labs_det WHERE id = $1 and category_id = $2';
    const params = [id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}