import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cadastro from "./src/pages/Cadastro";
import Login from "./src/pages/login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;