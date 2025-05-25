import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./cadastroproduto.css";

function CadastroProduto() {
    const nameRef = useRef();
    const precoRef = useRef();
    const quantidadeRef = useRef();
    const statusRef = useRef();
    const imagemRef = useRef();
    const observacoesRef = useRef();
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Você precisa estar logado para cadastrar um produto.");
            navigate("/login");
            return;
        }

        try {
            await api.post(
                "/api/products/criar",
                {
                    name: nameRef.current.value,
                    preco: parseFloat(precoRef.current.value),
                    quantidade: parseInt(quantidadeRef.current.value),
                    status: statusRef.current.value,
                    imagem: imagemRef.current.value,
                    observacoes: observacoesRef.current.value,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Produto cadastrado com sucesso!");
            
            nameRef.current.value = "";
            precoRef.current.value = "";
            quantidadeRef.current.value = "";
            statusRef.current.value = "";
            imagemRef.current.value = "";
            observacoesRef.current.value = "";
        } catch (err) {
            console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
            alert("Erro ao tentar cadastrar novo produto.");
        }
    }

    return (
        <div id="cadastro-produto-container">
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} placeholder="Nome do produto" type="text" required />
                <input ref={precoRef} placeholder="Preço" type="number" step="0.01" required />
                <input ref={quantidadeRef} placeholder="Quantidade" type="number" required />
                <input ref={statusRef} placeholder="Status (ativo/inativo)" type="text" required />
                <input ref={imagemRef} placeholder="URL da imagem" type="url" />
                <textarea ref={observacoesRef} placeholder="Observações" />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/painel">Voltar ao painel</Link>
        </div>
    );
}

export default CadastroProduto;
