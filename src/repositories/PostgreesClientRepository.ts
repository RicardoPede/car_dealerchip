import { IClientRepository } from './IClientRepository';
import { IClient } from '../models/IClient';
import { Pool } from 'pg';

export class PostgresClientRepository implements IClientRepository {
    private pool: Pool;

    constructor (pool: Pool) {
        this.pool = pool;
    }

  async create(client: IClient): Promise<IClient> {
    const result = await this.pool.query(
      'INSERT INTO clients (id, nombre, email, teléfono) VALUES ($1, $2, $3, $4) RETURNING *',
      [client.id, client.nombre, client.email, client.teléfono]
    );
    return result.rows[0];
  }

  async findAll(): Promise<IClient[]> {
    const result = await this.pool.query('SELECT * FROM clients');
    return result.rows;
  }

  async find(id: string): Promise<IClient | null> {
    const result = await this.pool.query('SELECT * FROM clients WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async update(id: string, client: IClient): Promise<IClient | null> {
    const result = await this.pool.query(
      'UPDATE clients SET nombre = $1, email = $2, teléfono = $3 WHERE id = $4 RETURNING *',
      [client.nombre, client.email, client.teléfono, id]
    );
    return result.rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await this.pool.query('DELETE FROM clients WHERE id = $1', [id]);
  }
}