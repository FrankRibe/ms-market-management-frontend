import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./vendas.css";

function Vendas() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState("");
  // Estado para armazenar o produto selecionado e a quantidade a ser vendida

  // Busca os produtos ao montar o componente
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
        alert("Erro ao carregar produtos para venda.");
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  // Atualiza o produto selecionado ao mudar o select
  function handleSelectChange(event) {
    const produto = produtos.find(
      (item) => item.id.toString() === event.target.value
    );
    setProdutoSelecionado(produto || null);
    setQuantidade("");
  }

  const handleVenda = async () => {
    if (!produtoSelecionado) {
      alert("Selecione um produto.");
      return;
    }
    if (!quantidade.trim()) {
      alert("Informe a quantidade.");
      return;
    }
    const quantidadeNumber = parseInt(quantidade);
    if (isNaN(quantidadeNumber) || quantidadeNumber <= 0) {
      alert("Quantidade deve ser um número válido e maior que zero.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // Envia os dados da venda para a API
      const response = await api.post(
        "/api/sales",
        {
          produtoId: produtoSelecionado.id,
          quantidade: quantidadeNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const continuar = window.confirm(
        `Venda cadastrada com sucesso!
Produto: ${response.data.product_name}
Quantidade: ${response.data.quantidade_vendida}
Deseja vender outro produto?
Clique em OK para continuar vendendo ou Cancelar para voltar ao painel.`
      );
      if (continuar) {
        window.location.reload();
      } else {
        navigate("/painel");
      }
    } catch (error) {
      alert("Erro ao registrar venda.");
    }
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (produtos.length === 0) return <p>Nenhum produto disponível para venda.</p>;

  return (
    <div className="container-vendas" style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Registrar Venda</h2>

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
        <div className="form-venda">
          <div className="info-linha">
            <p className="info-balao"><strong>ID:</strong> {produtoSelecionado.id}</p>
            <p className="info-balao"><strong>Status:</strong> {produtoSelecionado.status ? "Ativo" : "Inativo"}</p>
          </div>

          <label>Nome:</label>
          <input
            type="text"
            value={produtoSelecionado.name}
            disabled
          />

          {produtoSelecionado.imagem_url && (
            <img
              src={produtoSelecionado.imagem_url}
              alt="Imagem"
              className="produto-imagem"
              style={{ maxWidth: "100%", marginBottom: "10px", borderRadius: "5px" }}
            />
          )}

          <label>Preço:</label>
          <input
            type="text"
            value={`R$ ${Number(produtoSelecionado.preco).toFixed(2)}`}
            disabled
          />

          <label>Quantidade em estoque:</label>
          <input
            type="text"
            value={produtoSelecionado.quantidade}
            disabled
          />

          <label>Quantidade para vender:</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />

          <button onClick={handleVenda} className="btn-salvar">Registrar Venda</button>
        </div>
      )}

      <Link to="/painel" style={{ display: "block", marginTop: "20px", textAlign: "center" }}>
        Voltar ao painel
      </Link>
    </div>
  );
}

export default Vendas;