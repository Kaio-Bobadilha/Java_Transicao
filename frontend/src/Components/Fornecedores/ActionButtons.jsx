import React from 'react';

const ActionButtons = ({ selectedFornecedor }) => {
  const isSelected = !!selectedFornecedor;

  return (
    <div className="action-buttons-container">
      <button className="action-btn btn-save" disabled={!isSelected}>
        Salvar
      </button>
      <button className="action-btn btn-edit" disabled={!isSelected}>
        Editar
      </button>
      <button className="action-btn btn-delete" disabled={!isSelected}>
        Excluir
      </button>
    </div>
  );
};

export default ActionButtons;