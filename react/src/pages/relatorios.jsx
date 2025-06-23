import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

export default function Relatorios() {
    const [tipoRelatorio, setTipoRelatorio] = useState("");
    const [periodo, setPeriodo] = useState({ inicio: "", fim: "" });
    const [idUsuario, setIdUsuario] = useState(null);
    const [dadosGrafico, setDadosGrafico] = useState(null);
    const [registrosPonto, setRegistrosPonto] = useState([]);
    const [horasTotais, setHorasTotais] = useState(0);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const relatorioRef = useRef();
    const API_URL = 'http://localhost:3001'

    useEffect(() => {
        setIdUsuario(3);
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

    function formatarDadosParaGrafico(dadosApi) {
        const labels = dadosApi.map((item) => item.dia);
        const tarefas = dadosApi.map((item) => Number(item.tarefasConcluidas));
        const horas = dadosApi.map((item) => Number(item.horasTrabalhadas) || 0);

        return {
            labels,
            datasets: [
                {
                    label: "Horas Trabalhadas",
                    data: horas,
                    borderColor: "blue",
                    backgroundColor: "rgba(0,0,255,0.1)",
                    fill: true,
                },
                {
                    label: "Tarefas Concluídas",
                    data: tarefas,
                    borderColor: "green",
                    backgroundColor: "rgba(0,255,0,0.1)",
                    fill: true,
                },
            ],
        };
    }
    const exportarPDF = () => {
        const opt = {
            margin: 0.5,
            filename: `relatorio-${tipoRelatorio}-${Date.now()}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 3, useCORS: true }, 
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        setTimeout(() => {
            html2pdf().set(opt).from(relatorioRef.current).save();
        }, 300);
    };

    const gerarFolhaDePonto = async () => {
        if (!periodo.inicio || !periodo.fim) {
            setErro("Informe o período inicial e final.");
            return;
        }
        setErro("");
        setLoading(true);
        try {
            const res = await fetch(
                `${API_URL}/relatorios/ponto/${idUsuario}?inicio=${periodo.inicio}&fim=${periodo.fim}`
            );
            if (!res.ok) throw new Error("Erro ao buscar dados da folha de ponto.");
            const dados = await res.json();

            setRegistrosPonto(dados);

            // Calcular horas totais:
            // Para cada dia, emparelhar entrada e saída em sequência
            let totalMs = 0;
            let entradaAnterior = null;

            dados.forEach((registro) => {
                if (registro.entrada) {
                    entradaAnterior = new Date(registro.dataHora);
                } else if (registro.saida && entradaAnterior) {
                    const saida = new Date(registro.dataHora);
                    totalMs += saida - entradaAnterior;
                    entradaAnterior = null;
                }
            });

            setHorasTotais(totalMs / (1000 * 60 * 60)); // converter ms para horas
        } catch (error) {
            setErro(error.message);
            setRegistrosPonto([]);
            setHorasTotais(0);
        }
        setLoading(false);
    };

    async function gerarProdutividade(tipo) {
        setErro("");
        setLoading(true);
        try {
            const res = await fetch(
                `${API_URL}/relatorios/produtividade/${idUsuario}?tipo=${tipo}`
            );
            if (!res.ok) throw new Error("Erro ao buscar dados de produtividade.");
            const dados = await res.json();
            const grafico = formatarDadosParaGrafico(dados);
            setDadosGrafico(grafico);
        } catch (error) {
            setErro(error.message);
        }
        setLoading(false);
    }

    const handleGerarRelatorio = () => {
        if (!tipoRelatorio) {
            setErro("Selecione um tipo de relatório.");
            return;
        }
        setErro("");
        if (tipoRelatorio === "ponto-periodo") {
            gerarFolhaDePonto();
        } else {
            gerarProdutividade(tipoRelatorio.replace("produtividade-", ""));
        }
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
                            <i className="bi bi-clock-history"></i>
                            <span>Pontos</span>
                        </a>
                    </div>

                    <div className="sidebar-footer">
                        <a
                            href="/"
                            onClick={() => {
                                localStorage.clear();
                            }}
                        >
                            <i className="bi bi-box-arrow-left"></i>
                            <span>Logout</span>
                        </a>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="main p-3">
                <h1 className="text-center mb-4">RELATÓRIOS</h1>

                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Relatório</Form.Label>
                        <Form.Select
                            value={tipoRelatorio}
                            onChange={(e) => setTipoRelatorio(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            <option value="ponto-periodo">Folha de ponto (período)</option>
                            <option value="produtividade-geral">Produtividade Geral</option>
                            <option value="produtividade-mes">Produtividade do Mês</option>
                            <option value="produtividade-semana">Produtividade da Semana</option>
                            <option value="produtividade-dia">Produtividade do Dia</option>
                        </Form.Select>
                    </Form.Group>

                    {tipoRelatorio === "ponto-periodo" && (
                        <div className="d-flex gap-2 bg-white">
                            <Form.Group className="mb-3">
                                <Form.Label>Início</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={periodo.inicio}
                                    onChange={(e) =>
                                        setPeriodo({ ...periodo, inicio: e.target.value })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fim</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={periodo.fim}
                                    onChange={(e) =>
                                        setPeriodo({ ...periodo, fim: e.target.value })
                                    }
                                />
                            </Form.Group>
                        </div>
                    )}

                    {erro && (
                        <div className="alert alert-danger mt-3" role="alert">
                            {erro}
                        </div>
                    )}

                    <Button
                        className="mt-3"
                        onClick={handleGerarRelatorio}
                        disabled={loading || !idUsuario}
                    >
                        {loading ? "Gerando..." : "Gerar Relatório"}
                    </Button>
                </Form>
                <div className="mt-5 " id="relatorioRef" ref={relatorioRef}>
                    {tipoRelatorio === "ponto-periodo" && registrosPonto.length > 0 && (
                        <div className="mt-5">
                            <h3>Registros da Folha de Ponto</h3>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Data / Hora</th>
                                        <th>Tipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registrosPonto.map((r) => (
                                        <tr key={r.idPonto}>
                                            <td>{new Date(r.dataHora).toLocaleString()}</td>
                                            <td>{r.entrada ? "Entrada" : r.saida ? "Saída" : "—"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p>
                                <strong>Total de horas trabalhadas no período: </strong>
                                {horasTotais.toFixed(2)} h
                            </p>
                        </div>
                    )}
                    {dadosGrafico && (
                        <div className="mt-5">
                            <h4 className="mb-3">Gráfico de Produtividade</h4>
                            <div
                                style={{
                                    width: "100%",
                                    height: "500px", // altura fixa
                                    overflow: "hidden", // impede que quebre o layout
                                }}
                            >
                                <Line
                                    data={dadosGrafico}
                                    options={{
                                        maintainAspectRatio: false,
                                        responsive: true,
                                        plugins: {
                                            legend: { position: "top" },
                                        },
                                        layout: {
                                            padding: 10,
                                        },
                                    }}
                                />
                            </div>
                        </div>



                    )}
                </div>
                {(tipoRelatorio === "ponto-periodo" && registrosPonto.length > 0) ||
                    (dadosGrafico && tipoRelatorio.startsWith("produtividade")) ? (
                    <Button className="mt-3" onClick={() => exportarPDF()}>
                        Baixar PDF
                    </Button>
                ) : null}
            </div>
        </div>
    );
}
