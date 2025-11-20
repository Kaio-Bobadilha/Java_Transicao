import React from 'react';

const BarraPesq = ({ searchTerm, setSearchTerm, placeholderText }) => {
  const defaultPlaceholder = "Buscar funcionário pelo Nome ou CPF...";

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={placeholderText || defaultPlaceholder}
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