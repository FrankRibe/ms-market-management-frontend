import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./listarproduto.css";
// imports necessários para o funcionamento da listagem de produtos

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  // Estado para controlar o loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error.response?.data || error.message);
        alert("Erro ao carregar produtos.");
      } finally {
        setLoading(false); // Finaliza o loading
      }
    }

    fetchProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (produtos.length === 0) return <p>Nenhum produto cadastrado.</p>;

  return (
    <div className="container-listarproduto">
      <h2>Produtos Cadastrados</h2>
      <div className="produto-lista">
        {/* Ordena os produtos do mais antigo para o mais novo e exibe cada um em um card */}
      {produtos
        .slice()
        .sort((a, b) => a.id - b.id) // Ordena do mais antigo para o mais novo
        .map((produto) => (
          <div key={produto.id} className="produto-card">
            <h3>{produto.name}</h3>
            <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
            <p><strong>Quantidade:</strong> {produto.quantidade}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={produto.status ? "status-ativo" : "status-inativo"}>
                {produto.status ? "Ativo" : "Inativo"}
              </span>
            </p>
            {produto.imagem_url && 
            <img
              src={produto.imagem_url}
              alt={produto.name}
              className="produto-imagem" />}
            <p>{produto.observacoes}</p>
          </div>
        ))}
      </div>
      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default ListarProdutos;