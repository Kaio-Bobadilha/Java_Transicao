import React from 'react';

const CustomTable = ({ fornecedores, onSelectFornecedor, selectedFornecedor }) => {
  if (!fornecedores || fornecedores.length === 0) {
    return <div className="empty-message">Nenhum fornecedor encontrado.</div>;
  }

  const headers = [
    "ID", "Nome", "CNPJ", "E-mail", "Telefone", "Celular", 
    "CEP", "Endereço", "Nº", "Comp.", "Bairro", "Cidade", "UF"
  ];

  return (
    <div className="table-wrapper">
      <table className="customer-table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {fornecedores.map((f) => (
            <tr
              key={f.id}
              onClick={() => onSelectFornecedor(f)}
              className={`table-row ${
                selectedFornecedor && selectedFornecedor.id === f.id
                  ? "selected-row"
                  : ""
              }`}
            >
              <td>{f.id}</td>
              <td>{f.nome}</td>
              <td>{f.cnpj}</td>
              <td>{f.email}</td>
              <td>{f.telefone}</td>
              <td>{f.celular}</td>
              <td>{f.cep}</td>
              <td>{f.endereco}</td>
              <td>{f.numero}</td>
              <td>{f.complemento}</td>
              <td>{f.bairro}</td>
              <td>{f.cidade}</td>
              <td>{f.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
