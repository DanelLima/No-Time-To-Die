CREATE DATABASE NoTimeToDie;

USE NoTimeToDie;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100),
    celular VARCHAR(20)
);

CREATE TABLE Ponto (
    idPonto INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    dataHora DATETIME,
    entrada BOOLEAN,
    saida BOOLEAN,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Falta (
    idFalta INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    data DATE,
    justificativa TEXT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Meta (
    idMeta INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    nome VARCHAR(100),
    objetivo TEXT,
    dataPrazo DATE,
    alcancada BOOLEAN,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE LembretePausa (
    idLembrete INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    minutosTrabalho INT,
    horas TIME,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Projeto (
    idProjeto INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    nome VARCHAR(100),
    descricao TEXT,
    dataInicio DATE,
    dataFim DATE,
    status VARCHAR(50),
    valorArrecadado FLOAT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Cliente (
    idCliente INT PRIMARY KEY AUTO_INCREMENT,
    idProjeto INT,
    nome VARCHAR(100),
    email VARCHAR(100),
    telefone VARCHAR(20),
    FOREIGN KEY (idProjeto) REFERENCES Projeto(idProjeto)
);

CREATE TABLE Tarefa (
    idTarefa INT PRIMARY KEY AUTO_INCREMENT,
    idProjeto INT,
    nome VARCHAR(100),
    descricao TEXT,
    status VARCHAR(50),
    dificuldade VARCHAR(50),
    dataCriacao DATE,
    dataConclusao DATE,
    FOREIGN KEY (idProjeto) REFERENCES Projeto(idProjeto)
);

INSERT INTO Usuario (nome, email, senha, celular)
VALUES ('Daniel Souza de Lima','danielsouzalimabsb@gmail.com', 'masterkey', '(61) 98108-0783');

