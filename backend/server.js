import express from 'express';
import router from './routes/userRoutes.js';
import cors from "cors";
import { initDb } from './config/database.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const startServer = async () => {
  try {
    await initDb(); // conecta no banco ANTES de iniciar o servidor
    app.listen(3001, () => {
      console.log("Servidor rodando em http://localhost:3001");
    });
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error);
    process.exit(1);
  }
};

startServer();