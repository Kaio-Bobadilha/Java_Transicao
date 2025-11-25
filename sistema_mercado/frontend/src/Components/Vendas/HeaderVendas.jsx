// src/Components/Vendas/HeaderVendas.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Telas/Vendas.css'; 

const HeaderVendas = ({ onAddVenda }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/home'); 
  };
  
  return (
    <div className="vendas-header-wrapper">
      <div className="vendas-header-controls">
        <button 
          className="vendas-action-btn vendas-btn-back" 
          onClick={handleGoBack}
        >
           Voltar
        </button>
      </div>
      
      <div className="vendas-header-content">
          <h1 className="vendas-screen-title">Consulta de Vendas</h1>
          <button 
            className="vendas-action-btn vendas-btn-new vendas-btn-header" 
            onClick={onAddVenda} // Chama a função da tela principal
          >
            ➕ Nova Venda
          </button>
      </div>
    </div>
  );
};

export default HeaderVendas;