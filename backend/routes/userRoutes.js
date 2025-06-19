import express from 'express';
import { login, cadastro } from '../controllers/userController.js'

const user = express.Router();

user.post('/login', login);
user.post('/cadastro', cadastro);

export default user;