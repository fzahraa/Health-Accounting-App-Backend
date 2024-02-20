import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateProcedureDto } from './dto/create-procedure.dto';
import { UpdateProcedureDto } from './dto/update-procedure.dto';
import { ReadProcedureDto } from './dto/read-procedures.dto';

@Injectable()
export class ProcedureRepository {
  constructor(private Db: DbService) {}

  async getProcedures(): Promise<ReadProcedureDto[]> {
    try{
    const sql = 'SELECT * FROM proc_det';
    const result = await this.Db.queryToModel(ReadProcedureDto, sql);
    return result;
  } catch (error) {
    throw error;
  }
  }
  
  async getProcedureByID(id : number): Promise<ReadProcedureDto[]> {
    try{
    const sql = 'SELECT * FROM proc_det where id = $1';
    const params = [id];
    const result = await this.Db.queryToModel(ReadProcedureDto, sql, params);
    return result;
  } catch (error) {
    throw error;
  }
  }
  async getProceduresByCategoryID(category_id : number): Promise<ReadProcedureDto[]> {
    try{
    const sql = 'SELECT * FROM proc_det where category_id = $1';
    const params = [category_id];
    const result = await this.Db.queryToModel(ReadProcedureDto, sql, params);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async insertProcedure(createProcedureDto: CreateProcedureDto[]): Promise<string | null> {
    try {
      if (createProcedureDto.length === 0) {
        return null; // Nothing to insert
      }
        const valuesPlaceholder = createProcedureDto.map(
        (_, index) => `($${index * 4 + 1}, $${index * 4 + 2}, $${index * 4 + 3}, $${index * 4 + 4})`
      ).join(', ');
  
      const sql = `
        INSERT INTO proc_det (name, price, code, category_id)
        VALUES ${valuesPlaceholder}
      `;
  
      const params = createProcedureDto.flatMap(
        ({ name, price, code, category_id }) => [name, price, code, category_id]
      );
  
      await this.Db.executeNonQuery(sql, params);
  
      return 'Insert Successful';
    } catch (error) {
      throw error;
    }

  }

  async updateProcedure(id: number, category_id:number, updateProcedureDto: UpdateProcedureDto): Promise<string | null> {
    const { name, price, code } = updateProcedureDto[0];
    const sql = 'UPDATE proc_det SET name = $1, price = $2, code = $3 where id = $4 and category_id = $5';
    const params = [name, price, code, id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async findExistingProcedureCode(code : string): Promise<boolean> {
    try{
    const sql = 'SELECT * FROM proc_det where code = $1';
    const params = [code];
    const result = await this.Db.queryToModel(ReadProcedureDto, sql, params);
    return result.length > 0 ? true : false;
  } catch (error) {
    throw error;
  }
  }

  async deleteProcedure(id : number, category_id: number): Promise<string | null> {
    const sql = 'DELETE FROM proc_det WHERE id = $1 and category_id = $2';
    const params = [id, category_id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}