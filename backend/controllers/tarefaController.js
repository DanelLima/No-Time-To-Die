import { listarPorProjeto, criar, atualizar, excluir } from '../models/tarefaModel.js';

export const listarPorProjetoTarefa = async (req, res) => {
    try {
        const { idProjeto } = req.params;
        const tarefas = await listarPorProjeto(idProjeto);
        res.json(tarefas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao buscar tarefas" });
    }
};

export const  criarTarefa = async (req, res) => {
    try {
        const tarefa = req.body;
        const novaTarefa = await criar(tarefa);
        res.status(201).json(novaTarefa);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao criar tarefa" });
    }
};

export const atualizarTarefa = async (req, res) => {
    try {
        const { idTarefa } = req.params;
        const dados = req.body;
        const tarefaAtualizada = await atualizar(idTarefa, dados);
        res.json(tarefaAtualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao atualizar tarefa" });
    }
};

export const  excluirTarefa = async (req, res) => {
    try {
        const { idTarefa } = req.params;
        await excluir(idTarefa);
        res.sendStatus(204); // No Content
    } catch (error) {
        console.error(error);
        res.status(500).json({ erro: "Erro ao excluir tarefa" });
    }
};
