import React, { useState, useMemo } from 'react';
import BarraPesq from '../Components/Fornecedores/BarraPesq';
import CustomTable from '../Components/Fornecedores/CustomTable';
import ActionButtons from '../Components/Fornecedores/ActionButtons';
import HeaderActions from '../Components/Fornecedores/HeaderActions';
import './Fornecedores.css';

import { useFornecedores } from '../Hooks/useFornecedores';

function PesquisaFornecedores() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  const { fornecedores, loading } = useFornecedores();

  const filteredFornecedores = useMemo(() => {
    if (!searchTerm) return fornecedores;

    const s = searchTerm.toLowerCase();

    return fornecedores.filter(f =>
      f.nome.toLowerCase().includes(s) ||
      (f.cnpj && f.cnpj.includes(searchTerm))
    );
  }, [searchTerm, fornecedores]);


  if (loading) {
    return <div className="loading">Carregando fornecedores...</div>;
  }

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
        fornecedores={filteredFornecedores}
        onSelectFornecedor={setSelectedFornecedor}
        selectedFornecedor={selectedFornecedor}
      />

      <ActionButtons selectedFornecedor={selectedFornecedor} />
    </div>
  );
}

export default PesquisaFornecedores;
