import { useEffect, useState } from "react";
import api from "../../services/api";
import './editarproduto.css';

function EditarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    preco: "",
    quantidade: "",
    status: "",
    imagem: ""
  });

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/listar-Products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdutos(response.data.products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  }

  function iniciarEdicao(produto) {
    setEditandoId(produto.id);
    setForm({
      name: produto.name,
      preco: produto.preco,
      quantidade: produto.quantidade,
      status: produto.status,
      imagem: produto.imagem
    });
  }

  async function atualizarProduto(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`/api/products/${editandoId}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditandoId(null);
      buscarProdutos();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  }

  return (
    <div className="container">
      <h2>Atualizar Produto</h2>
      <ul className="product-list">
        {produtos.map((produto) => (
          <li key={produto.id} className="product-item">
            <p>{produto.name} - R$ {produto.preco}</p>
            <button onClick={() => iniciarEdicao(produto)} className="button">Editar</button>
          </li>
        ))}
      </ul>

      {editandoId && (
        <form onSubmit={atualizarProduto} className="edit-form">
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder="Nome"
          />
          <input
            value={form.preco}
            onChange={e => setForm({ ...form, preco: e.target.value })}
            placeholder="Preço"
          />
          <input
            value={form.quantidade}
            onChange={e => setForm({ ...form, quantidade: e.target.value })}
            placeholder="Quantidade"
          />
          <input
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            placeholder="Status"
          />
          <input
            value={form.imagem}
            onChange={e => setForm({ ...form, imagem: e.target.value })}
            placeholder="URL da Imagem"
          />

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "10px" }}>
            <button type="submit" className="button">Atualizar Produto</button>
            <button type="button" className="button button-danger" onClick={() => setEditandoId(null)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditarProduto;
