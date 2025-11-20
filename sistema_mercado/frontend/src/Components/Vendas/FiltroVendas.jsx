// src/Components/Vendas/FiltroVendas.jsx

import React from 'react';
import '../../Telas/Vendas.css'; 

const FiltroVendas = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="vendas-filtro-container">
      
      {/* Filtro por Data */}
      <div className="vendas-filtro-group">
        <label htmlFor="data">Data da Venda:</label>
        <input
          type="date"
          name="data"
          value={filters.data}
          onChange={handleChange}
          className="vendas-filtro-input"
        />
      </div>

      {/* Filtro por Funcionário */}
      <div className="vendas-filtro-group">
        <label htmlFor="funcionario">Funcionário:</label>
        <input
          type="text"
          name="funcionario"
          placeholder="Nome do funcionário"
          value={filters.funcionario}
          onChange={handleChange}
          className="vendas-filtro-input"
        />
      </div>

      {/* Filtro por Produto */}
      <div className="vendas-filtro-group">
        <label htmlFor="produtoNome">Produto:</label>
        <input
          type="text"
          name="produtoNome"
          placeholder="Nome do produto"
          value={filters.produtoNome}
          onChange={handleChange}
          className="vendas-filtro-input"
        />
      </div>

    </div>
  );
};

export default FiltroVendas;