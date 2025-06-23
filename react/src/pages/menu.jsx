import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import '@fullcalendar/core/index.cjs';
import '@fullcalendar/daygrid/index.cjs';

export default function Menu() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("usuario"));
  const [pontos, setPontos] = useState([]);
  const [showMeta, setShowMeta] = useState(false);
  const [showLembrete, setShowLembrete] = useState(false);
  const [ultimoProjeto, setUltimoProjeto] = useState(null);
  const [tarefasRealizadas, setTarefasRealizadas] = useState([]);
  const [tarefasPendentes, setTarefasPendentes] = useState([]);
  const API_URL = 'http://localhost:3001';

  useEffect(() => {
    async function fetchMenu() {
      try {
        const projetoRes = await fetch(`${API_URL}/projeto/ultimo/${userData?.idUsuario}`);
        const realizadasRes = await fetch(`${API_URL}/tarefas/concluidas/${userData?.idUsuario}`);
        const pendentesRes = await fetch(`${API_URL}/tarefas/pendentes/${userData?.idUsuario}`);

        if (!projetoRes.ok || !realizadasRes.ok || !pendentesRes.ok) {
          throw new Error("Erro ao buscar dados do menu");
        }

        const projeto = await projetoRes.json();
        const realizadas = await realizadasRes.json();
        const pendentes = await pendentesRes.json();

        setUltimoProjeto(projeto);
        setTarefasRealizadas(realizadas);
        setTarefasPendentes(pendentes);
      } catch (error) {
        console.error("Erro no fetchMenu:", error);
      }
    }
    fetchMenu();
  }, [userData]);


  async function buscarPontosHoje(idUsuario) {
    const res = await fetch(`${API_URL}/ponto/hoje/${idUsuario}`);
    return res.json();
  }

  async function baterPonto(idUsuario) {
    const res = await fetch(`${API_URL}/ponto/bater/${idUsuario}`, {
      method: 'POST'
    });
    return res.json();
  }

  useEffect(() => {
    if (!userData) {
      alert("Faça Login para acessar!");
      navigate("/");
    }
  }, []);

  useEffect(() => {
    const hamburger = document.querySelector("#toggle-btn");
    const sidebar = document.querySelector("#sidebar");
    if (hamburger && sidebar) {
      const toggleSidebar = () => sidebar.classList.toggle("expand");
      hamburger.addEventListener("click", toggleSidebar);
      return () => hamburger.removeEventListener("click", toggleSidebar);
    }
  }, []);

  useEffect(() => {
    if (userData?.idUsuario) {
      buscarPontosHoje(userData.idUsuario).then(setPontos);
    }
  }, [userData]);

  const handleBaterPonto = async () => {
    const res = await baterPonto(userData.idUsuario);
    alert(res.mensagem);
    setPontos(res.pontos);
  };

  return (
    <div className="wrapper">

      {/* SIDEBAR */}

      <aside id="sidebar">
        <div className="sidebar-content">
          <button id="toggle-btn" type="button">
            <i className="bi bi-grid-fill"></i>
          </button>

          <div className="sidebar-options">
            <a href="/menu">
              <i className="bi bi-house"></i>
              <span>Página Principal</span>
            </a>
            <a href="/projetos">
              <i className="bi bi-file-text"></i>
              <span>Projetos</span>
            </a>
            <a href="/relatorios">
              <i className="bi bi-kanban"></i>
              <span>Baixar Relatórios</span>
            </a>
            <a href="/ponto">
              <i class="bi bi-clock-history"></i>
              <span>Pontos</span>
            </a>
          </div>

          <div className="sidebar-footer">
            <a href="/" onClick={() => {
              localStorage.clear();
            }}>
              <i className="bi bi-box-arrow-left"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN */}

      <div className="main p-3">
        <h1 className="text-center mb-4">NO TIME TO DIE</h1>

        <div className="row gx-3 gy-4">
          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Pontos de Hoje</h4>
              {pontos.length === 0 ? (
                <p>Nenhum ponto registrado hoje.</p>
              ) : (
                <ul>
                  {pontos.map((ponto) => (
                    <li key={ponto.idPonto}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: ponto.entrada ? "green" : "orange",
                          marginRight: "8px",
                        }}
                      ></span>
                      {new Date(ponto.dataHora).toLocaleTimeString()} —{" "}
                      {ponto.entrada ? "Entrada" : "Saída"}
                    </li>
                  ))}
                </ul>
              )}
              <Button variant="primary" onClick={handleBaterPonto}>
                Bater Ponto
              </Button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Tarefas Pendentes</h4>
              <ul>
                {tarefasPendentes.length > 0 ? (
                  tarefasPendentes.map((tarefa, idx) => (
                    <li key={idx}>
                      {tarefa.nomeTarefa} — <strong>{tarefa.nomeProjeto}</strong>
                    </li>
                  ))
                ) : (
                  <li>Sem tarefas pendentes</li>
                )}
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Último projeto adicionado</h4><br />

              {ultimoProjeto ? (<>
                <h5>{ultimoProjeto.nome}</h5>
                <p>Status: {ultimoProjeto.status}</p>
                <p>Data Início: {new Date(ultimoProjeto.dataInicio).toLocaleDateString('pt-BR')}</p>
                <p>Data Fim: {new Date(ultimoProjeto.dataFim).toLocaleDateString('pt-BR')}</p>
              </>
              ) : (
                <h5>Nenhum projeto encontrado</h5>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Calendário de Tarefas</h4>
              <p>Calendário com tarefas realizadas.</p>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={tarefasRealizadas.map(t => ({
                  title: t.nomeTarefa,
                  date: t.dataConclusao
                }))}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Metas</h4>
              <Button variant="success" onClick={() => setShowMeta(true)}>
                Definir Meta
              </Button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Lembretes de Pausa</h4>
              <Button variant="warning" onClick={() => setShowLembrete(true)}>
                Criar Lembrete
              </Button>
            </div>
          </div>

        </div>

        {/* MODAL: META */}
        <Modal show={showMeta} onHide={() => setShowMeta(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Definir Meta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Digite sua meta..."
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success">Salvar</Button>
            <Button variant="secondary" onClick={() => setShowMeta(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* MODAL: LEMBRETE */}
        <Modal show={showLembrete} onHide={() => setShowLembrete(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Criar Lembrete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="Digite o lembrete..."
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning">Salvar</Button>
            <Button variant="secondary" onClick={() => setShowLembrete(false)}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
