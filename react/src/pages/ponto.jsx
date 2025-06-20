import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

export default function Ponto(){
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

            <div className="main p-3">
                <h1 className="text-center mb-4">PONTOS</h1>

                <div className="row gx-3 gy-4">
                    
                </div>

            </div>
        </div >
    );
}
