import React from 'react';

const ActionButtons = ({ 
  selectedFuncionario, 
  hideNewButton,
  onNew,        
  onSave,       
  onEdit,       
  onDelete      
}) => {
  const isFuncionarioSelected = !! selectedFuncionario;

  return (
    <div className="action-buttons-container">
      <button 
        className="action-btn btn-save" 
        disabled={!isFuncionarioSelected}
      >
        Salvar
      </button>

      <button 
        className="action-btn btn-edit" 
        disabled={!isFuncionarioSelected}
      >
        Editar
      </button>

      <button 
        className="action-btn btn-delete" 
        disabled={!isFuncionarioSelected}
      >
        Excluir
      </button>
    </div>
  );
};

export default ActionButtons;