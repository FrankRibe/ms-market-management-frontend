import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home/home";
import Cadastro from "./src/pages/Cadastro/cadastro";
import Login from "./src/pages/Login/login";
import Ativacao from "./src/pages/Ativacao/ativacao";
import Painel from "./src/pages/Painel/painel"; 
import CadastroProduto from './src/pages/CadastroProduto/cadastroproduto';
import ListarProdutos from "./src/pages/Listarproduto/listarproduto";
import EditarProduto from "./src/pages/EditarProduto/editarproduto";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro-seller" element={<Cadastro />} />
                <Route path="/ativacao" element={<Ativacao />} />
                <Route path="/login" element={<Login />} />
                <Route path="/painel" element={<Painel />} /> 
                <Route path="/produtos/criar" element={<CadastroProduto />} />
                <Route path="/produtos/listar" element={<ListarProdutos />} />
                <Route path="/produtos/editar" element={<EditarProduto />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
