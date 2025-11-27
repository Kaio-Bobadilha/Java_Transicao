import React from 'react';

const TabelaProdutos = ({ produtos, onSelectProduto, selectedProduto }) => {
  if (!produtos || produtos.length === 0) {
    return <div className="empty-message">Nenhum produto encontrado.</div>;
  }

  const headers = ["ID", "Descrição", "Preço", "Estoque", "Fornecedor"];

  return (
    <div className="table-wrapper">
      <table className="produtos-table">
        <thead>
          <tr>
            {headers.map((h, i) => <th key={i}>{h}</th>)}
          </tr>
        </thead>

        <tbody>
          {produtos.map(prod => (
            <tr
              key={prod.id}
              onClick={() => onSelectProduto(prod)}
              className={
                selectedProduto?.id === prod.id ? "table-row selected-row" : "table-row"
              }
            >
              <td>{prod.id}</td>
              <td>{prod.descricao}</td>
              <td>R$ {Number(prod.preco).toFixed(2)}</td>
              <td>{prod.qtd_estoque}</td>

              <td>{prod.fornecedor?.nome || "Sem fornecedor"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaProdutos;
