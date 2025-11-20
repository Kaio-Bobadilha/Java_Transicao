import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderActions = () => {
  const navigate = useNavigate();

  const handleAddCliente = () => {
    navigate('/NovoCliente'); 
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
          <h1 className="screen-title">Cadastro de Clientes</h1>
    
          <button 
            className="action-btn btn-new btn-header" 
            onClick={handleAddCliente}
          >
            ➕ Novo Cliente
          </button>
      </div>
    </div>
  );
};

export default HeaderActions;