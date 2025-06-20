import express from "express";
import { folhaDePonto, produtividade } from "../controllers/relatorioController.js";

const relatorio = express.Router();

relatorio.get("/ponto/:idUsuario", folhaDePonto);
relatorio.get("/produtividade/:idUsuario", produtividade);

export default relatorio;
