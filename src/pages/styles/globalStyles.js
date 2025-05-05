import { createGlobalStyle } from "styled-components";

const MyGlobalStyles = createGlobalStyle` 
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        font-family: 'Poppins', sans-serif;
        background-color: #000; /* Fundo preto */
        color: #fff; /* Texto branco */
        line-height: 1.6;
        min-height: 100vh;
        width: 100%;
        background: linear-gradient(to bottom, #000, #333); /* Gradiente preto */
    }
    h1, h2, h3, h4, h5, h6 {
        color: #fff; /* Títulos em branco */
        margin-bottom: 1rem;
    }
    p {
        color: #ccc; /* Texto secundário em cinza claro */
        margin-bottom: 1rem;
    }
    a {
        color: #fff;
        text-decoration: none;
        transition: color 0.3s ease;
    }
    a:hover {
        color: #ccc; /* Efeito hover em cinza claro */
    }
    button {
        background-color: #fff; /* Botão branco */
        color: #000; /* Texto preto */
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease, color 0.3s ease;
    }
    button:hover {
        background-color: #ccc; /* Botão cinza claro no hover */
        color: #000;
    }
    input, textarea {
        background-color: #333; /* Fundo cinza escuro */
        color: #fff; /* Texto branco */
        border: 1px solid #555; /* Borda cinza */
        padding: 10px;
        border-radius: 5px;
        width: 100%;
        margin-bottom: 1rem;
    }
    input::placeholder, textarea::placeholder {
        color: #aaa; /* Placeholder em cinza claro */
    }
    input:focus, textarea:focus {
        outline: none;
        border-color: #fff; /* Borda branca no foco */
    }
`;

export default MyGlobalStyles;