import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./listarproduto.css";

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/api/products/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProdutos(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error.response?.data || error.message);
        alert("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (produtos.length === 0) return <p>Nenhum produto cadastrado.</p>;

  return (
    <div className="container">
      <h2>Produtos Cadastrados</h2>

      {produtos.map((produto) => (
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

      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default ListarProdutos;
