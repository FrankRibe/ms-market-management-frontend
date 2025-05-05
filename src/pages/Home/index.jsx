import React from 'react';
import Trash from '../../assets/trash.svg';
import './index.css';

function Home() {

    const users = [
        {
            id: 1,
            name: 'Fulano',
            email: 'teste@email.com',
            phone: '(11) 99999-9999',
        },
        {
            id: 2,
            name: 'Ciclano',
            email: 'teste@email.com',
            phone: '(11) 99999-9999',
        },
    ];

    return (
        <div className="container">
            <form>
                <h1>Cadastro de usuários</h1>

                <input type="text" placeholder="Nome" name="name" />
                <input type="email" placeholder="Email" name="email" />
                <input type="tel" placeholder="Telefone" name="phone" />
                <input type="password" placeholder="Senha" name="password" />

                <button type="submit">Cadastrar</button>
            </form>

            {users.map(user => (
                <div key={user.id} className="card">
                    <div></div>
                        <p>Nome: <span>{user.name}</span></p>
                        <p>Email: <span>{user.email}</span></p>
                        <p>Telefone: <span>{user.phone}</span></p>
                        <p>Senha: <span>******</span></p>
                        <button>
                            <img src={Trash} alt="Excluir" />
                        </button>
                    </div>
            ))}
        </div>
    );       
}

export default Home;
