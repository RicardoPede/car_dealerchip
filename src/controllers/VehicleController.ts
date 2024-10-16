import { Router, Request, Response } from 'express';
import { VehicleRepository } from '../repositories/VehicleRepository';
import { VehicleService } from '../services/VehicleService';
import { PostgresVehicleRepository } from '../repositories/PostgreesVehicleRepository';
import { pool } from '../server';
import { VehicleServiceDecorator } from '../services/VehicleServiceDecorador';

const router = Router();

const useMongoDB = true;

const vehicleRepository = useMongoDB ? new VehicleRepository() : new PostgresVehicleRepository(pool);
const vehicleService = new VehicleService(vehicleRepository);
const vehicleServiceDecorator = new VehicleServiceDecorator(vehicleService);

router.post('/vehicles', async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleService.createVehicle(req.body);
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.get('/vehicles/:id', async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleService.findVehicle(req.params.id);
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.put('/vehicles/:id', async (req: Request, res: Response) => {
    try {
        const vehicle = await vehicleService.updateVehicle(req.params.id, req.body);
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

router.put('/vehicles/:id/apply-discount', async (req: Request, res: Response) => {
    const vehicle = await vehicleServiceDecorator.applyDiscount(req.params.id, req.body.discountPercentage);
    res.status(200).json(vehicle);
});

router.delete('/vehicles/:id', async (req: Request, res: Response) => {
    try {
        await vehicleService.deleteVehicle(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export default router;