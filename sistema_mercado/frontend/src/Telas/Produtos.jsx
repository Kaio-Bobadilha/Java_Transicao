import React, { useState, useMemo } from 'react';
import MOCK_PRODUTOS from '../Components/mockProdutos';
import HeaderProdutos from '../Components/Produtos/HeaderProdutos';
import BarraPesq from '../Components/Produtos/BarraPesq';
import TabelaProdutos from '../Components/Produtos/TabelaProdutos';
import AcoesProdutos from '../Components/Produtos/AcoesProdutos';
import './Produtos.css';

function Produtos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduto, setSelectedProduto] = useState(null);

  const filteredProdutos = useMemo(() => {
    if (!searchTerm) return MOCK_PRODUTOS;
    const lowerCaseSearch = searchTerm.toLowerCase();
    
    return MOCK_PRODUTOS.filter(produto =>
      produto.descricao.toLowerCase().includes(lowerCaseSearch) ||
      String(produto.codigo).includes(searchTerm)
    );
  }, [searchTerm]);

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