import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/index.cjs';
import '@fullcalendar/daygrid/index.cjs';



export default function Menu() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [showPonto, setShowPonto] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [showLembrete, setShowLembrete] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      setUsuario(JSON.parse(userData));
    } else {
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

      return () => {
        hamburger.removeEventListener("click", toggleSidebar);
      };
    }
  }, []);

  return (
    <div className="wrapper">

      {/* side bar */}

      <aside id="sidebar">
        <div className="sidebar-content">
          <button id="toggle-btn" type="button">
            <i className="bi bi-grid-fill"></i>
          </button>

          <div className="sidebar-options">
            <a href="/no-time-to-die/menu">
              <i class="bi bi-house"></i>
              <span>Página Principal</span>
            </a>
          </div>

          <div className="sidebar-options">
            <a href="/no-time-to-die/projetos">
              <i className="bi bi-file-text"></i>
              <span>Projetos</span>
            </a>
            <a href="/no-time-to-die/relatorios">
              <i className="bi bi-kanban"></i>
              <span>Baixar Relatórios</span>
            </a>
          </div>

          <div className="sidebar-footer">
            <a href="/no-time-to-die/" onClick={() => {
              localStorage.clear();
            }}>
              <i className="bi bi-box-arrow-left"></i>
              <span>Logout</span>
            </a>
          </div>
        </div>
      </aside>

      {/* main */}

      <div className="main p-3">
        <h1 className="text-center mb-4">NO TIME TO DIE</h1>
        <div className="row gx-3 gy-4">
          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Pontos de Hoje</h4>
              <Button variant="primary" onClick={() => setShowPonto(true)}>Bater Ponto</Button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Metas</h4>
              <Button variant="success" onClick={() => setShowMeta(true)}>Definir Meta</Button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Lembretes de Pausa</h4>
              <Button variant="warning" onClick={() => setShowLembrete(true)}>Criar Lembrete</Button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Projetos</h4>
              {/* <ul>
                {usuario?.projetos?.map((proj, idx) => (
                  <li key={idx}>{proj.nome}</li>
                ))}
              </ul> */}
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 border bg-white shadow">
              <h4>Calendário de Atividades</h4>
              <p>Calendário com atividades realizadas.</p>
              <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[
                  { title: 'Entrega de Projeto', date: '2025-05-25' },
                  { title: 'Reunião', date: '2025-05-27' }
                ]}
              />
            </div>
          </div>
        </div>

        <Modal show={showPonto} onHide={() => setShowPonto(false)}>
          <Modal.Header closeButton><Modal.Title>Bater Ponto</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>Você bateu o ponto às: {new Date().toLocaleTimeString()}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPonto(false)}>Fechar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showMeta} onHide={() => setShowMeta(false)}>
          <Modal.Header closeButton><Modal.Title>Definir Meta</Modal.Title></Modal.Header>
          <Modal.Body>
            <input type="text" placeholder="Digite sua meta..." className="form-control" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success">Salvar</Button>
            <Button variant="secondary" onClick={() => setShowMeta(false)}>Cancelar</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showLembrete} onHide={() => setShowLembrete(false)}>
          <Modal.Header closeButton><Modal.Title>Criar Lembrete</Modal.Title></Modal.Header>
          <Modal.Body>
            <input type="text" placeholder="Digite o lembrete..." className="form-control" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning">Salvar</Button>
            <Button variant="secondary" onClick={() => setShowLembrete(false)}>Cancelar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
