import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderVendas from '../Components/Vendas/HeaderVendas';
import FiltroVendas from '../Components/Vendas/FiltroVendas';
import TabelaVendas from '../Components/Vendas/TabelaVendas';
import AcoesVendas from '../Components/Vendas/AcoesVendas';

import './Vendas.css';

// Hook REAL vindo do backend
import { useVendas } from '../Hooks/useVendas';

function Vendas() {
  const navigate = useNavigate();
  const [selectedVenda, setSelectedVenda] = useState(null);
  const [filters, setFilters] = useState({
    data: '',
    funcionario: '',
    produtoNome: ''
  });

  // 🔥 Buscando vendas reais
  const { vendas, loading } = useVendas();

  const handleAddVenda = () => {
    navigate('/CadastrarVendas');
  };

  // -----------------------------
  // 🔍 APLICAÇÃO DE FILTROS REAL
  // -----------------------------
  const filteredVendas = useMemo(() => {
    if (!vendas) return [];

    let lista = [...vendas];

    const { data, funcionario, produtoNome } = filters;

    // Filtro por data
    if (data) {
      lista = lista.filter(v =>
        v.data_venda && v.data_venda.startsWith(data)
      );
    }

    // Filtro por funcionário
    if (funcionario) {
      const f = funcionario.toLowerCase();
      lista = lista.filter(v =>
        (v.funcionario?.user?.first_name || "")
          .toLowerCase()
          .includes(f)
      );
    }

    // Filtro por produto dentro dos itens
    if (produtoNome) {
      const p = produtoNome.toLowerCase();
      lista = lista.filter(v =>
        v.itens?.some(item =>
          item.produto.descricao.toLowerCase().includes(p)
        )
      );
    }

    // Ordenação — mais recente primeiro
    return lista.sort((a, b) => b.id - a.id);

  }, [vendas, filters]);

  if (loading) {
    return <div className="loading">Carregando vendas...</div>;
  }

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
