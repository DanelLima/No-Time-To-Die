import { db } from '../config/database.js';

export async function buscarProjetosPorUsuario(idUsuario) {
    const [rows] = await db.query(
        `SELECT p.*, c.nome AS cliente_nome, c.email AS cliente_email, c.telefone AS cliente_telefone
         FROM projeto p
         LEFT JOIN cliente c ON p.idProjeto = c.idProjeto
         WHERE p.idUsuario = ?`,
        [idUsuario]
    );

    return rows.map(row => ({
        idProjeto: row.idProjeto,
        nome: row.nome,
        descricao: row.descricao,
        dataInicio: row.dataInicio,
        dataFim: row.dataFim,
        status: row.status,
        valorArrecadado: row.valorArrecadado,
        cliente: row.cliente_nome ? {
            nome: row.cliente_nome,
            email: row.cliente_email,
            telefone: row.cliente_telefone
        } : null
    }));
}

export async function criarProjeto(projeto) {
    const [res] = await db.query(
        `INSERT INTO projeto (nome, descricao, dataInicio, dataFim, status, valorArrecadado, idUsuario)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            projeto.nome,
            projeto.descricao,
            projeto.dataInicio,
            projeto.dataFim,
            projeto.status,
            projeto.valorArrecadado,
            projeto.idUsuario
        ]
    );

    const idProjeto = res.insertId;

    if (projeto.cliente) {
        await db.query(
            `INSERT INTO cliente (nome, email, telefone, idProjeto)
             VALUES (?, ?, ?, ?)`,
            [projeto.cliente.nome, projeto.cliente.email, projeto.cliente.telefone, idProjeto]
        );
    }

    return idProjeto;
}

export async function atualizarProjeto(id, projeto) {
    await db.query(`
        UPDATE projeto SET nome = ?, descricao = ?, dataInicio = ?, dataFim = ?, status = ?, valorArrecadado = ?
        WHERE idProjeto = ?
    `, [projeto.nome, projeto.descricao, projeto.dataInicio, projeto.dataFim, projeto.status, projeto.valorArrecadado, id]);

    if (projeto.cliente) {
        await db.query(`
            UPDATE cliente SET nome = ?, email = ?, telefone = ? WHERE idProjeto = ?
        `, [projeto.cliente.nome, projeto.cliente.email, projeto.cliente.telefone, id]);
    }
}
export async function deletarProjeto(id) {
    await db.query(`DELETE FROM cliente WHERE idProjeto = ?`, [id]);
    await db.query(`DELETE FROM projeto WHERE idProjeto = ?`, [id]);
}

export async function buscarUltimoProjetoUsuario(idUsuario) {
  const [rows] = await db.query("SELECT * FROM projeto WHERE idUsuario = ? ORDER BY idProjeto DESC LIMIT 1",[idUsuario]);
  return rows[0];
}