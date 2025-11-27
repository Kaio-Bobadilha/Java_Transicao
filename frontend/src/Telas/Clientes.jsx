import React, { useState, useMemo } from 'react';
import BarraPesq from '../Components/Clientes/BarraPesq';
import CustomTable from '../Components/Clientes/CustomTable';
import ActionButtons from '../Components/Clientes/ActionButtons';
import HeaderActions from '../Components/Clientes/HeaderActions';
import './Cliente.css';

// Import do hook REAL
import { useClientes } from '../Hooks/useClientes';

function PesquisaClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Dados reais vindos da API
  const { clientes, loading } = useClientes();

  // Evita erro enquanto carrega
  const clientesLista = Array.isArray(clientes) ? clientes : [];

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return clientesLista;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return clientesLista.filter((customer) => {
      const nome = customer.nome?.toLowerCase() || "";
      const cpf = customer.cpf?.replace(/\D/g, "") || "";

      return (
        nome.includes(lowerCaseSearch) ||
        cpf.includes(searchTerm.replace(/\D/g, ""))
      );
    });
  }, [searchTerm, clientesLista]);

  return (
    <div className="customer-screen-container">
      <HeaderActions />

      <div className="tabs-container">
        <button className="tab-item active">Consulta de Clientes</button>
      </div>

      <BarraPesq 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Enquanto carrega */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Carregando clientes...
        </p>
      )}

      {/* Tabela */}
      <CustomTable
        customers={filteredCustomers}
        onSelectCustomer={setSelectedCustomer}
        selectedCustomer={selectedCustomer}
      />

      <ActionButtons selectedCustomer={selectedCustomer} hideNewButton={true} />
    </div>
  );
}

export default PesquisaClientes;
