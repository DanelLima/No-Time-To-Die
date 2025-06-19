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
