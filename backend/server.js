import express from 'express';
import cors from "cors";

import user from './routes/userRoutes.js';
import ponto from './routes/pontoRoutes.js'
import projeto from './routes/projetoRoutes.js';
import { initDb } from './config/database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuario', user);
app.use('/ponto', ponto);
app.use('/projeto', projeto);

const startServer = async () => {
  try {
    await initDb();
    app.listen(3001, () => {
      console.log("Servidor rodando em http://localhost:3001");
    });
  } catch (error) {
    console.error("Erro ao conectar no banco de dados:", error);
    process.exit(1);
  }
};

startServer();