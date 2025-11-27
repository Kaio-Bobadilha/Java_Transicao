import React, { useState, useMemo } from 'react';
import BarraPesq from '../Components/Funcionarios/BarraPesq';
import CustomTable from '../Components/Funcionarios/CustomTable';
import ActionButtons from '../Components/Funcionarios/ActionButtons';
import HeaderActions from '../Components/Funcionarios/HeaderActions';
import './Funcionarios.css';

// Hook REAL vindo do backend
import { useFuncionarios } from '../Hooks/useFuncionarios';

function PesquisaFuncionarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);

  const { funcionarios, loading } = useFuncionarios();

  // Filtrar os resultados
  const filteredFuncionarios = useMemo(() => {
    if (!searchTerm) return funcionarios;

    const search = searchTerm.toLowerCase();

    return funcionarios.filter(f =>
      f.user?.first_name?.toLowerCase().includes(search) ||
      f.user?.last_name?.toLowerCase().includes(search) ||
      f.cpf?.includes(searchTerm) ||
      f.cargo?.toLowerCase().includes(search)
    );
  }, [searchTerm, funcionarios]);

  if (loading) {
    return <div className="loading">Carregando funcionários...</div>;
  }

  return (
    <div className="funcionarios-screen-container">

      <HeaderActions />

      <div className="tabs-container">
        <button className="tab-item active">Consulta de Funcionários</button>
      </div>

      <BarraPesq 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />

      <CustomTable 
        funcionarios={filteredFuncionarios}
        onSelectFuncionario={setSelectedFuncionario}
        selectedFuncionario={selectedFuncionario}
      />

      <ActionButtons 
        selectedFuncionario={selectedFuncionario}
        hideNewButton={true}
      />
    </div>
  );
}

export default PesquisaFuncionarios;
