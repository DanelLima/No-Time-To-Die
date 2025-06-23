import express from 'express';
import { buscarProjetos, cadastrarProjeto, editarProjeto, excluirProjeto, buscarUltimoProjeto } from '../controllers/projetosController.js';

const projeto = express.Router();

projeto.get('/listarprojetos/:idUsuario', buscarProjetos);
projeto.post('/criarProjeto', cadastrarProjeto);
projeto.put('/editarProjeto/:idProjeto', editarProjeto);
projeto.delete('/excluirProjeto/:idProjeto', excluirProjeto);
projeto.get('/ultimo/:idUsuario', buscarUltimoProjeto);

export default projeto;
