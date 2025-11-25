import React, { useState, useMemo } from 'react';
import BarraPesq from '../Components/Funcionarios/BarraPesq';
import CustomTable from '../Components/Funcionarios/CustomTable';
import ActionButtons from '../Components/Funcionarios/ActionButtons';
import MOCK_CUSTOMERS from '../Components/mockCustomers'; 
import './Funcionarios.css';
import HeaderActions from '../Components/Funcionarios/HeaderActions';

function PesquisaClientes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return MOCK_CUSTOMERS;
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return MOCK_CUSTOMERS.filter(customer =>
      customer.nome.toLowerCase().includes(lowerCaseSearch) ||
      customer.cpf.includes(searchTerm) 
    );
  }, [searchTerm]);

  return (
    <div className="customer-screen-container">
    <HeaderActions />
      
      <div className="tabs-container">
        <button className="tab-item active">Consulta de Funcionarios</button>
      </div>

      <BarraPesq 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
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