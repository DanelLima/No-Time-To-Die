const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Configurar conexão com o MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "masterkey", // coloque sua senha aqui se tiver
  database: "notimetodie", // seu banco de dados
});

// Testar conexão
db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco de dados:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso!");
});

// Rota de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  const query = "SELECT * FROM usuario WHERE email = ? AND senha = ?";
  db.query(query, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao consultar banco:", err);
      return res.status(500).json({ message: "Erro interno do servidor" });
    }

    if (results.length > 0) {
      // Usuário encontrado
      return res.json({ message: "Login realizado com sucesso!" });
    } else {
      // Usuário não encontrado
      return res.status(401).json({ message: "E-mail ou senha inválidos" });
    }
  });
});

// Rodar servidor
app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});
