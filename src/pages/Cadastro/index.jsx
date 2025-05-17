import { Link } from 'react-router-dom';
import './index.css';
import { useRef } from 'react';
import api from '../../services/api';

function Cadastro() {
    const nameRef = useRef();
    const cnpjRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();

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
        } catch (error) {
            alert('Erro ao cadastrar, tente novamente!');
        }
    }

    return (
        <div className="container">
            <h1 className="container">Cadastro de Vendedores</h1>
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