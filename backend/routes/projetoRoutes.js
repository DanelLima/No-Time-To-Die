import express from 'express';
import { buscarProjetos, cadastrarProjeto, editarProjeto, excluirProjeto } from '../controllers/projetosController.js';

const projeto = express.Router();

projeto.get('/listarprojetos/:idUsuario', buscarProjetos);
projeto.post('/criarProjeto', cadastrarProjeto);
projeto.put('/editarProjeto/:idProjeto', editarProjeto);
projeto.delete('/excluirProjeto/:idProjeto', excluirProjeto);

export default projeto;
