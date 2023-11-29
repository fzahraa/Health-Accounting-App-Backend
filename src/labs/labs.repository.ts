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

  async insertLabs(createLabsDto: CreateLabsDto): Promise<string | null> {
    const { name, price, code } = createLabsDto;
    const sql = 'INSERT INTO labs_det ( name, price, code) VALUES ($1, $2, $3)';
    const params = [name, price, code];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Insert successful!';
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

  async updateLabs(id: number, updateLabsDto: UpdateLabsDto): Promise<string | null> {
    const { name, price, code } = updateLabsDto;
    const sql = 'UPDATE labs_det SET name = $1, price = $2, code = $3 where id = $4';
    const params = [name, price, code, id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteLabs(id : number): Promise<string | null> {
    const sql = 'DELETE FROM labs_det WHERE id = $1';
    const params = [id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}