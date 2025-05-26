import { useState, } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../services/api";
import "./ativacao.css";

function Ativacao() {
    const [sellerId, setSellerId] = useState("");
    const [activationCode, setActivationCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");
        setError("");

        try {
            // Substitui os placeholders na URL pelos valores reais
            const response = await api.post(`/api/sellers/${sellerId}/activate/${activationCode}`);

            setMessage(response.data.mensagem); // Mensagem de sucesso
            setTimeout(() => {
                navigate('/login'); // Redireciona para a página de login após 3 segundos
            }, 3000);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.erro) {
                setError(err.response.data.erro); // Mensagem de erro do backend
            } else {
                setError("Erro ao ativar o vendedor. Tente novamente.");
            }
        }
    }

    return (
        <div className="container">
            <h1>Ativação de Vendedor</h1>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ID do Vendedor"
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Código de Ativação"
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                />
                <button type="submit">Ativar</button>
            </form>
        </div>
    );
}

export default Ativacao;

