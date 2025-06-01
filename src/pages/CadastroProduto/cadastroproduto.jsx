import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./cadastroproduto.css";
// imports necessários para o funcionamento do cadastro de produtos

function CadastroProduto() {
  const nameRef = useRef();
  const precoRef = useRef();
  const quantidadeRef = useRef();
  const imagemRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); // Evita o recarregamento da página

    try {
      const token = localStorage.getItem("token");

    // Pega o token salvo


      const response = await api.post(
        "/api/products/criar",
        {
          name: nameRef.current.value,
          preco: parseFloat(precoRef.current.value.replace(",", ".")), // Converte preço para float
          quantidade: parseInt(quantidadeRef.current.value), // Converte quantidade para inteiro
          imagem_url: imagemRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Pergunta ao usuário se deseja cadastrar outro produto
      const desejaAdicionarMais = window.confirm(
        "Produto cadastrado com sucesso!\n\nDeseja adicionar mais um produto? Clique em OK para continuar ou Cancelar para voltar ao painel."
      );

      if (desejaAdicionarMais) {
        nameRef.current.value = "";
        precoRef.current.value = "";
        quantidadeRef.current.value = "";
        imagemRef.current.value = "";
      } else {
        navigate("/painel");
      }
    } catch (err) {
      console.error("Erro ao cadastrar produto:", err.response?.data || err.message);
      alert("Erro ao tentar cadastrar novo produto. Verifique os dados e tente novamente.");
    }
  }

  return (
    <div id="cadastro-produto-container">
      <h2>Cadastro de Produto</h2>
      <form onSubmit={handleSubmit}>
        <input ref={nameRef} placeholder="Nome do produto" type="text" required />
        <input ref={precoRef} placeholder="Preço" type="text" required />
        <input ref={quantidadeRef} placeholder="Quantidade" type="number" required />
        <input ref={imagemRef} placeholder="URL da imagem" type="url" />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default CadastroProduto;
