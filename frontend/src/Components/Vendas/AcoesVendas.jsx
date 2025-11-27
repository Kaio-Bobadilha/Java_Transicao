// src/Components/Vendas/AcoesVendas.jsx

import React from 'react';
import '../../Telas/Vendas.css'; 

const AcoesVendas = ({ selectedVenda }) => {
  const isVendaSelected = !!selectedVenda;

  return (
    <div className="vendas-action-buttons-container">
      {/* Botões para ações em uma venda existente */}
      <button 
        className="vendas-action-btn vendas-btn-edit" 
        disabled={!isVendaSelected}
      >
        Editar
      </button>

      <button 
        className="vendas-action-btn vendas-btn-delete" 
        disabled={!isVendaSelected}
      >
        Cancelar Venda
      </button>
    </div>
  );
};

export default AcoesVendas;