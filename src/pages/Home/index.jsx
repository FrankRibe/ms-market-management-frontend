import { useNavigate } from 'react-router-dom';
import './home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <h1>Bem-vindo à plataforma do <span className="highlight">Mercado X</span>!</h1>
            <p>Escolha uma das opções abaixo para continuar:</p>
            <div className="button-group">
                <button className="button" onClick={() => navigate('/cadastro-seller')}>
                    Cadastrar Seller
                </button>
                <button className="button" onClick={() => navigate('/login')}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Home
