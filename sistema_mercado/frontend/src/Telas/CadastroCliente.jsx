import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './CadastroCliente.css'; 

function CadastroClientes() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  
  const [formData, setFormData] = useState({
      nome: '', rg: '', cpf: '', email: '', 
      celular: '', telefone: '', cep: '', endereco: '', 
      numero: '', complemento: '', bairro: '', cidade: '', uf: 'PR'
  });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      await api.post('clientes/', formData);
      setFeedback('Cliente adicionado com sucesso');
      setFormData({
        nome: '', rg: '', cpf: '', email: '', 
        celular: '', telefone: '', cep: '', endereco: '', 
        numero: '', complemento: '', bairro: '', cidade: '', uf: 'PR'
      });
    } catch (error) {
      setFeedback('Erro ao adicionar cliente');
    }
  };

  const handleGoBack = () => {
    navigate('/PesquisaClientes'); 
  };

  const ufs = ["PR", "SP", "RJ", "MG", "SC", "RS"]; 

  return (
    <div className="clientes-screen-container">
      
      <div className="clientes-header">
        <h1 className="clientes-title">Cadastro de Clientes</h1>
        <button 
          className="clientes-btn-back" 
          onClick={handleGoBack}
        >
          Voltar
        </button>
      </div>

      {feedback && (
          <div className="clientes-feedback-message">
              {feedback}
          </div>
      )}

      <form onSubmit={handleSalvar}>
        <div className="clientes-form-grid">
            
            <div className="clientes-form-group span-3" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px' }}>
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
            </div>

            <div className="clientes-form-group span-2">
                <label htmlFor="email">E-mail:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="clientes-form-group">
                <label htmlFor="celular">Celular:</label>
                <input type="text" id="celular" name="celular" value={formData.celular} onChange={handleChange} placeholder="(XX) XXXXX-XXXX" />
            </div>
            <div className="clientes-form-group">
                <label htmlFor="telefone">Telefone (fixo):</label>
                <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} placeholder="(XX) XXXX-XXXX" />
            </div>

            <div className="clientes-form-group">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} placeholder="XXXXX-XXX" />
            </div>
            <div className="clientes-form-group span-2">
                <label htmlFor="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} />
            </div>
            <div className="clientes-form-group">
                <label htmlFor="numero">Nº:</label>
                <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} />
            </div>

            <div className="clientes-form-group">
                <label htmlFor="bairro">Bairro:</label>
                <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
            </div>
            <div className="clientes-form-group">
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
            </div>
            <div className="clientes-form-group">
                <label htmlFor="complemento">Complemento:</label>
                <input type="text" id="complemento" name="complemento" value={formData.complemento} onChange={handleChange} />
            </div>
            <div className="clientes-form-group">
                <label htmlFor="uf">UF:</label>
                <select id="uf" name="uf" value={formData.uf} onChange={handleChange}>
                    {ufs.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
            </div>

            <div className="clientes-form-group span-2">
                <label htmlFor="rg">RG:</label>
                <input type="text" id="rg" name="rg" value={formData.rg} onChange={handleChange} placeholder="__.___.___-_" />
            </div>
            <div className="clientes-form-group span-2">
                <label htmlFor="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} placeholder="___.___.___-__" required />
            </div>
            
        </div>

        <div className="clientes-action-buttons">
            <button type="submit" className="clientes-btn-save">
                Salvar
            </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroClientes;