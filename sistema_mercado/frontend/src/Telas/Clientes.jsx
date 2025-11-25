import React, { useState, useEffect, useMemo } from 'react';
import BarraPesq from '../Components/Clientes/BarraPesq';
import CustomTable from '../Components/Clientes/CustomTable';
import ActionButtons from '../Components/Clientes/ActionButtons';
import HeaderActions from '../Components/Clientes/HeaderActions';
import api from '../services/api';
import './Cliente.css';

function PesquisaClientes() {
  const [clientes, setClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    api.get('clientes/')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return clientes;
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return clientes.filter(customer =>
      customer.nome.toLowerCase().includes(lowerCaseSearch) ||
      customer.cpf.includes(searchTerm)
    );
  }, [searchTerm, clientes]);

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