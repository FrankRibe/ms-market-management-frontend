import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyGlobalStyles from "./src/pages/styles/globalStyles";
import Home from "./src/pages/Home/home";
import Cadastro from "./src/pages/Cadastro/cadastro";
import Login from "./src/pages/Login/login";
import Ativacao from "./src/pages/Ativacao/ativacao";
import Painel from "./src/pages/Painel/painel"; 
import CadastroProduto from './src/pages/CadastroProduto/cadastroproduto';
import ListarProdutos from "./src/pages/Listarproduto/listarproduto";
import EditarProduto from "./src/pages/EditarProduto/editarproduto";
import InativarProduto from "./src/pages/InativarProduto/inativarproduto";
import Vendas from "./src/pages/Vendas/vendas";
import AtivarProduto from "./src/pages/AtivarProduto/ativarProduto";


function App() {
    return (
        <>
        
        <MyGlobalStyles />
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
                <Route path="/produtos/inativar" element={<InativarProduto />} />
                <Route path="/produtos/ativar" element={<AtivarProduto />} />
                <Route path="/vendas" element={<Vendas />} />
            </Routes>
        </BrowserRouter>
        </>
    );
}

export default App;
