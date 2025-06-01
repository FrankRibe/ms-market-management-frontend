import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./editarproduto.css";
import { Link } from "react-router-dom";
// imports necessários para o funcionamento da página de edição de produtos

function EditarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Busca os produtos ao montar o componente
  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos(response.data || []);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao buscar produtos.");
    }
  }

  // Atualiza o produto selecionado ao mudar o select
  function handleSelectChange(event) {
    const produto = produtos.find(
      (item) => item.id.toString() === event.target.value
    );
    setProdutoSelecionado(produto ? { ...produto } : null);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setProdutoSelecionado((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  // Salva as alterações do produto na API
  async function salvarEdicao() {
    try {
      const token = localStorage.getItem("token");
      const { id, name, imagem_url, preco, quantidade } = produtoSelecionado;
      await api.put(`/api/products/atualizar/${id}`, {
        name,
        imagem_url,
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
    <div className="container-editar" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Editar Produto</h2>

      {/* Select para escolher o produto */}
      <label htmlFor="select-produto">Selecione um produto:</label>
      <select
        id="select-produto"
        value={produtoSelecionado ? produtoSelecionado.id : ""}
        onChange={handleSelectChange}
        className="input-busca"
      >
        <option value="">Selecione...</option>
        {produtos.map((produto) => (
          <option key={produto.id} value={produto.id}>
            {produto.name} (ID: {produto.id})
          </option>
        ))}
      </select>

      {produtoSelecionado && (
        <div className="form-edicao">
          <div className="info-linha">
            <p className="info-balao"><strong>ID:</strong> {produtoSelecionado.id}</p>
            <p className="info-balao"><strong>Status:</strong> {produtoSelecionado.status ? "Ativo" : "Inativo"}</p>
          </div>

          <label>Nome:</label>
          <input
            type="text"
            name="name"
            value={produtoSelecionado.name}
            onChange={handleChange}
          />

          {produtoSelecionado.imagem_url && (
            <img
              src={produtoSelecionado.imagem_url}
              alt="Imagem"
              className="produto-imagem"
              style={{ maxWidth: "100%", marginBottom: "10px", borderRadius: "5px" }}
            />
          )}

          <label>Imagem (URL):</label>
          <input
            type="text"
            name="imagem_url"
            value={produtoSelecionado.imagem_url}
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

      <Link to="/painel" style={{ display: "block", marginTop: "20px", textAlign: "center" }}>
        Voltar ao painel
      </Link>
    </div>
  );
}

export default EditarProduto;