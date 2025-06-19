import { buscarProjetosPorUsuario, criarProjeto } from '../models/projetoModel.js';

export const buscarProjetos = async (req, res) => {
    try {
        const projetos = await buscarProjetosPorUsuario(req.params.idUsuario);
        res.json(projetos);
    } catch (error) {
        console.error("Erro ao buscar projetos:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};

export const cadastrarProjeto = async (req, res) => {
    try {
        const id = await criarProjeto(req.body);
        res.status(201).json({ idProjeto: id });
    } catch (error) {
        console.error("Erro ao criar projeto:", error);
        res.status(500).json({ error: "Erro interno ao cadastrar projeto." });
    }
};
