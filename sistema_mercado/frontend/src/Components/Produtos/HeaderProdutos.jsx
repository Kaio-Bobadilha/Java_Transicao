import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Telas/Produtos.css';

const HeaderProdutos = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/home'); 
  };
  
  const handleAddProduto = () => {
    alert('Navegar para a tela de Cadastro de Produtos.');
  };

  return (
    <div className="produtos-header-wrapper">
      <div className="produtos-header-controls">
        <button 
          className="produtos-action-btn produtos-btn-back" 
          onClick={handleGoBack}
        >
           Voltar
        </button>
      </div>
      
      <div className="produtos-header-content">
          <h1 className="produtos-screen-title">Consulta de Produtos</h1>
          <button 
            className="produtos-action-btn produtos-btn-new produtos-btn-header" 
            onClick={handleAddProduto}
          >
            ➕ Novo Produto
          </button>
      </div>
      
      <div className="produtos-tabs-container produtos-single-tab-only">
        <button className="produtos-tab-item produtos-tab-active">Lista de Produtos</button>
      </div>
    </div>
  );
};

export default HeaderProdutos;