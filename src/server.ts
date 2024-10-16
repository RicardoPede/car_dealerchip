import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import vehicleController from './controllers/VehicleController';
import clientController from './controllers/ClientController';
import mongoose from 'mongoose';
import { Pool } from 'pg';

export const pool = new Pool({
    user: 'db_user',
    host: 'localhost',
    database: 'db_dealerchip',
    password: 'root',
    port: 5432,
});

export default class Server {

    public app: Application;
    private port: string = process.env.APP_PORT || "3000";
    private host: string = process.env.APP_HOST || "localhost";

    private isPostgresConnected: boolean = false;

    constructor() {
        this.app = express();
        this.config();
        this.middleware();
        this.routes();
    }

    private config(): void {
        mongoose.connect('mongodb://localhost:27017/dealerchipmanagement', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as mongoose.ConnectOptions);

        pool.connect((err) => {
            if (err) {
                console.error('Error al conectar a la base de datos de Postgrees', err.message);
                return;
            } else {
                console.log('Conexión a la base de datos exitosa');
                this.isPostgresConnected = true;
            }
        });
    }

    private middleware() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private routes(): void {
        this.app.use('/api', vehicleController);
        this.app.use('/api', clientController);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://${this.host}:${this.port}`);
        });
    }
}
