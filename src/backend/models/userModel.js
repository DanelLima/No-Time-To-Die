import { db } from '../config/database.js';

export const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);
  return rows[0];
};