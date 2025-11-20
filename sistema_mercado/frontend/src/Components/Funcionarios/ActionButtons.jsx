import React from 'react';

const ActionButtons = ({ 
  selectedCustomer, 
  hideNewButton,
  onNew,        
  onSave,       
  onEdit,       
  onDelete      
}) => {
  const isCustomerSelected = !!selectedCustomer;

  return (
    <div className="action-buttons-container">
      <button 
        className="action-btn btn-save" 
        disabled={!isCustomerSelected}
      >
        Salvar
      </button>

      <button 
        className="action-btn btn-edit" 
        disabled={!isCustomerSelected}
      >
        Editar
      </button>

      <button 
        className="action-btn btn-delete" 
        disabled={!isCustomerSelected}
      >
        Excluir
      </button>
    </div>
  );
};

export default ActionButtons;