import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroFornecedores.css'; 

function CadastroFornecedores() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState({
      codigo: '', nome: '', cnpj: '', email: '', 
      celular: '', telefone: '', cep: '', endereco: '', 
      numero: '', complemento: '', bairro: '', cidade: '', uf: 'PR'
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = (e) => {
    e.preventDefault();
    setFeedback('Fornecedor adicionado ');
  };

  const handleGoBack = () => {
    navigate('/Fornecedores'); 
  };

  const ufs = ["PR", "SP", "RJ", "MG", "SC", "RS", "AC"]; 

  return (
    <div className="fornec-cad-screen-container">
      
      <div className="fornec-cad-header">
        <h1 className="fornec-cad-title">Cadastro de Fornecedores</h1>
        <button 
          className="fornec-cad-btn-back" 
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>

      {feedback && (
          <div className="fornec-cad-feedback-message">
              {feedback}
          </div>
      )}

      <form onSubmit={handleSalvar}>
        <div className="fornec-cad-form-grid">
            
            <div className="fornec-cad-form-group">
                <label htmlFor="codigo">Código:</label>
                <input type="text" id="codigo" name="codigo" value={formData.codigo} onChange={handleChange} disabled />
            </div>
            <div className="fornec-cad-form-group span-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
            </div>

            <div className="fornec-cad-form-group span-2">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="fornec-cad-form-group">
                <label htmlFor="celular">Celular:</label>
                <input type="text" id="celular" name="celular" value={formData.celular} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
            </div>
            <div className="fornec-cad-form-group">
                <label htmlFor="telefone">Telefone (fixo):</label>
                <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXX-XXXX" />
            </div>

            <div className="fornec-cad-form-group">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} placeholder="XXXXX-XXX" />
            </div>
            <div className="fornec-cad-form-group span-2">
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} />
            </div>
            <div className="fornec-cad-form-group">
                <label htmlFor="numero">Nº:</label>
                <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} />
            </div>

            <div className="fornec-cad-form-group">
                <label htmlFor="bairro">Bairro:</label>
                <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
            </div>
            <div className="fornec-cad-form-group">
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
            </div>
            <div className="fornec-cad-form-group">
                <label htmlFor="complemento">Complemento:</label>
                <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
            </div>
            <div className="fornec-cad-form-group">
                <label htmlFor="uf">UF:</label>
                <select id="uf" name="uf" value={formData.uf} onChange={handleChange}>
                    {ufs.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </div>

            <div className="fornec-cad-form-group span-2">
                <label htmlFor="cnpj">CNPJ:</label>
                <input type="text" id="cnpj" name="cnpj" value={formData.cnpj} onChange={handleChange} placeholder="__.___.___/____-__" required />
            </div>
            <div className="fornec-cad-form-group span-2"></div>
        </div>
        <div className="fornec-cad-action-buttons">
            <button type="submit" className="fornec-cad-btn-save">
                Salvar
            </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroFornecedores;