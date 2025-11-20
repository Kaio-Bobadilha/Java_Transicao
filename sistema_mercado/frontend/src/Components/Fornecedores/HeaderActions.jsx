import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderActions = () => {
  const navigate = useNavigate();

  const handleAddFornecedor = () => {
    navigate('/CadastroFornecedores');
  };
  
  const handleGoBack = () => {
    navigate('/home'); 
  };

  return (
    <div className="header-actions-wrapper">
      <div className="header-actions-controls">
        <button 
          className="action-btn btn-back" 
          onClick={handleGoBack}
        >
           Voltar
        </button>
      </div>
      
      <div className="header-actions-content">
          <h1 className="screen-title">Pesquisa de Fornecedores</h1>
          <button 
            className="action-btn btn-new btn-header" 
            onClick={handleAddFornecedor}
          >
            ➕ Novo Fornecedor
          </button>
      </div>
    </div>
  );
};

export default HeaderActions;