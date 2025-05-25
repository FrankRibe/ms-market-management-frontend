import { createGlobalStyle } from "styled-components";

const MyGlobalStyles = createGlobalStyle`
    /* Reset básico */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* Estilos globais */
    body {
        font-family: Arial, sans-serif;
        background-color: #1a1a1a; /* Preto mais claro */
        color: #f5f5f5; /* Texto claro */
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Tipografia */
    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-weight: bold;
    }

    p {
        margin-bottom: 1rem;
    }

    /* Links */
    a {
        color: #007bff; /* Azul */
        text-decoration: none;
        transition: color 0.2s ease-in-out;
    }

    a:hover {
        text-decoration: underline;
    }

    a:focus {
        outline: 2px dashed #007bff; /* Foco acessível */
        outline-offset: 2px;
    }

    /* Botões */
    button {
        background-color: #007bff; /* Azul */
        color: #fff; /* Texto branco */
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s ease-in-out, transform 0.1s ease-in-out;
    }

    button:hover {
        background-color: #0056b3; /* Azul mais escuro */
        transform: scale(1.02); /* Leve aumento no hover */
    }

    button:focus {
        outline: 2px dashed #007bff; /* Foco acessível */
        outline-offset: 2px;
    }

    /* Inputs e Textareas */
    input, textarea {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        width: 100%;
        margin-bottom: 1rem;
        background-color: #2a2a2a; /* Fundo escuro */
        color: #f5f5f5; /* Texto claro */
        transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    input::placeholder, textarea::placeholder {
        color: #888; /* Placeholder em cinza */
    }

    input:focus, textarea:focus {
        outline: none;
        border-color: #007bff; /* Azul no foco */
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Efeito de foco */
    }

    /* Listas */
    ul, ol {
        margin-left: 1.5rem;
        margin-bottom: 1rem;
    }

    li {
        margin-bottom: 0.5rem;
    }

    /* Tabelas */
    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #2a2a2a; /* Fundo escuro */
        color: #f5f5f5; /* Texto claro */
    }
`;

export default MyGlobalStyles;
