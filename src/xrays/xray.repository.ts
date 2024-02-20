import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
import { ReadXrayDto } from './dto/read-xray.dto';

@Injectable()
export class XrayRepository {
  constructor(private Db: DbService) {}

  async getXrayByCategoryID(category_id : number): Promise<ReadXrayDto[]> {
    try{
    const sql = 'SELECT * FROM xray_det where category_id = $1';
    const params = [category_id];
    const result = await this.Db.queryToModel(ReadXrayDto, sql, params);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async getXrayByID(id : number): Promise<ReadXrayDto[]> {
    try{
    const sql = 'SELECT * FROM xray_det where id = $1';
    const params = [id];
    const result = await this.Db.queryToModel(ReadXrayDto, sql, params);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async getXrays(): Promise<ReadXrayDto[]> {
    try{
    const sql = 'SELECT * FROM xray_det';
    const result = await this.Db.queryToModel(ReadXrayDto, sql);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async findExistingXrayCode(code : string, category_id: number): Promise<boolean> {
    try{
    const sql = 'SELECT * FROM xray_det where code = $1 and category_id = $2';
    const params = [code, category_id];
    const result = await this.Db.queryToModel(ReadXrayDto, sql, params);
    return result.length > 0 ? true : false;
  } catch (error) {
    throw error;
  }
  }

  async insertXrays(createXrayDtos: CreateXrayDto[]): Promise<string | null> {
    try {
      if (createXrayDtos.length === 0) {
        return null; // Nothing to insert
      }
        const valuesPlaceholder = createXrayDtos.map(
        (_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
      ).join(', ');
  
      const sql = `
        INSERT INTO xray_det (name, price, code, category_id)
        VALUES ${valuesPlaceholder}
      `;
  
      const params = createXrayDtos.flatMap(
        ({ name, price, code, category_id }) => [name, price, code, category_id]
      );
  
      await this.Db.executeNonQuery(sql, params);
  
      return 'Insert Successful';
    } catch (error) {
      throw error;
    }
  }
  
  async insertXray(createXrayDto: CreateXrayDto): Promise<string | null> {
    const { name, price, code, category_id } = createXrayDto[0];
    const sql = 'INSERT INTO xray_det ( name, price, code, category_id) VALUES ($1, $2, $3, $4)';
    const params = [name, price, code, category_id];
    try {
      await this.Db.executeNonQuery(sql, params);
      return "Insert Successful";
    } catch (error) {
      throw error;
    }
  }

  async updateXray(id: number, category_id: number, updateXrayDto: UpdateXrayDto): Promise<string | null> {
    const { name, price, code} = updateXrayDto[0];
    const sql = 'UPDATE xray_det SET name = $1, price = $2, code = $3 where id = $4 and category_id = $5';
    const params = [name, price, code, id, category_id];
    
     try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteXray(id : number, category_id:number): Promise<string | null> {
    const sql = 'DELETE FROM xray_det WHERE id = $1 and category_id = $2';
    const params = [id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}