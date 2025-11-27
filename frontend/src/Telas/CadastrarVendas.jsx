import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarVendas.css";

// Hooks reais
import { useClientes } from "../Hooks/useClientes";
import { useProdutos } from "../Hooks/useProdutos";

function CadastrarVendas() {
    const navigate = useNavigate();
    const { clientes } = useClientes();
    const { produtos } = useProdutos();

    const [feedback, setFeedback] = useState("");
    const [clienteData, setClienteData] = useState({ cpf: "", nome: "" });
    const [produtoInput, setProdutoInput] = useState({
        codigo: "",
        produto: "",
        preco: "",
        qtd: ""
    });

    const [carrinho, setCarrinho] = useState([]);
    const [dataVenda] = useState(new Date().toLocaleDateString("pt-BR"));

    const handleGoBack = () => navigate("/vendas");

    // CLIENTE
    const handleClienteChange = (e) => {
        const { name, value } = e.target;
        setClienteData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchCliente = () => {
        const { cpf, nome } = clienteData;

        let encontrado = null;

        if (cpf.length >= 11) {
            encontrado = clientes.find(
                (c) => c.cpf.replace(/\D/g, "") === cpf.replace(/\D/g, "")
            );
        }

        if (!encontrado && nome.length > 2) {
            encontrado = clientes.find((c) =>
                c.nome.toLowerCase().includes(nome.toLowerCase())
            );
        }

        if (!encontrado) {
            setFeedback("Cliente não encontrado.");
            return;
        }

        setClienteData({
            cpf: encontrado.cpf,
            nome: encontrado.nome,
            id: encontrado.id
        });

        setFeedback(`Cliente ${encontrado.nome} carregado!`);
    };

    // PRODUTO
    const handleProdutoChange = (e) => {
        const { name, value } = e.target;
        setProdutoInput((prev) => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e) => {
        let value = e.target.value.replace(/[^0-9,.]/g, "");
        value = value.replace(/\./g, ",");
        const partes = value.split(",");
        if (partes.length > 2) {
            value = partes[0] + "," + partes.slice(1).join("");
        }
        setProdutoInput((prev) => ({ ...prev, preco: value }));
    };

    const handleSearchProduto = () => {
        const { codigo, produto } = produtoInput;
        let encontrado = null;

        if (codigo) {
            encontrado = produtos.find((p) => p.id === Number(codigo));
        }

        if (!encontrado && produto.length > 2) {
            encontrado = produtos.find((p) =>
                p.descricao.toLowerCase().includes(produto.toLowerCase())
            );
        }

        if (!encontrado) {
            setFeedback("Produto não encontrado.");
            return;
        }

        setProdutoInput({
            codigo: encontrado.id,
            produto: encontrado.descricao,
            preco: encontrado.preco.toString().replace(".", ","),
            qtd: "1"
        });

        setFeedback(`Produto ${encontrado.descricao} carregado!`);
    };

    // CARRINHO
    const handleAddItem = () => {
        const preco = parseFloat(produtoInput.preco.replace(",", "."));
        const qtd = parseInt(produtoInput.qtd);

        if (!produtoInput.produto || isNaN(preco) || isNaN(qtd) || qtd < 1) {
            alert("Informações inválidas do produto.");
            return;
        }

        const produtoReal = produtos.find(
            (p) => p.id === Number(produtoInput.codigo)
        );

        if (produtoReal && qtd > produtoReal.qtd_estoque) {
            alert(`Estoque insuficiente. Restam ${produtoReal.qtd_estoque} unidades.`);
            return;
        }

        const novoItem = {
            codigo: produtoInput.codigo,
            produto: produtoInput.produto,
            qtd,
            preco,
            subtotal: preco * qtd
        };

        setCarrinho((prev) => [...prev, novoItem]);

        setProdutoInput({ codigo: "", produto: "", preco: "", qtd: "" });
        setFeedback("Item adicionado ao carrinho!");
    };

    const handleRemoveItem = (codigo) => {
        setCarrinho((prev) => prev.filter((item) => item.codigo !== codigo));
        setFeedback("Item removido.");
    };

    const totalVenda = useMemo(() => {
        return carrinho.reduce((acc, item) => acc + item.subtotal, 0);
    }, [carrinho]);

    // FINALIZAR — ENVIA PARA O BACKEND
    const handleFinalizarVenda = async () => {
        if (!clienteData.id) {
            alert("Selecione um cliente antes de finalizar.");
            return;
        }

        if (carrinho.length === 0) {
            alert("Carrinho vazio!");
            return;
        }

        const itens = carrinho.map((item) => ({
            produto: Number(item.codigo),
            qtd: Number(item.qtd)
        }));

        const payload = {
            cliente: clienteData.id,
            observacoes: "",
            itens
        };

        try {
            const response = await fetch("http://localhost:8000/api/vendas/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const erro = await response.json();
                console.error("ERRO NO BACK:", erro);
                alert("Erro ao salvar venda.");
                return;
            }

            await response.json();

            alert("Venda finalizada com sucesso!");
            navigate("/vendas");

        } catch (error) {
            console.error("Erro ao enviar venda:", error);
            alert("Não foi possível enviar a venda.");
        }
    };

    // TABELA DO CARRINHO
    const CarrinhoTabela = () => (
        <div className="vendas-carrinho-wrapper">
            <table className="vendas-carrinho-table">
                <thead>
                    <tr>
                        <th>Cód.</th>
                        <th>Produto</th>
                        <th>Qtd.</th>
                        <th>Preço Unit.</th>
                        <th>Subtotal</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {carrinho.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                                Carrinho vazio.
                            </td>
                        </tr>
                    ) : (
                        carrinho.map((item, i) => (
                            <tr key={i}>
                                <td>{item.codigo}</td>
                                <td>{item.produto}</td>
                                <td>{item.qtd}</td>
                                <td>R$ {item.preco.toFixed(2)}</td>
                                <td>R$ {item.subtotal.toFixed(2)}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemoveItem(item.codigo)}
                                        className="btn-remove-item"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="vendas-cadastro-screen-container">
            <div className="vendas-cadastro-header">
                <h1>Nova Venda ({dataVenda})</h1>
                <button onClick={handleGoBack}>Voltar</button>
            </div>

            {feedback && <div className="vendas-feedback-message">{feedback}</div>}

            <div className="vendas-grid-container">
                {/* COLUNA CLIENTE / PRODUTO */}
                <div className="vendas-left-column">
                    {/* CLIENTE */}
                    <fieldset className="vendas-fieldset">
                        <legend>Cliente</legend>

                        <div className="vendas-form-row">
                            <label>CPF:</label>
                            <input
                                name="cpf"
                                value={clienteData.cpf}
                                onChange={handleClienteChange}
                            />
                            <button onClick={handleSearchCliente}>Pesquisar</button>
                        </div>

                        <div className="vendas-form-row">
                            <label>Nome:</label>
                            <input
                                name="nome"
                                value={clienteData.nome}
                                disabled
                            />
                        </div>
                    </fieldset>

                    {/* PRODUTO */}
                    <fieldset className="vendas-fieldset">
                        <legend>Produto</legend>

                        <div className="vendas-form-row">
                            <label>Código:</label>
                            <input
                                name="codigo"
                                value={produtoInput.codigo}
                                onChange={handleProdutoChange}
                            />
                            <button onClick={handleSearchProduto}>Pesquisar</button>
                        </div>

                        <div className="vendas-form-row">
                            <label>Produto:</label>
                            <input
                                name="produto"
                                value={produtoInput.produto}
                                onChange={handleProdutoChange}
                            />
                        </div>

                        <div className="vendas-form-row">
                            <label>Preço:</label>
                            <input
                                name="preco"
                                value={produtoInput.preco}
                                onChange={handlePriceChange}
                            />

                            <label>Qtd:</label>
                            <input
                                type="number"
                                name="qtd"
                                value={produtoInput.qtd}
                                onChange={handleProdutoChange}
                            />
                        </div>

                        <button
                            className="vendas-btn-add"
                            onClick={handleAddItem}
                        >
                            + Adicionar Item
                        </button>
                    </fieldset>
                </div>

                {/* COLUNA DIREITA */}
                <div className="vendas-right-column">
                    <fieldset className="vendas-fieldset">
                        <legend>Carrinho</legend>
                        <CarrinhoTabela />
                    </fieldset>

                    <fieldset className="vendas-fieldset">
                        <legend>Total</legend>
                        <h2>R$ {totalVenda.toFixed(2)}</h2>
                    </fieldset>

                    <div className="vendas-final-actions">
                        <button onClick={handleFinalizarVenda}>Finalizar Venda</button>
                        <button onClick={handleGoBack}>Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastrarVendas;
