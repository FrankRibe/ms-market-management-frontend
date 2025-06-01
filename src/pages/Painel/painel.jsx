import { useNavigate } from 'react-router-dom';
import './painel.css';

function Painel() {
  const navigate = useNavigate();

  return (
    <div className="painel-container">
      <h1>Painel de Controle</h1>
      <p></p>
      <div className="button-group">
        <button className="button" onClick={() => navigate('/produtos/criar')}>
          Criar Produto
        </button>
        <button className="button" onClick={() => navigate('/produtos/listar')}>
          Listar Produtos
        </button>
        <button className="button" onClick={() => navigate('/produtos/editar')}>
          Editar Produto
        </button>
        <button className="button" onClick={() => navigate('/produtos/inativar')}>
          Inativar Produto
        </button>
        <button className="button" onClick={() => navigate('/produtos/ativar')}>
          Ativar Produto
        </button>
        <button className="button" onClick={() => navigate('/vendas')}>
          Vender Produtos
        </button>
      </div>

      <button
        className="link-button"
        onClick={() => navigate('/')}
        type="button"
      >
        Voltar para a Home
      </button>
    </div>
  );
}

export default Painel;
