import React from 'react';

const CustomTable = ({ customers, onSelectCustomer, selectedCustomer }) => {
  if (customers.length === 0) return <div className="empty-message">Nenhum funcionário encontrado.</div>;

  const headers = [
    "Código", "Nome", "RG", "CPF", "E-mail", "Telefone", "Celular", 
  "Cep", "cargo", "nivel de acesso", "Endereço", "Nº", "Comp.", "Bairro", "Cidade", "UF"
  ];

  return (
    <div className="table-wrapper">
      <table className="customer-table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr 
              key={customer.codigo} 
              onClick={() => onSelectCustomer(customer)}
              className={`table-row ${selectedCustomer && selectedCustomer.codigo === customer.codigo ? 'selected-row' : ''}`}
            >
              <td>{customer.codigo}</td>
              <td>{customer.nome}</td>
              <td>{customer.rg}</td>
              <td>{customer.cpf}</td>
              <td>{customer.email}</td>
              <td>{customer.telefone}</td>
              <td>{customer.celular}</td>
              <td>{customer.cep}</td>
              <td>{customer.cargo}</td>
              <td>{customer.niveldeacesso}</td>
              <td>{customer.endereco}</td>
              <td>{customer.numero}</td>
              <td>{customer.complemento}</td>
              <td>{customer.bairro}</td>
              <td>{customer.cidade}</td>
              <td>{customer.uf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;