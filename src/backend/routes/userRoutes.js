import express from 'express';
import { login } from '../controllers/userController.js'
import { cadastro } from '../controllers/userController.js'
import { getPontosHoje, baterPonto } from '../controllers/pontoController.js';

const router = express.Router();

router.post('/login', login);
router.post('/cadastro', cadastro);
router.get('/ponto/hoje/:idUsuario', getPontosHoje);
router.post('/ponto/bater/:idUsuario', baterPonto);

export default router;