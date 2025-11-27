import React from 'react';

const CustomTable = ({ funcionarios, onSelectFuncionario, selectedFuncionario }) => {
  if (!funcionarios || funcionarios.length === 0) {
    return <div className="empty-message">Nenhum funcionário encontrado.</div>;
  }

  const headers = [
    "ID", 
    "Nome", 
    "CPF", 
    "RG",
    "Cargo",
    "Nível",
    "Telefone",
    "Celular",
    "CEP",
    "Endereço",
    "Nº",
    "Comp.",
    "Bairro",
    "Cidade",
    "UF"
  ];

  return (
    <div className="table-wrapper">
      <table className="customer-table"> 
        {/* mesma classe da tabela de clientes para manter o visual */}
        
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {funcionarios.map((func) => (
            <tr 
              key={func.id}
              onClick={() => onSelectFuncionario(func)}
              className={`table-row ${
                selectedFuncionario && selectedFuncionario.id === func.id 
                  ? 'selected-row' 
                  : ''
              }`}
            >
              <td>{func.id}</td>
              <td>{func.nome}</td>
              <td>{func.cpf}</td>
              <td>{func.rg}</td>
              <td>{func.cargo}</td>
              <td>{func.nivel_acesso}</td>
              <td>{func.telefone}</td>
              <td>{func.celular}</td>
              <td>{func.cep}</td>
              <td>{func.endereco}</td>
              <td>{func.numero}</td>
              <td>{func.complemento}</td>
              <td>{func.bairro}</td>
              <td>{func.cidade}</td>
              <td>{func.estado}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CustomTable;
