import { IVehicleRepository } from './IVehicleRepository';
import { IVehicle, Vehicle } from '../models/IVehicle';

export class VehicleRepository implements IVehicleRepository {
    async create(vehicle: IVehicle): Promise<IVehicle> {
        return await Vehicle.create(vehicle);
    }
    async findAll(): Promise<IVehicle[]> {
        return await Vehicle.find().sort({precio: 1});
    }
    async find(id: string): Promise<IVehicle | null> {
        return await Vehicle.findById(id);
    }
    async update(id: string, vehicle: IVehicle): Promise<IVehicle | null> {
        return await Vehicle.findByIdAndUpdate(id, vehicle, { new: true });
    }
    async delete(id: string): Promise<void> {
        await Vehicle.findByIdAndDelete(id);
      }
}
