import { Link } from 'react-router-dom';
import './index.css';
import { useRef, useState } from 'react';
import api from '../../services/api';

function Cadastro() {
    const nameRef = useRef();
    const cnpjRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState(''); // Estado para armazenar mensagens de erro

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await api.post('/api/sellers/criar', {
                name: nameRef.current.value,
                cnpj: cnpjRef.current.value,
                email: emailRef.current.value,
                phone: phoneRef.current.value,
                password: passwordRef.current.value,
            });
            alert('Cadastro realizado com sucesso!');
            setErrorMessage(''); // Limpa mensagens de erro após sucesso

            // Limpa os campos do formulário
            nameRef.current.value = '';
            cnpjRef.current.value = '';
            emailRef.current.value = '';
            phoneRef.current.value = '';
            passwordRef.current.value = '';
        } catch (error) {
            // Verifica se há uma resposta do backend
            if (error.response && error.response.data && error.response.data.erro) {
                setErrorMessage(error.response.data.erro); // Define a mensagem de erro do backend
            } else {
                setErrorMessage('Erro ao cadastrar, tente novamente!'); // Mensagem genérica
            }
        }
    }

    return (
        <div className="container">
            <h1 className="container">Cadastro de Vendedores</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Exibe a mensagem de erro */}
            <form onSubmit={handleSubmit}>
                <input ref={nameRef} type="text" placeholder="Nome" />
                <input ref={cnpjRef} type="text" placeholder="CNPJ" />
                <input ref={emailRef} type="email" placeholder="Email" />
                <input ref={phoneRef} type="tel" placeholder="Telefone (+55XXXXXXXXXXX)" />
                <input ref={passwordRef} type="password" placeholder="Senha" />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/login">Já tem uma conta? Faça login</Link>
        </div>
    );
}

export default Cadastro;