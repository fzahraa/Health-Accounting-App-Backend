import { Injectable } from '@nestjs/common';
import { XurpayDbService } from 'src/common/config/database/xurpay-db.service';
import { CreateLabsDto } from './dto/create-labs.dto';
import { UpdateLabsDto } from './dto/update-labs.dto';

@Injectable()
export class LabsRepository {
  constructor(private Db: XurpayDbService) {}

  async get(): Promise<string> {
    const sql = 'SELECT * FROM labs_det';
    const result = await this.Db.query(sql);
    console.log(result);
    // Assuming we want to return the result as a JSON string
    const jsonString = JSON.stringify(result);
    return jsonString;
  }

  async insert(createLabsDto: CreateLabsDto): Promise<string | null> {
    const { name, price, code } = createLabsDto;
    const sql = 'INSERT INTO labs_det ( name, price, code) VALUES ($1, $2, $3)';
    const params = [name, price, code];

    try {
      await this.Db.query(sql, params);
      return 'Insert successful!';
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateLabsDto: UpdateLabsDto): Promise<string | null> {
    const { name, price, code } = updateLabsDto;
    const sql = 'UPDATE labs_det SET name = $1, price = $2, code = $3 where id = $4';
    const params = [name, price, code, id];

    try {
      await this.Db.query(sql, params);
      return 'Update successful!';
    } catch (error) {
      throw error;
    }
  }

  async delete(id : number): Promise<string | null> {
    const sql = 'DELETE FROM labs_det WHERE id = $1';
    const params = [id];

    try {
      await this.Db.query(sql, params);
      return 'Delete successful!';
    } catch (error) {
      throw error;
    }
  }
}