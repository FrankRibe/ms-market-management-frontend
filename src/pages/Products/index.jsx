import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import api from '../../services/api'
import './index.css';
import { resolveEnvPrefix } from "vite";


function Products() {
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("preco", data.preco)
        formData.append("quantidade", data.quantidade)
        formData.append("status", data.status)
        formData.append("imagem", data.imagem[0]) // Arquivo é array
        formData.append("observacoes", data.observacoes)


        try {
            await api.post('/api/products', formData, {
                headers: {"Content-Type": "multipart/form-data"},
            })
            alert("Produto cadastrado com sucesso!")
            reset()

        }   catch (err) {
            alert("Erro ao tentar cadastrar novo produto.")
        }
    }

    return (
        <div className="container">
            <h2> Cadastro de Produtos</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} placeholder="Nome do produto" type="text" />
            <input {...register("preco")} placeholder="Preço" type="number" step="0.01" />
            <input {...register("quantidade")} placeholder="Quantidade" type="number" />
            <input {...register("status")} placeholder="Status" type="text" />
            <input {...register("imagem")} type="file" accept="image/*" />
            <input {...register("observacoes")} placeholder="Observações" type="text" />


            <button type="submit">Cadastrar</button>      
            </form>
            <Link to="/Login" > O produto já está cadastrado? Volte a pagina inicial.</Link>
        </div>
    )

}

export default Products

//... serve para espalhar propriedades de um objeto.
//register("campo") retorna um objeto com as propriedades que o input precisa.
//...register("campo") coloca essas propriedades no input.

