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
        const response = await api.get("/api/products", {
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
      await api.patch(
        `/api/products/${productId}/ativar`,
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
        <label htmlFor="input-produto">ID do Produto:</label>
        <input
          id="input-produto"
          type="text"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          placeholder="Digite o ID do produto"
  />
  <button type="submit" className="btn-ativar">Ativar</button>
</form>
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}
      {erro && <p className="mensagem-erro">{erro}</p>}
        <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default AtivarProduto;