import { IVehicleRepository } from './IVehicleRepository';
import { IVehicle } from '../models/IVehicle';
import { Pool } from 'pg';

export class PostgresVehicleRepository implements IVehicleRepository {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async create(vehicle: IVehicle): Promise<IVehicle> {
        const result = await this.pool.query(
            'INSERT INTO vehicles (id, marca, modelo, año, precio) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [vehicle.id, vehicle.marca, vehicle.modelo, vehicle.año, vehicle.precio]
        );
        return result.rows[0];
    }

    async findAll(): Promise<IVehicle[]> {
        const result = await this.pool.query('SELECT * FROM vehicles');
        return result
            .rows
            .map((vehicle: any) => ({
                id: vehicle.id,
                marca: vehicle.marca,
                modelo: vehicle.modelo,
                año: vehicle.año,
                precio: vehicle.precio,
            }));
    }
    
    async find(id: string): Promise<IVehicle | null> {
        const result = await this.pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
        return result.rows[0] || null;
    }

    async update(id: string, vehicle: IVehicle): Promise<IVehicle | null> {
        const result = await this.pool.query(
            'UPDATE vehicles SET marca = $1, modelo = $2, año = $3, precio = $4 WHERE id = $5 RETURNING *',
            [vehicle.marca, vehicle.modelo, vehicle.año, vehicle.precio, id]
        );
        return result.rows[0] || null;
    }

    async delete(id: string): Promise<void> {
        await this.pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
    }
}