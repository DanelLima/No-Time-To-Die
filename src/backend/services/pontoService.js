const API_URL = 'http://localhost:3001/api/ponto';

export async function buscarPontosHoje(idUsuario) {
  const res = await fetch(`${API_URL}/hoje/${idUsuario}`);
  return res.json();
}

export async function baterPonto(idUsuario) {
  const res = await fetch(`${API_URL}/bater/${idUsuario}`, {
    method: 'POST'
  });
  return res.json();
}
