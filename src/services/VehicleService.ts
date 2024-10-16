import { IVehicle } from '../models/IVehicle';
import { IVehicleRepository } from '../repositories/IVehicleRepository';

export class VehicleService {
    private vehicleRepository: IVehicleRepository
    
    constructor(vehicleRepository: IVehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    async createVehicle(vehicle: IVehicle): Promise<IVehicle> {
        return await this.vehicleRepository.create(vehicle);
    }

    async findAllVehicles(): Promise<IVehicle[]> {
        return await this.vehicleRepository.findAll();
    }

    async findVehicle(id: string): Promise<IVehicle | null> {
        return await this.vehicleRepository.find(id);
    }

    async updateVehicle(id: string, vehicle: IVehicle): Promise<IVehicle | null> {
        return await this.vehicleRepository.update(id, vehicle);
    }

    async deleteVehicle(id: string): Promise<void> {
        await this.vehicleRepository.delete(id);
    }
}