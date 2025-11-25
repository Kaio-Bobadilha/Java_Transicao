import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroProdutos.css'; 

function CadastroProdutos() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('dados'); 
  
  const [formData, setFormData] = useState({
      codigo: '', 
      descricao: '', 
      preco: '', 
      qtdEstoque: '', 
      fornecedor: '' 
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    setFeedback('Produto adicionado');
  };

  const handleGoBack = () => {
    navigate('/Produtos'); 
  };

  const fornecedoresMock = ["Fornecedor A Ltda", "Tech Suprimentos S.A.", "Distribuidora Beta"];

  const DadosProdutoForm = () => (
      <form onSubmit={handleSalvar}>
          <div className="prod-cad-form-grid">
              
              <div className="prod-cad-form-group">
                  <label htmlFor="codigo">Codigo:</label>
                  <input type="text" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} />
              </div>
              <div className="prod-cad-form-group span-3"></div> 

              <div className="prod-cad-form-group span-4">
                  <label htmlFor="descricao">Descrição:</label>
                  <input type="text" id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} required />
              </div>

              <div className="prod-cad-form-group span-2">
                  <label htmlFor="preco">Preço:</label>
                  <input type="number" id="preco" name="preco" value={formData.preco} onChange={handleChange} placeholder="0.00" step="0.01" required />
              </div>
              <div className="prod-cad-form-group span-2">
                  <label htmlFor="qtdEstoque">Qtd. Estoque:</label>
                  <input type="number" id="qtdEstoque" name="qtdEstoque" value={formData.qtdEstoque} onChange={handleChange} required />
              </div>
              
              <div className="prod-cad-form-group span-4">
                  <label htmlFor="fornecedor">Fornecedor:</label>
                  <select id="fornecedor" name="fornecedor" value={formData.fornecedor} onChange={handleChange}>
                      <option value="">Selecione um fornecedor</option>
                      {fornecedoresMock.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
              </div>
          </div>

          <div className="prod-cad-action-buttons">
              <button type="button" className="prod-cad-btn-new">
                   Novo
              </button>
          </div>
      </form>
  );

  return (
    <div className="prod-cad-screen-container">
      
      <div className="prod-cad-header">
        <h1 className="prod-cad-title">Cadastro de Produtos</h1>
        <button 
          className="prod-cad-btn-back" 
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>

      <div className="prod-cad-tabs-container">
          <button 
              className={`prod-cad-tab-item ${activeTab === 'dados' ? 'active' : ''}`}
              onClick={() => setActiveTab('dados')}
          >
              Dados do Produto
          </button>
      </div>

      {feedback && (
          <div className="prod-cad-feedback-message">
              {feedback}
          </div>
      )}

      {activeTab === 'dados' && <DadosProdutoForm />}
    </div>
  );
}

export default CadastroProdutos;