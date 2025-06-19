import express from 'express';
import { buscarProjetos, cadastrarProjeto } from '../controllers/projetosController.js';

const projeto = express.Router();

projeto.get('/listarprojetos/:idUsuario', buscarProjetos);
projeto.post('/criarProjeto', cadastrarProjeto);

export default projeto;
