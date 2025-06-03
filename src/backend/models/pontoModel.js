import { db } from '../config/database.js';

function hoje() {
  const inicio = new Date();
  inicio.setHours(0, 0, 0, 0);
  const fim = new Date();
  fim.setHours(23, 59, 59, 999);
  return [inicio, fim];
}

export default class Ponto {
  static async buscarPontosHoje(idUsuario) {
    const [inicio, fim] = hoje();
    const [rows] = await db.execute(
      'SELECT * FROM Ponto WHERE idUsuario = ? AND dataHora BETWEEN ? AND ? ORDER BY dataHora ASC',
      [idUsuario, inicio, fim]
    );
    return rows;
  }

  static async baterPonto(idUsuario) {
    const pontos = await this.buscarPontosHoje(idUsuario);
    const isEntrada = pontos.length % 2 === 0;
    const [result] = await db.execute(
      `INSERT INTO Ponto (idUsuario, dataHora, entrada, saida)
       VALUES (?, NOW(), ?, ?)`,
      [idUsuario, isEntrada, !isEntrada]
    );
    return { id: result.insertId, isEntrada };
  }
}
