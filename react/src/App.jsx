import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Menu from "./pages/menu"; 
import Cadastro from "./pages/cadastroUsuario";
import Projetos from "./pages/projetos";
import "./style.css"

function App() {
  return (
    <BrowserRouter basename ="/">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastro" element={<Cadastro />}/>
        <Route path="/projetos" element={<Projetos />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
