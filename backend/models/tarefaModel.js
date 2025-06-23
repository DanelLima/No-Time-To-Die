import { db } from "../config/database.js";

export async function listarPorProjeto(idProjeto) {
  const [rows] = await db.query("SELECT * FROM tarefa WHERE idProjeto = ?", [idProjeto]);
  return rows;
}

function formatDateToSQL(date) {
  return date.toISOString().split('T')[0];
}

export async function criar(tarefa) {
  const { nome, descricao, status, idProjeto } = tarefa;

  const dataCriacao = tarefa.dataCriacao || formatDateToSQL(new Date());

  const [result] = await db.query(
    "INSERT INTO tarefa (nome, descricao, status, idProjeto, dataCriacao) VALUES (?, ?, ?, ?, ?)",
    [nome, descricao, status, idProjeto, dataCriacao]
  );

  return { idTarefa: result.insertId, ...tarefa, dataCriacao };
}

export async function atualizar(idTarefa, tarefa) {
  const { nome, descricao, status } = tarefa;

  const [rows] = await db.query(
    "SELECT status FROM tarefa WHERE idTarefa = ?",
    [idTarefa]
  );
  if (rows.length === 0) throw new Error('Tarefa não encontrada');

  const tarefaAtual = rows[0];
  let dataConclusao = null;

  if (status === 'Concluída' && tarefaAtual.status !== 'Concluída') {
    dataConclusao = formatDateToSQL(new Date());
  }

  if (dataConclusao) {
    await db.query(
      "UPDATE tarefa SET nome = ?, descricao = ?, status = ?, dataConclusao = ? WHERE idTarefa = ?",
      [nome, descricao, status, dataConclusao, idTarefa]
    );
  } else {
    await db.query(
      "UPDATE tarefa SET nome = ?, descricao = ?, status = ? WHERE idTarefa = ?",
      [nome, descricao, status, idTarefa]
    );
  }

  return { idTarefa, ...tarefa, ...(dataConclusao && { dataConclusao }) };
}

export async function excluir(idTarefa) {
  await db.query("DELETE FROM tarefa WHERE idTarefa = ?", [idTarefa]);
}

export async function listarTarefasConcluidas(idUsuario) {
  const [rows] = await db.query(
   "SELECT T.nome AS nomeTarefa, T.dataConclusao FROM Tarefa T INNER JOIN Projeto P ON T.idProjeto = P.idProjeto WHERE P.idUsuario = ? AND T.status = 'Concluída';", [idUsuario]);
  return rows;
}

export async function listarTarefasPendentes(idUsuario) {
  const [rows] = await db.query(
    "SELECT T.nome AS nomeTarefa, P.nome AS nomeProjeto FROM Tarefa T INNER JOIN Projeto P ON T.idProjeto = P.idProjeto WHERE P.idUsuario = ? AND T.status = 'Pendente';", [idUsuario]);
  return rows;
}
