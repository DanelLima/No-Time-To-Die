import express from "express";
import { listarPorProjetoTarefa, criarTarefa, atualizarTarefa, excluirTarefa } from "../controllers/tarefaController.js";

const tarefa = express.Router();

tarefa.get("/listar/:idProjeto", listarPorProjetoTarefa);
tarefa.post("/criar/", criarTarefa);
tarefa.put("/atualizar/:idTarefa", atualizarTarefa);
tarefa.delete("/excluir/:idTarefa", excluirTarefa);

export default tarefa;
