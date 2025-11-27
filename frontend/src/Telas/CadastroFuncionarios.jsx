import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroFuncionarios.css';

function CadastroFuncionarios() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    rg: "",
    cpf: "",
    telefone: "",
    celular: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "PR",
    cargo: "",
    nivel_acesso: "Admin"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/funcionarios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar funcionário.");
      }

      setFeedback("Funcionário cadastrado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        senha: "",
        rg: "",
        cpf: "",
        telefone: "",
        celular: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: "PR",
        cargo: "",
        nivel_acesso: "Admin"
      });

    } catch (error) {
      setFeedback("Erro ao salvar funcionário.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate('/Funcionarios');
  };

  const ufs = ["PR", "SP", "RJ", "MG", "SC", "RS"];
  const niveisAcesso = ["Admin", "Usuario"];

  return (
    <div className="func-cad-screen-container">
      <div className="func-cad-header">
        <h1 className="func-cad-title">Cadastro de Funcionários</h1>
        <button className="func-cad-btn-back" onClick={handleGoBack}>
          Voltar
        </button>
      </div>

      {feedback && (
        <div className="func-cad-feedback-message">
          {feedback}
        </div>
      )}

      <form onSubmit={handleSalvar}>
        <div className="func-cad-form-grid">

          <div className="func-cad-form-group span-3">
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>

          <div className="func-cad-form-group span-2">
            <label>E-mail:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="func-cad-form-group span-2">
            <label>Senha:</label>
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} required />
          </div>

          <div className="func-cad-form-group">
            <label>Celular:</label>
            <input type="text" name="celular" value={formData.celular} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>Telefone:</label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>CEP:</label>
            <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group span-2">
            <label>Endereço:</label>
            <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>Número:</label>
            <input type="text" name="numero" value={formData.numero} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>Bairro:</label>
            <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>Cidade:</label>
            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>Complemento:</label>
            <input type="text" name="complemento" value={formData.complemento} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>UF:</label>
            <select name="estado" value={formData.estado} onChange={handleChange}>
              {ufs.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <div className="func-cad-form-group">
            <label>RG:</label>
            <input type="text" name="rg" value={formData.rg} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>CPF:</label>
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} required />
          </div>

          <div className="func-cad-form-group">
            <label>Cargo:</label>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} />
          </div>

          <div className="func-cad-form-group">
            <label>Nível de Acesso:</label>
            <select name="nivel_acesso" value={formData.nivel_acesso} onChange={handleChange}>
              {niveisAcesso.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div className="func-cad-action-buttons">
          <button type="submit" className="func-cad-btn-save" disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastroFuncionarios;
