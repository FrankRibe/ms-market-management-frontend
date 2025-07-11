import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';
import './login.css';
import Painel from "../Painel/painel";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagem de sucesso

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await api.post('/api/auth/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });
                                            
            console.log("Resposta do login:", response.data);

            const token = response.data.access_token;
            localStorage.setItem('token', token);

            
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setSuccessMessage("Login efetuado com sucesso!");
            navigate('/painel');
        } catch (err) {
            alert("E-mail ou Senha inválidos.");
        }
    }

    return (
        <div className="container">
            <h2>Login</h2>
            { }
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Senha" type="password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/">Não tem uma conta? Cadastre-se.</Link>
        </div>
    );
}

export default Login;

