import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from '../../services/api'
import './login.css';


function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const { data: token } = await api.post('/login', {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });


            localStorage.setItem('token', token)
        
            navigate('/lista-products')

        }   catch (err) {
            alert("Informação incorreta.")
        }
    }

    return (
        <div className= "container">
            <h2> Login </h2>
            <form onSubmit={handleSubmit}>
                <input ref={emailRef} placeholder="Email" type="email"  />
                <input ref={passwordRef} placeholder="Senha" type="password" />

                <button type= "submit"> Login </ button>
            </form>
            <Link to="/"> Não tem uma conta? Cadastre-se.</Link>
        </div>
    )

}

export default Login
