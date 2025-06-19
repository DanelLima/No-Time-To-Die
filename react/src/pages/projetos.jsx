import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

export default function Projetos() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("usuario"));
    const [projetos, setProjetos] = useState([]);
    const [showCadastrar, setShowCadastrar] = useState(false);
    const [showTarefasProjeto, setShowTarefasProjeto] = useState(null);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [idProjetoEditando, setIdProjetoEditando] = useState(null);
    const [novoProjeto, setNovoProjeto] = useState({
        nome: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
        status: "",
        valorArrecadado: 0,
        cliente: {
            nome: "",
            email: "",
            telefone: ""
        }
    });
    const API_URL = 'http://localhost:3001';
    const formatarTelefone = (valor) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
        return valor;
    };
    useEffect(() => {
        if (!userData) {
            alert("Faça Login para acessar!");
            navigate("/");
        } else {
            buscarProjetos(userData.idUsuario);
        }
    }, []);

    async function buscarProjetos(idUsuario) {
        try {
            const res = await fetch(`${API_URL}/projeto/listarprojetos/${idUsuario}`);
            const data = await res.json();
            setProjetos(data);
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        }
    }

    async function excluirProjeto(idProjeto) {
        await fetch(`${API_URL}/excluirProjeto/${idProjeto}`, { method: "DELETE" });
        buscarProjetos(userData.idUsuario);
    }

    useEffect(() => {
        const hamburger = document.querySelector("#toggle-btn");
        const sidebar = document.querySelector("#sidebar");
        if (hamburger && sidebar) {
            const toggleSidebar = () => sidebar.classList.toggle("expand");
            hamburger.addEventListener("click", toggleSidebar);
            return () => hamburger.removeEventListener("click", toggleSidebar);
        }
    }, []);

    async function cadastrarProjeto() {
        const payload = {
            ...novoProjeto,
            idUsuario: userData.idUsuario,
            cliente: novoProjeto.cliente.nome ? novoProjeto.cliente : null
        };

        const res = await fetch(`${API_URL}/projeto/criarProjeto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            setShowCadastrar(false);
            setNovoProjeto({
                nome: "",
                descricao: "",
                dataInicio: "",
                dataFim: "",
                status: "",
                valorArrecadado: 0,
                cliente: {
                    nome: "",
                    email: "",
                    telefone: ""
                }
            });
            buscarProjetos(userData.idUsuario);
            alert("Projeto cadastrado com sucesso");
            setShowCadastrar(false)
        } else {
            alert("Erro ao cadastrar projeto", res);
        }
    }
    async function editarProjeto() {
        const payload = {
            ...novoProjeto,
            idProjeto: idProjetoEditando,
            idUsuario: userData.idUsuario,
            cliente: novoProjeto.cliente?.nome ? novoProjeto.cliente : null
        };

        const res = await fetch(`${API_URL}/projeto/editarProjeto/${idProjetoEditando}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert("Projeto editado com sucesso!");
            setShowCadastrar(false);
            setModoEdicao(false);
            setIdProjetoEditando(null);
            setNovoProjeto({
                nome: "",
                descricao: "",
                dataInicio: "",
                dataFim: "",
                status: "",
                valorArrecadado: 0,
                cliente: {
                    nome: "",
                    email: "",
                    telefone: ""
                }
            });
            buscarProjetos(userData.idUsuario);
        } else {
            alert("Erro ao editar projeto");
        }
    }


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
                <h1 className="text-center mb-4">PROJETOS</h1>

                <div className="row gx-3 gy-4">
                    {projetos.map((projeto) => (
                        <div className="col-md-6" key={projeto.idProjeto}>
                            <div className="p-3 border bg-white shadow">
                                <h4>{projeto.nome}</h4>
                                <p>{projeto.descricao}</p>
                                <p>Status: {projeto.status}</p>
                                <p>Data Início: {new Date(projeto.dataInicio).toLocaleDateString('pt-BR')}</p>
                                <p>Data Fim: {new Date(projeto.dataFim).toLocaleDateString('pt-BR')}</p>
                                <p>Valor Arrecadado: R$ {projeto.valorArrecadado}</p>
                                {projeto.cliente && (
                                    <div>
                                        <strong>Cliente:</strong>
                                        <p>Nome: {projeto.cliente.nome}</p>
                                        <p>Email: {projeto.cliente.email}</p>
                                        <p>Telefone: {projeto.cliente.telefone}</p>
                                    </div>
                                )}
                                <div className="p-3 border bg-white shadow">
                                    <Button variant="info" onClick={() => setShowTarefasProjeto(projeto.idProjeto)}>Tarefas</Button>
                                    <Button
                                        variant="warning"
                                        onClick={() => {
                                            setNovoProjeto({
                                                ...projeto,
                                                cliente: projeto.cliente || {
                                                    nome: "",
                                                    email: "",
                                                    telefone: ""
                                                }
                                            });
                                            setModoEdicao(true);
                                            setIdProjetoEditando(projeto.idProjeto);
                                            setShowCadastrar(true);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => excluirProjeto(projeto.idProjeto)}>Excluir</Button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="col-md-12 text-center">
                        <Button variant="primary" onClick={() => setShowCadastrar(true)}>Cadastrar Projeto</Button>
                    </div>
                </div>

                {/* MODAIS */}


                <Modal show={showCadastrar} onHide={() => {
                    setShowCadastrar(false);
                    setModoEdicao(false);
                    setIdProjetoEditando(null);
                    setNovoProjeto({
                        nome: "",
                        descricao: "",
                        dataInicio: "",
                        dataFim: "",
                        status: "",
                        valorArrecadado: 0,
                        cliente: {
                            nome: "",
                            email: "",
                            telefone: ""
                        }
                    });
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastrar Projeto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={novoProjeto.nome} onChange={(e) => setNovoProjeto({ ...novoProjeto, nome: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" value={novoProjeto.descricao} onChange={(e) => setNovoProjeto({ ...novoProjeto, descricao: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Data Início</Form.Label>
                                <Form.Control type="date" value={novoProjeto.dataInicio} onChange={(e) => setNovoProjeto({ ...novoProjeto, dataInicio: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Data Fim</Form.Label>
                                <Form.Control type="date" value={novoProjeto.dataFim} onChange={(e) => setNovoProjeto({ ...novoProjeto, dataFim: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" value={novoProjeto.status} onChange={(e) => setNovoProjeto({ ...novoProjeto, status: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Valor Arrecadado</Form.Label>
                                <Form.Control type="number" value={novoProjeto.valorArrecadado} onChange={(e) => setNovoProjeto({ ...novoProjeto, valorArrecadado: parseFloat(e.target.value) })} />
                            </Form.Group>
                            <hr />
                            <h6>Cliente (Opcional)</h6>
                            <Form.Group className="mb-2">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={novoProjeto.cliente.nome} onChange={(e) => setNovoProjeto({ ...novoProjeto, cliente: { ...novoProjeto.cliente, nome: e.target.value } })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={novoProjeto.cliente.email} onChange={(e) => setNovoProjeto({ ...novoProjeto, cliente: { ...novoProjeto.cliente, email: e.target.value } })} />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Telefone</Form.Label>
                                <Form.Control type="text" value={novoProjeto.cliente.telefone} onChange={(e) => {
                                    const telefoneFormatado = formatarTelefone(e.target.value);
                                    setNovoProjeto({
                                        ...novoProjeto,
                                        cliente: {
                                            ...novoProjeto.cliente,
                                            telefone: telefoneFormatado,
                                        },
                                    });
                                }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => modoEdicao ? editarProjeto() : cadastrarProjeto()}>
                            {modoEdicao ? "Salvar Alterações" : "Salvar"}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowCadastrar(false)}>Cancelar</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={!!showTarefasProjeto} onHide={() => setShowTarefasProjeto(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tarefas do Projeto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Listar tarefas do projeto, cada uma com editar, excluir, e botão de adicionar tarefa */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary">Adicionar Tarefa</Button>
                        <Button variant="secondary" onClick={() => setShowTarefasProjeto(null)}>Fechar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
