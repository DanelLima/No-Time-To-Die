import { db } from "../config/database.js";

export async function buscarPontosPorPeriodo(idUsuario, inicio, fim) {
    const [linhas] = await db.query(`
        SELECT * FROM Ponto 
        WHERE idUsuario = ? OR DATE(dataHora) BETWEEN ? AND ?
        ORDER BY dataHora
    `, [idUsuario, inicio, fim]);
    return linhas;
}

export async function buscarProdutividade(idUsuario, dataInicio, dataFim) {
    const [result] = await db.query(`
        SELECT 
            DATE(T.dataConclusao) AS dia,
            COUNT(*) AS tarefasConcluidas,
            SUM(TIMESTAMPDIFF(HOUR, P1.dataHora, P2.dataHora)) AS horasTrabalhadas
        FROM Tarefa T
        LEFT JOIN Ponto P1 ON DATE(P1.dataHora) = DATE(T.dataConclusao) AND P1.idUsuario = ?
        LEFT JOIN Ponto P2 ON DATE(P2.dataHora) = DATE(T.dataConclusao) AND P2.idUsuario = ?
        WHERE T.dataConclusao BETWEEN ? AND ? AND T.status = 'Concluída'
        GROUP BY dia
        ORDER BY dia ASC
    `, [idUsuario, idUsuario, dataInicio, dataFim]);

    return result;
}
