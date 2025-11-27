import React from 'react';

const CustomTable = ({ customers, onSelectCustomer, selectedCustomer }) => {
  if (!customers || customers.length === 0) {
    return <div className="empty-message">Nenhum cliente encontrado.</div>;
  }

  const headers = [
    "ID", "Nome", "RG", "CPF", "E-mail", "Telefone", "Celular", 
    "CEP", "Endereço", "Nº", "Comp.", "Bairro", "Cidade", "UF"
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
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className={`table-row ${
                selectedCustomer && selectedCustomer.id === customer.id 
                  ? 'selected-row' 
                  : ''
              }`}
            >
              <td>{customer.id}</td>
              <td>{customer.nome}</td>
              <td>{customer.rg}</td>
              <td>{customer.cpf}</td>
              <td>{customer.email}</td>
              <td>{customer.telefone}</td>
              <td>{customer.celular}</td>
              <td>{customer.cep}</td>
              <td>{customer.endereco}</td>
              <td>{customer.numero}</td>
              <td>{customer.complemento}</td>
              <td>{customer.bairro}</td>
              <td>{customer.cidade}</td>
              <td>{customer.estado}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CustomTable;
