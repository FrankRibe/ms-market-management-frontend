import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./src/pages/Cadastro/cadastro";
import Login from "./src/pages/Login/login";
import Ativacao from "./src/pages/Ativacao/ativacao";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cadastro />} />
                <Route path="/ativacao" element={<Ativacao />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;