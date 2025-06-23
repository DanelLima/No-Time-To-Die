import { buscarProjetosPorUsuario, criarProjeto, atualizarProjeto, deletarProjeto, buscarUltimoProjetoUsuario } from '../models/projetoModel.js';

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

export const editarProjeto = async (req, res) => {
    const { idProjeto } = req.params;
    const {
        nome, descricao, dataInicio, dataFim, status, valorArrecadado, cliente
    } = req.body;
    try {
        await atualizarProjeto(idProjeto, {
            nome, descricao, dataInicio, dataFim, status, valorArrecadado, cliente
        });
        res.status(200).json({ message: "Projeto atualizado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar projeto" });
    }
}

export const excluirProjeto = async (req, res) => {
    const { idProjeto } = req.params;
    try {
        await deletarProjeto(idProjeto);
        res.status(200).json({ message: "Projeto excluido com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir projeto" });
    }
}

export const buscarUltimoProjeto = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const projeto = await buscarUltimoProjetoUsuario(idUsuario);
        res.json(projeto);
    } catch (error) {
        console.error("Erro ao buscar projeto:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};