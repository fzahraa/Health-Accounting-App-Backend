import { Injectable } from '@nestjs/common';
import { DbService } from 'src/common/config/database/db.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReadCategoryDto } from './dto/read-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private Db: DbService) {}

  async getCategoryByID(id : number): Promise<ReadCategoryDto[]> {
    try{
    const sql = 'SELECT * FROM category where id = $1';
    const params = [id];
    const result = await this.Db.queryToModel(ReadCategoryDto, sql, params);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async getCategoryByName(name : string): Promise<ReadCategoryDto[]> {
    try{
    const sql = 'SELECT * FROM category where name = $1';
    const params = [name];
    const result = await this.Db.queryToModel(ReadCategoryDto, sql, params);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async getCategories(): Promise<ReadCategoryDto[]> {
    try{
    const sql = 'SELECT * FROM category';
    const result = await this.Db.queryToModel(ReadCategoryDto, sql);
    return result;
  } catch (error) {
    throw error;
  }
  }

  async insertCategory(createCategoryDto: CreateCategoryDto): Promise<string | null> {
    const { name } = createCategoryDto;
    console.log("call ", name)
    const sql = 'INSERT INTO category (name) VALUES ($1)';
    const params = [name];

    try {
      await this.Db.executeNonQuery(sql, params);
      return "Insert Successful";
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto): Promise<string | null> {
    const { name} = updateCategoryDto;
    const sql = 'UPDATE category SET name = $1 where id = $2';
    const params = [name, id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id : number): Promise<string | null> {
    const sql = 'DELETE FROM category WHERE id = $1';
    const params = [id];

    try {
      await this.Db.executeNonQuery(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}