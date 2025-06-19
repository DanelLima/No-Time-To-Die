import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const navigate = useNavigate();

    const formatarTelefone = (valor) => {
        valor = valor.replace(/\D/g, "");
        valor = valor.replace(/^(\d{2})(\d)/g, "($1) $2");
        valor = valor.replace(/(\d)(\d{4})$/, "$1-$2");
        return valor;
    };

    const handleTelefoneChange = (e) => {
        setTelefone(formatarTelefone(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/usuario/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, nome, senha, telefone })
            });

            if (!response.ok) {
                throw new Error("Falha ao cadastrar");
            }

            const data = await response.json();
            console.log(data);
            navigate("/");
        } catch (err) {
            alert("Falha ao cadastrar!");
            console.error(err);
        }
    };

    return (
        <div className="d-flex min-vh-100 align-items-center justify-content-center bg-blue">
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm w-25">
                <h1 className="text-center mb-1">NO TIME TO DIE</h1><br /><br />
                <h3 className="text-center mb-4">Cadastro de Usuário</h3>

                <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Senha</label>
                    <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} className="form-control" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirmar Senha</label>
                    <input type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} className="form-control" required />
                </div>

                <div className="mb-4">
                    <label className="form-label">Telefone</label>
                    <input type="text" value={telefone} onChange={handleTelefoneChange} className="form-control" required />
                </div>

                <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
                <div className="text-center mt-3">
                    <span>Já tenho uma conta! </span>
                    <Link to="/"  className="text-primary text-decoration-none fw-bold">
                        Fazer Login
                    </Link>
                </div>
            </form>
        </div>
    );
}
