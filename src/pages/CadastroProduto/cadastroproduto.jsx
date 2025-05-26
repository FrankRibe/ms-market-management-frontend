import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";
import "./cadastroproduto.css";

function CadastroProduto() {
  const nameRef = useRef();
  const precoRef = useRef();
  const quantidadeRef = useRef();
  const statusRef = useRef();
  const imagemRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      // O backend espera 'status' como booleano
      const statusBool =
        statusRef.current.value.toLowerCase() === "ativo" ? true : false;

      const response = await api.post(
        "/api/products/criar",
        {
          name: nameRef.current.value,
          preco: parseFloat(precoRef.current.value.replace(",", ".")),
          quantidade: parseInt(quantidadeRef.current.value),
          status: statusBool,
          imagem_url: imagemRef.current.value,
          // seller_id será obtido no backend via JWT, então não envia aqui
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const desejaAdicionarMais = window.confirm(
        "Produto cadastrado com sucesso!\n\nDeseja adicionar mais um produto? Clique em OK para continuar ou Cancelar para voltar ao painel."
      );

      if (desejaAdicionarMais) {
        nameRef.current.value = "";
        precoRef.current.value = "";
        quantidadeRef.current.value = "";
        statusRef.current.value = "";
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
        <input ref={statusRef} placeholder="Status (Ativo/Inativo)" type="text" required />
        <input ref={imagemRef} placeholder="URL da imagem" type="url" />
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/painel">Voltar ao painel</Link>
    </div>
  );
}

export default CadastroProduto;
