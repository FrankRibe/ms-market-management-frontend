import { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import Select from 'react-select';


function Vendas() {
    const quantidadeRef = useRef();
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [produtoId, setProdutoId] = useState("");

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/api/products", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProdutos(response.data);
                if (response.data.length > 0) {
                    setProdutoId(response.data[0].id);
                }
            } catch (err) {
                alert("Erro ao carregar produtos para venda.");
            }
        }
        fetchProdutos();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const quantidade = quantidadeRef.current.value.trim();

        if (!produtoId || !quantidade) {
            alert("Produto e quantidade são obrigatórios.");
            return;
        }

        const quantidadeNumber = parseInt(quantidade);

        if (isNaN(quantidadeNumber) || quantidadeNumber <= 0) {
            alert("Quantidade deve ser um número válido e maior que zero.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await api.post(
                "/api/sales",
                {
                    produtoId: produtoId,
                    quantidade: quantidadeNumber,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert(`Venda realizada com sucesso!\nProduto: ${response.data.product_name}\nQuantidade: ${response.data.quantidade_vendida}`);
            navigate("/painel");
        } catch (err) {
            const erro = err.response?.data?.erro || "Erro ao tentar registrar venda.";
            alert(erro);
        }
    }

    return (
        <div id="cadastro-venda-container">
            <h2>Registrar Venda</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={produtoId}
                    onChange={e => setProdutoId(e.target.value)}
                    required
                >
                    {produtos.length === 0 && <option value="">Nenhum produto disponível</option>}
                    {produtos.map(produto => (
                        <option key={produto.id} value={produto.id}>
                            {produto.name} (ID: {produto.id})
                        </option>
                    ))}
                </select>
                <input ref={quantidadeRef} placeholder="Quantidade" type="number" min="1" required />
                <button type="submit">Registrar Venda</button>
            </form>
            <Link to="/painel">Voltar ao painel</Link>
        </div>
    );
}

export default Vendas;