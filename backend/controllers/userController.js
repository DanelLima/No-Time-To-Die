import { findByEmail, inserirUsuario } from '../models/userModel.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (user.senha !== senha) {
      return res.status(401).json({ error: "Email ou senha inválidos." });
    }
    //Deleta a senha
    delete user.senha;

    return res.status(200).json({ usuario: user });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    return res.status(500).json({ error: "Erro interno no servidor." });
  }
};


export const cadastro = async (req, res) => {
  const { email, nome, senha, telefone } = req.body;

  try {
    // Verificar se já existe
    const usuarioExistente = await findByEmail(email);
    if (usuarioExistente) {
      return res.status(401).json({ error: "Email já cadastrado." });
    }

    await inserirUsuario({ email, nome, senha, telefone });
    return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: "Erro ao cadastrar" });
  }
};