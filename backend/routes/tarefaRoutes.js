import express from "express";
import { listarPorProjetoTarefa, criarTarefa, atualizarTarefa, excluirTarefa, tarefasPendentes, tarefasConcluidas } from "../controllers/tarefaController.js";

const tarefa = express.Router();

tarefa.get("/listar/:idProjeto", listarPorProjetoTarefa);
tarefa.post("/criar/", criarTarefa);
tarefa.put("/atualizar/:idTarefa", atualizarTarefa);
tarefa.delete("/excluir/:idTarefa", excluirTarefa);
tarefa.get("/concluidas/:idUsuario", tarefasConcluidas);
tarefa.get("/pendentes/:idUsuario", tarefasPendentes);

export default tarefa;
