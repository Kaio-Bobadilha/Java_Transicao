// src/Components/Vendas/TabelaVendas.jsx

import React from 'react';
import '../../Telas/Vendas.css'; 

const TabelaVendas = ({ vendas, onSelectVenda, selectedVenda }) => {
  if (!vendas || vendas.length === 0) {
    return <div className="vendas-empty-message">Nenhuma venda encontrada com os filtros aplicados.</div>;
  }

  const headers = [
    "ID", "Data", "Funcionário", "Produto", "Qtd.", "Total (R$)"
  ];

  return (
    <div className="vendas-table-wrapper">
      <table className="vendas-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr 
              key={venda.id} 
              onClick={() => onSelectVenda(venda)}
              className={`vendas-table-row ${selectedVenda && selectedVenda.id === venda.id ? 'vendas-selected-row' : ''}`}
            >
              <td>{venda.id}</td>
              <td>{venda.data}</td>
              <td>{venda.funcionario}</td>
              <td>{venda.produtoNome}</td>
              <td>{venda.quantidade}</td>
              <td>{venda.total.toFixed(2).replace('.', ',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaVendas;