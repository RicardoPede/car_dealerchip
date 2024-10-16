import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
    id: String,
    marca: String,
    modelo: String,
    año: Number,
    precio: Number,
});

export const Vehicle = mongoose.model<IVehicle & mongoose.Document>('Vehicle', vehicleSchema);

export interface IVehicle {
  id: string;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
}