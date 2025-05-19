import { useEffect, useState } from "react"
import api from "../../services/api"
import './list.css' // arquivo CSS específico para essa página/componente


function List_Products() {
    const [allProducts, setProducts] = useState()

    useEffect(() => {
        async function loadProducts() {

            const token = localStorage.getItem('token')
            const { data: { products }, } = await api.get('/listar-Products', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })

            setProducts(products)
        }

        loadProducts()
    }, [])

    return (
        <div className="container">    
            <h2>Lista de Produtos </h2>
            <ul className="product-list">
                {allProducts && allProducts.length > 0 && allProducts.map ((products) => (
                    <li key={products.id} className="product-item">
                        <p className="product-info">ID: {products.id}</p>
                        <p className="product-info">Produto: {products.name}</p>
                        <p className="product-info">Preço: {products.preco}</p>
                        <p className="product-info">Quantidade: {products.quantidade}</p>
                        <p className="product-info">Status: {products.status}</p>
                        <img
                            src={products.imagem}
                            alt={`Imagem do produto ${products.name}`}
                            className="product-image"
                        />
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default List_Products

//Certifique-se de que products.imagem contenha uma URL válida da imagem (ex: http://localhost:3000/static/img123.jpg).
//Se estiver usando Flask no backend, a imagem precisa estar sendo servida estaticamente (ex: via send_from_directory())
                   