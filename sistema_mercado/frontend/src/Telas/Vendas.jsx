import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderVendas from '../Components/Vendas/HeaderVendas';
import FiltroVendas from '../Components/Vendas/FiltroVendas';
import TabelaVendas from '../Components/Vendas/TabelaVendas';
import AcoesVendas from '../Components/Vendas/AcoesVendas';
import MOCK_VENDAS from '../Components/mockVendas';
import './Vendas.css';

function Vendas() {
  const navigate = useNavigate();
  const [vendas, setVendas] = useState(MOCK_VENDAS);
  const [selectedVenda, setSelectedVenda] = useState(null);
  const [filters, setFilters] = useState({
    data: '',
    funcionario: '',
    produtoNome: ''
  });
  const handleAddVenda = () => {
    navigate('/CadastrarVendas');
  };

  const filteredVendas = useMemo(() => {
    let listaFiltrada = vendas;
    
    const { data, funcionario, produtoNome } = filters;
    
    if (data) {
        listaFiltrada = listaFiltrada.filter(v => v.data === data);
    }
    
    if (funcionario) {
        const funcLower = funcionario.toLowerCase();
        listaFiltrada = listaFiltrada.filter(v => 
            v.funcionario.toLowerCase().includes(funcLower)
        );
    }
    
    if (produtoNome) {
        const prodLower = produtoNome.toLowerCase();
        listaFiltrada = listaFiltrada.filter(v => 
            v.produtoNome.toLowerCase().includes(prodLower)
        );
    }
    
    return listaFiltrada.sort((a, b) => b.id - a.id); 
  }, [vendas, filters]);


  return (
    <div className="vendas-screen-container">
      <HeaderVendas onAddVenda={handleAddVenda} />
      <FiltroVendas 
        filters={filters} 
        setFilters={setFilters} 
      />
      <TabelaVendas 
        vendas={filteredVendas} 
        onSelectVenda={setSelectedVenda}
        selectedVenda={selectedVenda}
      />
      <AcoesVendas selectedVenda={selectedVenda} />
    </div>
  );
}

export default Vendas;