import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./ativarProduto.css";

function AtivarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [productId, setProductId] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

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
      } catch {
        setErro("Erro ao carregar produtos.");
      }
    }
    fetchProdutos();
  }, []);

  const handleAtivar = async (e) => {
    e.preventDefault();
    setMensagem("");
    setErro("");
    if (!productId) {
      setErro("Selecione um produto.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/api/products/ativar/${productId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMensagem("Produto ativado com sucesso!");
      setProductId("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.erro) {
        setErro(err.response.data.erro);
      } else {
        setErro("Erro ao ativar produto.");
      }
    }
  };

  return (
    <div className="container-ativar">
      <h2>Ativar Produto</h2>
      <form onSubmit={handleAtivar} className="form-ativar">
        <label htmlFor="select-produto">Selecione o Produto:</label>
        <select
          id="select-produto"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Selecione...</option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.name} (ID: {produto.id})
            </option>
          ))}
        </select>
        <button type="submit" className="btn-ativar">Ativar</button>
      </form>
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default AtivarProduto;