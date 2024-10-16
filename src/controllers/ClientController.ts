import { Router, Request, Response } from 'express';
import { ClientRepository } from '../repositories/ClientRepository';
import { ClientService } from '../services/ClientService';
import { pool } from '../server';
import { PostgresClientRepository } from '../repositories/PostgreesClientRepository';

const router = Router();

const useMongoDB = true;
console.log('useMongoDB', useMongoDB);
const clientRepository = useMongoDB ? new ClientRepository() : new PostgresClientRepository(pool);
console.log('clientRepository', clientRepository);
const clientService = new ClientService(clientRepository);

router.post('/clients', async (req: Request, res: Response) => {
    try {
        const { id, nombre, email, teléfono } = req.body;
        const client = await clientService.createClient({ id, nombre, email, teléfono });
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get('/clients', async (req: Request, res: Response) => {
    try {
        const clients = await clientService.findAllClients();
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get('/clients/:id', async (req: Request, res: Response) => {
    try {
        const client = await clientService.findClient(req.params.id);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.put('/clients/:id', async (req: Request, res: Response) => {
    try {
        const client = await clientService.updateClient(req.params.id, req.body);
        res.status(200).json(client);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    };
});

router.delete('/clients/:id', async (req: Request, res: Response) => {
    try {
        await clientService.deleteClient(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;