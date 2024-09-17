import express from 'express';
import cors from 'cors';
import connectDB from './db';
import AuthRoutes from './routes/authtRoutes';
import EquipmentRoutes from './routes/equipmentRoutes';
import dotenv from 'dotenv';

dotenv.config();

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.connectDatabase();
  }

  private configureMiddleware() {
    this.app.use(cors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }));

    this.app.use(express.json());
  }

  private configureRoutes() {
    this.app.use('/auth', AuthRoutes);
    this.app.use('/equipment', EquipmentRoutes);
  }

  private connectDatabase() {
    connectDB();
  }

  public start() {
    const PORT = process.env.PORT || 5000;
    this.app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  }
}

const server = new App();
server.start();
