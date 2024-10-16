import { IClientRepository } from './IClientRepository';
import { IClient, Client } from '../models/IClient';

export class ClientRepository implements IClientRepository {
    async create(client: IClient): Promise<IClient> {
        return await Client.create(client);
    }
    async findAll(): Promise<IClient[]> {
        return await Client.find();
    }
    async find(id: string): Promise<IClient | null> {
        return await Client.findById(id);
    }
    async update(id: string, client: IClient): Promise<IClient | null> {
        return await Client.findByIdAndUpdate(id, client, { new: true });
    }
    async delete(id: string): Promise<void> {
        await Client.findByIdAndDelete(id);
      }
}