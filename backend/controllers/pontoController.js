import Ponto from '../models/pontoModel.js';

export async function getPontosHoje(req, res) {
  try {
    const { idUsuario } = req.params;
    const pontos = await Ponto.buscarPontosHoje(idUsuario);
    res.json(pontos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function baterPonto(req, res) {
  try {
    const { idUsuario } = req.params;
    const resultado = await Ponto.baterPonto(idUsuario);
    const pontosAtualizados = await Ponto.buscarPontosHoje(idUsuario);
    res.json({ mensagem: resultado.isEntrada ? 'Entrada registrada' : 'Saída registrada', pontos: pontosAtualizados });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
