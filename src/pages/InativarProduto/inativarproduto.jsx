import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./inativarproduto.css"; // você pode criar o CSS ou usar estilos existentes
import { Link } from "react-router-dom";

function InativarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [buscaId, setBuscaId] = useState("");

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/products/listar", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao buscar produtos.");
    }
  }

  async function atualizarStatus(id, statusAtual) {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/api/products/atualizar/${id}`, {
        status: !statusAtual
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      buscarProdutos(); // atualiza lista
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status do produto.");
    }
  }

  const produtosFiltrados = buscaId
    ? produtos.filter(produto => produto.id.toString() === buscaId)
    : produtos;

  return (
    <div className="container">
      <h2>Ativar / Inativar Produtos</h2>

      <input
        type="text"
        placeholder="Buscar por ID"
        value={buscaId}
        onChange={(e) => setBuscaId(e.target.value)}
        className="input-busca"
      />

      <ul className="lista-produtos">
        {produtosFiltrados.map((produto) => (
          <li key={produto.id} className="produto-card">
            <p><strong>ID:</strong> {produto.id}</p>
            <p><strong>Nome:</strong> {produto.name}</p>
            <p><strong>Status:</strong> {produto.status ? "Ativo" : "Inativo"}</p>
            <button
              onClick={() => atualizarStatus(produto.id, produto.status)}
              className={produto.status ? "btn-inativar" : "btn-ativar"}
            >
              {produto.status ? "Inativar" : "Ativar"}
            </button>
          </li>
        ))}
      </ul>

      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default InativarProduto;
