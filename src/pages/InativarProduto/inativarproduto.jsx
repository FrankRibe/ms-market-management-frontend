import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./inativarproduto.css";
import { Link } from "react-router-dom";

function InativarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [buscaId, setBuscaId] = useState("");

  useEffect(() => {
    if (buscaId) {
      buscarProdutoPorId(buscaId);
    } else {
      buscarProdutos(); // lista os ativos
    }
  }, [buscaId]);

  async function buscarProdutos() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/products/listar", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao buscar produtos.");
    }
  }

  async function buscarProdutoPorId(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos([response.data]); // mesmo inativo, exibe
    } catch (error) {
      console.error("Erro ao buscar produto por ID:", error);
      alert("Produto não encontrado.");
      setProdutos([]); // limpa lista se não encontrar
    }
  }

  async function atualizarStatus(id, statusAtual) {
    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/products/${id}/inactivate`, {
        status: !statusAtual,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (buscaId) {
        buscarProdutoPorId(buscaId); // atualiza produto individual
      } else {
        buscarProdutos(); // atualiza lista geral
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status do produto.");
    }
  }

  return (
    <div className="container">
      <h2>Inativar Produtos</h2>

      <input
        type="text"
        placeholder="Buscar por ID"
        value={buscaId}
        onChange={(e) => setBuscaId(e.target.value)}
        className="input-busca"
      />

      <ul className="lista-produtos">
        {produtos.map((produto) => (
          <li key={produto.id} className="produto-card">
            <p><strong>ID:</strong> {produto.id}</p>
            <p><strong>Nome:</strong> {produto.name}</p>
            <p><strong>Status:</strong> {produto.status ? "Ativo" : "Inativo"}</p>

            {produto.status && (
              <button
              onClick={() => atualizarStatus(produto.id, produto.status)}
              className="btn-inativar"
              >
                Inativar
              </button>
            )}
          </li>
        ))}
      </ul>

      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default InativarProduto;
