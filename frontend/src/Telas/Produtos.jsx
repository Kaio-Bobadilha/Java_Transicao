import React, { useState, useMemo } from 'react';
import HeaderProdutos from '../Components/Produtos/HeaderProdutos';
import BarraPesq from '../Components/Produtos/BarraPesq';
import TabelaProdutos from '../Components/Produtos/TabelaProdutos';
import AcoesProdutos from '../Components/Produtos/AcoesProdutos';
import './Produtos.css';

// Hook real
import { useProdutos } from '../Hooks/useProdutos';

function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduto, setSelectedProduto] = useState(null);

  const { produtos, loading } = useProdutos();

  const filteredProdutos = useMemo(() => {
    if (!searchTerm) return produtos;

    const lower = searchTerm.toLowerCase();

    return produtos.filter(prod =>
      prod.descricao.toLowerCase().includes(lower) ||
      String(prod.id).includes(searchTerm)
    );

  }, [searchTerm, produtos]);

  if (loading) {
    return <div className="loading">Carregando produtos...</div>;
  }

  return (
    <div className="produtos-screen-container">
      
      <HeaderProdutos />
      
      <BarraPesq
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <TabelaProdutos 
        produtos={filteredProdutos} 
        onSelectProduto={setSelectedProduto}
        selectedProduto={selectedProduto}
      />

      <AcoesProdutos selectedProduto={selectedProduto} />

    </div>
  );
}

export default Produtos;
