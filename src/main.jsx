import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../app';
import MyGlobalStyles from './pages/styles/globalStyles';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MyGlobalStyles />
    <App /> {/* Apenas o App deve ser renderizado aqui */}
  </React.StrictMode>,
);