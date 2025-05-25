import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home/home";
import Cadastro from "./src/pages/Cadastro/cadastro";
import Login from "./src/pages/Login/login";
import Ativacao from "./src/pages/Ativacao/ativacao";
import Painel from "./src/pages/Painel/painel";  // importa a página Painel
import CriarProduto from "./src/pages/Cadastroproduto/cadastroproduto";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro-seller" element={<Cadastro />} />
                <Route path="/ativacao" element={<Ativacao />} />
                <Route path="/login" element={<Login />} />
                <Route path="/painel" element={<Painel />} /> 
                <Route path="/produtos/criar" element={<CriarProduto />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
