import express from 'express';
import { login } from '../controllers/userController.js'
import { cadastro } from '../controllers/userController.js'

const router = express.Router();

router.post('/login', login);
router.post('/cadastro', cadastro);

export default router;