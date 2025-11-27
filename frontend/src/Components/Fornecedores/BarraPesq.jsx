import React from 'react';

const BarraPesq = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar fornecedor pelo Nome ou CNPJ..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button className="search-button">
        🔍
        <span>Pesquisar</span>
      </button>
    </div>
  );
};

export default BarraPesq;