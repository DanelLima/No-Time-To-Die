import express from 'express';
import { getPontosHoje, baterPonto } from '../controllers/pontoController.js';

const ponto = express.Router();

ponto.get('/hoje/:idUsuario', getPontosHoje);
ponto.post('/bater/:idUsuario', baterPonto);

export default ponto;