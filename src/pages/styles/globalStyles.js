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
        background-color: #18181c; /* Preto/cinza escuro */
        color: #f5f5f5;
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    /* Tipografia */
    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
        font-weight: bold;
        color: #8a8aff; /* Roxo claro */
    }

    p {
        margin-bottom: 1rem;
    }

    /* Links */
    a {
        color: #8a8aff; /* Roxo claro */
        text-decoration: underline;
        transition: color 0.2s;
    }

    a:hover {
        color: #fff;
    }

    a:focus {
        outline: 2px dashed #8a8aff;
        outline-offset: 2px;
    }

    /* Botões */
    button {
        background-color: #8a8aff;
        color: #fff;
        border: none;
        padding: 10px 15px;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        transition: background-color 0.2s, transform 0.1s;
    }

    button:hover {
        background-color: #5a5ad6;
        transform: scale(1.02);
    }

    button:focus {
        outline: 2px dashed #8a8aff;
        outline-offset: 2px;
    }

    /* Inputs e Textareas */
    input, textarea, select {
        border: 1px solid #333;
        padding: 0.45rem 0.7rem;
        border-radius: 6px;
        width: 100%;
        margin-bottom: 1rem;
        background-color: #23232b;
        color: #f5f5f5;
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;
    }

    input[disabled], textarea[disabled] {
        background: #23232b;
        color: #aaa;
        cursor: not-allowed;
    }

    input::placeholder, textarea::placeholder {
        color: #888;
    }

    input:focus, textarea:focus, select:focus {
        outline: none;
        border-color: #8a8aff;
        box-shadow: 0 0 5px rgba(138, 138, 255, 0.3);
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
        border: 1px solid #333;
        padding: 10px;
        text-align: left;
    }

    th {
        background-color: #23232b;
        color: #8a8aff;
    }
`;

export default MyGlobalStyles;