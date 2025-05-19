import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home";
import Cadastro from "./src/pages/Cadastro";
import Login from "./src/pages/Login";
import Products from "./src/pages/Products";
import List_Products from "./src/pages/List_Products";
import Update_Products from "./src/pages/Update_Products";
import Delete_Products from "./src/pages/Delete_Products";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sellers" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Products />} />
                <Route path="/list" element={<List_Products />} />
                <Route path="/delete" element={<Delete_Products />} />
                <Route path="/update" element={<Update_Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
