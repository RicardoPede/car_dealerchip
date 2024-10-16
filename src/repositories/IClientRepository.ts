import { IClient } from "../models/IClient";

export interface IClientRepository {
    create(client: IClient): Promise<IClient>;
    find(id: string): Promise<IClient | null>;
    findAll(): Promise<IClient[]>;
    update(id: string, client: IClient): Promise<IClient | null>;
    delete(id: string): Promise<void>;
}