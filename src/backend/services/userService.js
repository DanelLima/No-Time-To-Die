import { findByEmail } from '../models/userModel.js';

export const validate = async (email, senha) => {
  const user = await findByEmail(email);
  console.log(user);
  if (user.senha !== senha) {
    throw new Error("Email ou senha inválidos.");
  }
  return user;
};
