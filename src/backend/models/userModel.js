import { db } from '../config/database.js';

export const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);
  return rows[0];
};

export const inserirUsuario = async ({ email, nome, senha, telefone }) => {
  await db.query(
    'INSERT INTO usuario (email, nome, senha, celular) VALUES (?, ?, ?, ?)',
    [email, nome, senha, telefone]
  );
};