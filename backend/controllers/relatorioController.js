import { buscarPontosPorPeriodo, buscarProdutividade } from "../models/relatorioModel.js";

export async function folhaDePonto(req, res) {
    const { idUsuario } = req.params;
    const { inicio, fim } = req.query;

    try {
        const pontos = await buscarPontosPorPeriodo(idUsuario, inicio, fim);
        res.json(pontos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar pontos.", detalhe: error.message });
    }
}

export async function produtividade(req, res) {
    const { idUsuario } = req.params;
    const { tipo } = req.query;

    const hoje = new Date();
    let inicio, fim;

    switch (tipo) {
        case "dia":
            inicio = fim = hoje.toISOString().split("T")[0];
            break;
        case "semana":
            const inicioSemana = new Date(hoje);
            inicioSemana.setDate(inicioSemana.getDate() - hoje.getDay());
            inicio = inicioSemana.toISOString().split("T")[0];
            fim = hoje.toISOString().split("T")[0];
            break;
        case "mes":
            const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
            inicio = inicioMes.toISOString().split("T")[0];
            fim = hoje.toISOString().split("T")[0];
            break;
        case "geral":
        default:
            inicio = "2000-01-01";
            fim = hoje.toISOString().split("T")[0];
            break;
    }

    try {
        const dados = await buscarProdutividade(idUsuario, inicio, fim);
        res.json(dados);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao gerar relatório de produtividade.", detalhe: error.message });
    }
}
