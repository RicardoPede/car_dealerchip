import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    id: String,
    nombre: String,
    email: String,
    teléfono: String,
});

export const Client = mongoose.model<IClient & mongoose.Document>('Client', clientSchema);

export interface IClient {
  id: string;
  nombre: string;
  email: string;
  teléfono: string;
}
