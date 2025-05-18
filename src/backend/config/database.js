import mysql from 'mysql2/promise';

let db;

const initDb = async () => {
  db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'masterkey',
    database: 'notimetodie',
  });
  console.log("Banco de dados conectado.");
};

export { db, initDb };
