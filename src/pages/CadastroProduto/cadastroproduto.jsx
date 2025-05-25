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

        try {
            const token = localStorage.getItem("token");
            const seller_id = 1;

            const response = await api.post(
                "/api/products/criar",
                {
                    name: nameRef.current.value,
                    preco: parseFloat(precoRef.current.value.replace(",", ".")),
                    quantidade: parseInt(quantidadeRef.current.value),
                    status: statusRef.current.value.toLowerCase() === "ativo",
                    imagem_url: imagemRef.current.value,
                    seller_id: seller_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const desejaAdicionarMais = window.confirm(
                "Produto cadastrado com sucesso!\n\nDeseja adicionar mais um produto? Clique em OK para continuar ou Cancelar para voltar ao painel."
            );

            if (desejaAdicionarMais) {
                nameRef.current.value = "";
                precoRef.current.value = "";
                quantidadeRef.current.value = "";
                statusRef.current.value = "";
                imagemRef.current.value = "";
                observacoesRef.current.value = "";
            } else {
                navigate("/painel");
            }

        } catch (err) {
            console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
            alert("Erro ao tentar cadastrar novo produto. Verifique os dados e tente novamente.");
        }
    }

    return (
        <div id="cadastro-produto-container">
            <h2>Cadastro de Produto</h2>
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} placeholder="Nome do produto" type="text" required />
                <input ref={precoRef} placeholder="Preço" type="text" required />
                <input ref={quantidadeRef} placeholder="Quantidade" type="number" required />
                <input ref={statusRef} placeholder="Status (Ativo/Inativo)" type="text" required />
                <input ref={imagemRef} placeholder="URL da imagem" type="url" />
                <textarea ref={observacoesRef} placeholder="Observações" />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/painel">Voltar ao painel</Link>
        </div>
    );
}

export default CadastroProduto;
