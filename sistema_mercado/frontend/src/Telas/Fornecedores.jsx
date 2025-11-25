import React, { useState, useMemo } from 'react';
import BarraPesq from '../Components/Fornecedores/BarraPesq';
import CustomTable from '../Components/Fornecedores/CustomTable';
import ActionButtons from '../Components/Fornecedores/ActionButtons';
import HeaderActions from '../Components/Fornecedores/HeaderActions';

import MOCK_DATA from '../Components/mockCustomers'; 
import './Fornecedores.css';

function PesquisaFornecedores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  const onlyFornecedores = useMemo(() => {
    return MOCK_DATA.filter(p => p.tipo === "Fornecedor");
  }, []);

  const filteredFornecedores = useMemo(() => {
    if (!searchTerm) return onlyFornecedores;
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return onlyFornecedores.filter(fornecedor =>
      fornecedor.nome.toLowerCase().includes(lowerCaseSearch) ||
      (fornecedor.cnpj && fornecedor.cnpj.includes(searchTerm)) 
    );
  }, [searchTerm, onlyFornecedores]);

  return (
    <div className="customer-screen-container">
      <HeaderActions />
      
      <div className="tabs-container">
        <button className="tab-item active">Consulta de Fornecedores</button>
      </div>

      <BarraPesq 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <CustomTable 
        customers={filteredFornecedores} 
        onSelectCustomer={setSelectedFornecedor}
        selectedCustomer={selectedFornecedor}
      />

      <ActionButtons selectedCustomer={selectedFornecedor} />
    </div>
  );
}

export default PesquisaFornecedores;