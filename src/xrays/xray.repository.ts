import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateXrayDto } from './dto/create-xray.dto';
import { UpdateXrayDto } from './dto/update-xray.dto';
import { ReadXrayDto } from './dto/read-xray.dto';

@Injectable()
export class XrayRepository {
  constructor(private Db: DbService) {}

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

  async findExistingXrayCode(code : string): Promise<boolean> {
    try{
    const sql = 'SELECT * FROM xray_det where code = $1';
    const params = [code];
    const result = await this.Db.queryToModel(ReadXrayDto, sql, params);
    return result.length > 0 ? true : false;
  } catch (error) {
    throw error;
  }
  }

  async insertXray(createXrayDto: CreateXrayDto): Promise<string | null> {
    const { name, price, code } = createXrayDto;
    const sql = 'INSERT INTO xray_det ( name, price, code) VALUES ($1, $2, $3)';
    const params = [name, price, code];

    try {
      await this.Db.executeNonQuery(sql, params);
      return "Insert Successful";
    } catch (error) {
      throw error;
    }
  }

  async updateXray(id: number, updateXrayDto: UpdateXrayDto): Promise<string | null> {
    const { name, price, code } = updateXrayDto;
    const sql = 'UPDATE xray_det SET name = $1, price = $2, code = $3 where id = $4';
    const params = [name, price, code, id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteXray(id : number): Promise<string | null> {
    const sql = 'DELETE FROM xray_det WHERE id = $1';
    const params = [id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}