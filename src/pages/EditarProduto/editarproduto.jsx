import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./editarproduto.css";
import { Link } from "react-router-dom";

function EditarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [buscaId, setBuscaId] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

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

  function buscarProdutoPorId() {
    const produto = produtos.find(
      (item) => item.id.toString() === buscaId.trim()
    );
    if (!produto) {
      alert("Produto não encontrado!");
      return;
    }
    setProdutoSelecionado({ ...produto });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setProdutoSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function salvarEdicao() {
    try {
      const token = localStorage.getItem("token");
      const { id, name, image, preco, quantidade } = produtoSelecionado;
      await api.put(`/api/products/atualizar/${id}`, {
        name,
        image,
        preco,
        quantidade,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Produto atualizado com sucesso!");
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao salvar alterações.");
    }
  }

  return (
    <div className="container">
      <h2>Editar Produto</h2>

      <input
        type="text"
        placeholder="Digite o ID do produto"
        value={buscaId}
        onChange={(e) => setBuscaId(e.target.value)}
        className="input-busca"
      />
      <button onClick={buscarProdutoPorId} className="btn-buscar">
        Buscar
      </button>

      {produtoSelecionado && (
        <div className="form-edicao">
          <p><strong>ID:</strong> {produtoSelecionado.id}</p>
          <p><strong>Status:</strong> {produtoSelecionado.status ? "Ativo" : "Inativo"}</p>

          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={produtoSelecionado.name}
            onChange={handleChange}
          />

          <label>Imagem (URL):</label>
          <input
            type="text"
            name="image"
            value={produtoSelecionado.image}
            onChange={handleChange}
          />

          <label>Preço:</label>
          <input
            type="number"
            name="preco"
            value={produtoSelecionado.preco}
            onChange={handleChange}
          />

          <label>Quantidade:</label>
          <input
            type="number"
            name="quantidade"
            value={produtoSelecionado.quantidade}
            onChange={handleChange}
          />

          <button onClick={salvarEdicao} className="btn-salvar">Salvar Alterações</button>
        </div>
      )}

      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default EditarProduto;
