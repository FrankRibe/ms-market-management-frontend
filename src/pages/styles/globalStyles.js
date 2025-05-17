import { createGlobalStyle } from "styled-components";

const MyGlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
     font-family: Arial, sans-serif;
        background-color: #1a1a1a; /* Preto mais claro */
    color: #f5f5f5; /* Texto claro */
    line-height: 1.5;
}
    h1, h2, h3, h4, h5, h6 {
        margin-bottom: 1rem;
    }
    p {
        margin-bottom: 1rem;
    }
    a {
        color: #007bff; /* Azul */
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    button {
        background-color: #007bff; /* Azul */
        color: #fff; /* Texto branco */
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
    }
    button:hover {
        background-color: #0056b3; /* Azul mais escuro */
    }
    input, textarea {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 5px;
        width: 100%;
        margin-bottom: 1rem;
    }
    input:focus, textarea:focus {
        outline: none;
        border-color: #007bff; /* Azul no foco */
    }
`;

export default MyGlobalStyles;