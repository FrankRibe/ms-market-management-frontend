import { useEffect, useState } from "react";
import api from "../../services/api";
import "./indexL.css";

function DeletarProduto() {
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        buscarProdutos();
    }, []);

    async function buscarProdutos() {
        const token = localStorage.getItem('token');
        const response = await api.get('/listar-Products', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProdutos(response.data.products);
    }

    async function deletarProduto(id) {
        const confirmar = window.confirm("Tem certeza que deseja deletar este produto?");
        if (!confirmar) return;

        const token = localStorage.getItem('token');
        await api.delete(`/deletar-Products/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        buscarProdutos();
    }

    return (
        <div className="container">
            <h2>Deletar Produto</h2>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <p>{produto.name} - R$ {produto.preco}</p>
                        <button onClick={() => deletarProduto(produto.id)} className="danger">Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeletarProduto;
