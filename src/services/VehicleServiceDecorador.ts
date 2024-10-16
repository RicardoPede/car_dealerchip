import { IVehicle } from '../models/IVehicle';
import { VehicleService } from './VehicleService';

export class VehicleServiceDecorator extends VehicleService {
  private vehicleService: VehicleService;

  constructor(vehicleService: VehicleService) {
    super(vehicleService['vehicleRepository']);
    this.vehicleService = vehicleService;
  }

  async applyDiscount(id: string, discountPercentage: number): Promise<IVehicle | null> {
    const vehicle = await this.vehicleService.findVehicle(id);
    if (vehicle) {
      vehicle.precio = vehicle.precio - (vehicle.precio * discountPercentage / 100);
      return await this.vehicleService.updateVehicle(id, vehicle);
    }
    return null;
  }
}