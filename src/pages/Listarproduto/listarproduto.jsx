import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import api from "../../services/api";

function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await api.get("/api/products");
        setProdutos(response.data.products || []);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error.response?.data || error.message);
        alert("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  if (produtos.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <div>
      <h2>Meus Produtos</h2>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            <strong>{produto.name}</strong> - R$ {produto.preco.toFixed(2)} - Quantidade: {produto.quantidade}
            <br />
            Status: {produto.status}
            <br />
            {produto.imagem && <img src={produto.imagem} alt={produto.name} width="100" />}
            <p>{produto.observacoes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarProdutos;
