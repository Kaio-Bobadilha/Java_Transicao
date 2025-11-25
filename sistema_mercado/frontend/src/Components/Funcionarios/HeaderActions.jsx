import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderActions = ({ onNew }) => {
  const navigate = useNavigate();

  const handleAddFuncionario = () => {
    navigate('/CadastroFuncionarios'); 
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
          <h1 className="screen-title">Pesquisa de Funcionários</h1>
          <button 
            className="action-btn btn-new btn-header" 
            onClick={handleAddFuncionario}
          >
            ➕ Novo Funcionário
          </button>
      </div>
    </div>
  );
};

export default HeaderActions;