import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Menu from "./pages/menu"; 
import Cadastro from "./pages/cadastroUsuario";

function App() {
  return (
    <BrowserRouter basename ="/no-time-to-die">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cadastro" element={<Cadastro />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
