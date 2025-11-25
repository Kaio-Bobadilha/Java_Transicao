import React from 'react';
import '../../Telas/Produtos.css'; 

const TabelaProdutos = ({ produtos, onSelectProduto, selectedProduto }) => {
  if (!produtos || produtos.length === 0) {
    return <div className="produtos-empty-message">Nenhum produto encontrado.</div>;
  }

  const headers = [
    "Código", "Descrição", "Preço", "Qtd. Estoque", "Fornecedor", "Unidade"
  ];

  return (
    <div className="produtos-table-wrapper">
      <table className="produtos-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr 
              key={produto.codigo} 
              onClick={() => onSelectProduto(produto)}
              className={`produtos-table-row ${selectedProduto && selectedProduto.codigo === produto.codigo ? 'produtos-selected-row' : ''}`}
            >
              <td>{produto.codigo}</td>
              <td>{produto.descricao}</td>
              <td>R$ {produto.preco.toFixed(2).replace('.', ',')}</td>
              <td>{produto.qtdEstoque}</td>
              <td>{produto.fornecedor}</td>
              <td>{produto.unidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaProdutos;