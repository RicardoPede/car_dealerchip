import { IVehicle } from "../models/IVehicle";

export interface IVehicleRepository {
    create(vehicle: IVehicle): Promise<IVehicle>;
    find(id: string): Promise<IVehicle | null>;
    findAll(): Promise<IVehicle[]>;
    update(id: string, vehicle: IVehicle): Promise<IVehicle | null>;
    delete(id: string): Promise<void>;
}