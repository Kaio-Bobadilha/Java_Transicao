 import React from 'react';
import '../../Telas/Produtos.css';

const AcoesProdutos = ({ selectedProduto }) => {
  const isProdutoSelected = !!selectedProduto;

  return (
    <div className="produtos-action-buttons-container">
      <button 
        className="produtos-action-btn produtos-btn-save" 
        disabled={!isProdutoSelected}
      >
        Salvar
      </button>

      <button 
        className="produtos-action-btn produtos-btn-edit" 
        disabled={!isProdutoSelected}
      >
        Editar
      </button>

      <button 
        className="produtos-action-btn produtos-btn-delete" 
        disabled={!isProdutoSelected}
      >
        Excluir
      </button>
    </div>
  );
};

export default AcoesProdutos;