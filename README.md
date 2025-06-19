# No-Time-To-Die
# Inicialização

npm start
node src/backend/server.js

# Sistema rodando na seguinte requisição

http://localhost:3000/no-time-to-die/

# Banco de dados

host: localhost
user: root
password: masterkey
database name: notimetodie

# 🕵️‍♂️ No-Time-To-Die

Sistema web para controle de pontos, metas e atividades. Possui frontend em React com navegação por rotas, calendário de atividades, e backend em Node.js com banco de dados MySQL.

---

## 🚀 Tecnologias Utilizadas

- **Frontend**:  
  - React  
  - React Router DOM  
  - Axios  
  - React Bootstrap  
  - FullCalendar  
- **Backend**:  
  - Node.js  
  - Express  
  - MySQL2  
  - CORS  
- **Estilização**:  
  - Bootstrap  

---

## 📦 Instalação do Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/DanelLima/no-time-to-die
cd no-time-to-die
```

### 2. Instale as dependências

```bash
# React
npx create-react-app no-time-to-die
npm install axios react-router-dom bootstrap react-bootstrap

# Calendário -> React
npm install @fullcalendar/core @fullcalendar/react @fullcalendar/daygrid

# Backend
npm install express mysql2 cors
```

---

## 🖥️ Inicialização

### Iniciar o Frontend

```bash
npm start
```

### Iniciar o Backend

```bash
node src/backend/server.js
```

> ⚠️ Certifique-se de que o backend está escutando na porta `3001` ou a definida em `server.js`.

---

## 🌐 URL de Acesso

A aplicação estará disponível em:

```
http://localhost:3000/no-time-to-die/

```



## 🧠 Funcionalidades

- Bater ponto com controle de entrada/saída
- Visualizar pontos do dia
- Calendário de atividades
- Metas e lembretes de pausa
- Projetos e atividades relacionadas

---
