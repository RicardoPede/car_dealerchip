import { IClient } from '../models/IClient';
import { IClientRepository } from '../repositories/IClientRepository';

export class ClientService {
    private clientRepository: IClientRepository

    constructor(clientRepository: IClientRepository) {
        this.clientRepository = clientRepository;
    }

    async createClient(client: IClient): Promise<IClient> {
        return await this.clientRepository.create(client);
    }

    async findAllClients(): Promise<IClient[]> {
        return await this.clientRepository.findAll();
    }

    async findClient(id: string): Promise<IClient | null> {
        return await this.clientRepository.find(id);
    }

    async updateClient(id: string, client: IClient): Promise<IClient | null> {
        return await this.clientRepository.update(id, client);
    }

    async deleteClient(id: string): Promise<void> {
        await this.clientRepository.delete(id);
    }
}