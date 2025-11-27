import React from 'react';

const TabelaVendas = ({ vendas, onSelectVenda, selectedVenda }) => {
  if (!vendas || vendas.length === 0) {
    return <div className="empty-message">Nenhuma venda encontrada.</div>;
  }

  const headers = [
    "ID",
    "Cliente",
    "Data",
    "Total",
    "Qtd Itens",
    "Observações"
  ];

  return (
    <div className="table-wrapper">
      <table className="vendas-table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {vendas.map(v => (
            <tr
              key={v.id}
              onClick={() => onSelectVenda(v)}
              className={`table-row ${
                selectedVenda && selectedVenda.id === v.id
                  ? "selected-row"
                  : ""
              }`}
            >
              <td>{v.id}</td>
              <td>{v.cliente?.nome ?? "—"}</td>
              <td>
                {v.data_venda
                  ? new Date(v.data_venda).toLocaleString("pt-BR")
                  : "—"}
              </td>

              {/* 🔥 Aqui estava o erro (toFixed em undefined) */}
              <td>
                R$ {Number(v.total_venda ?? 0).toFixed(2)}
              </td>

              <td>{v.itens?.length ?? 0}</td>

              <td>{v.observacoes || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaVendas;
