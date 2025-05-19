import { useEffect, useState } from "react";
import api from "../../services/api";
import './index.css';

function AtualizarProduto() {
    const [produtos, setProdutos] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [form, setForm] = useState({ name: "", preco: "", quantidade: "", status: "", imagem: "" });

    useEffect(() => {
        buscarProdutos();
    }, []);

    async function buscarProdutos() {
        const token = localStorage.getItem('token');
        const response = await api.get('/listar-Products', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setProdutos(response.data.products);
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
        const token = localStorage.getItem('token');
        await api.put(`/atualizar-Products/${editandoId}`, form, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setEditandoId(null);
        buscarProdutos();
    }

    return (
        <div className="container">
            <h2>Atualizar Produto</h2>
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <p>{produto.name} - R$ {produto.preco}</p>
                        <button onClick={() => Editar (produto)} className="button">Editar</button>
                    </li>
                ))}
            </ul>

            {editandoId && (
                <form onSubmit={atualizarProduto} className="edit-form">
                    <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nome" />
                    <input value={form.preco} onChange={e => setForm({ ...form, preco: e.target.value })} placeholder="Preço" />
                    <input value={form.quantidade} onChange={e => setForm({ ...form, quantidade: e.target.value })} placeholder="Quantidade" />
                    <input value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} placeholder="Status" />
                    <input
                        value={form.imagem}
                        onChange={e => setForm({ ...form, imagem: e.target.value })}
                        placeholder="Imagem"
                    />

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <button className="button" type="submit">Atualizar Produto</button>
                        <button type="button" className="button button-danger" onClick={() => setEditandoId(null)}>Cancelar</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AtualizarProduto;
