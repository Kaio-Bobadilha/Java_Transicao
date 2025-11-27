import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFornecedores } from "../Hooks/useFornecedores";
import "./CadastroProdutos.css";

function CadastroProdutos() {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("dados");

  // Hook real
  const { fornecedores, loading } = useFornecedores();

  const [formData, setFormData] = useState({
    descricao: "",
    preco: "",
    qtdEstoque: "",
    fornecedor: "",
  });

  // Mantém o input focado (sem perder cursor)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSalvar = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        descricao: formData.descricao,
        preco: Number(formData.preco),
        qtd_estoque: Number(formData.qtdEstoque),
        fornecedor_id: Number(formData.fornecedor), // 🔥 ESSA É A CORREÇÃO
      };

      // para debug:
      console.log("ENVIANDO PARA O BACKEND:", payload);

      const response = await fetch("http://localhost:8000/api/produtos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        setFeedback("Erro ao cadastrar produto.");
        return;
      }

      setFeedback("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error(error);
      setFeedback("Erro inesperado ao salvar.");
    }
  };

  const handleGoBack = () => {
    navigate("/Produtos");
  };

  const DadosProdutoForm = () => (
    <form onSubmit={handleSalvar}>
      <div className="prod-cad-form-grid">
        <div className="prod-cad-form-group span-4">
          <label htmlFor="descricao">Descrição:</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>

        <div className="prod-cad-form-group span-2">
          <label htmlFor="preco">Preço:</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            step="0.01"
            required
          />
        </div>

        <div className="prod-cad-form-group span-2">
          <label htmlFor="qtdEstoque">Qtd. Estoque:</label>
          <input
            type="number"
            id="qtdEstoque"
            name="qtdEstoque"
            value={formData.qtdEstoque}
            onChange={handleChange}
            required
          />
        </div>

        <div className="prod-cad-form-group span-4">
          <label htmlFor="fornecedor">Fornecedor:</label>

          {loading ? (
            <p>Carregando fornecedores...</p>
          ) : (
            <select
              id="fornecedor"
              name="fornecedor"
              value={formData.fornecedor}
              onChange={handleChange}
              required
            >
              <option value="">Selecione um fornecedor</option>

              {fornecedores.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.nome} — {f.cnpj}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="prod-cad-action-buttons">
        <button type="submit" className="prod-cad-btn-save">
          Salvar
        </button>
      </div>
    </form>
  );

  return (
    <div className="prod-cad-screen-container">
      <div className="prod-cad-header">
        <h1 className="prod-cad-title">Cadastro de Produtos</h1>
        <button className="prod-cad-btn-back" onClick={handleGoBack}>
          Voltar
        </button>
      </div>

      <div className="prod-cad-tabs-container">
        <button
          className={`prod-cad-tab-item ${
            activeTab === "dados" ? "active" : ""
          }`}
          onClick={() => setActiveTab("dados")}
        >
          Dados do Produto
        </button>
      </div>

      {feedback && <div className="prod-cad-feedback-message">{feedback}</div>}

      {activeTab === "dados" && <DadosProdutoForm />}
    </div>
  );
}

export default CadastroProdutos;
