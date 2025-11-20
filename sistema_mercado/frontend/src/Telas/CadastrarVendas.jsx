import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarVendas.css'; 
import MOCK_PEOPLE from '../Components/mockCustomers'; 
import MOCK_PRODUTOS from '../Components/mockProdutos';


function CadastrarVendas() {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');
    
    const [clienteData, setClienteData] = useState({ cpf: '', nome: '' });
    const [produtoInput, setProdutoInput] = useState({ codigo: '', produto: '', preco: '', qtd: '' });
    const [carrinho, setCarrinho] = useState([]);
    const [dataVenda, setDataVenda] = useState(new Date().toLocaleDateString('pt-BR')); 
    
    const handleGoBack = () => {
        navigate('/vendas'); 
    };
    
    const handleClienteChange = (e) => {
        const { name, value } = e.target;
        setClienteData(prev => ({ ...prev, [name]: value }));
    };

    const handleProdutoChange = (e) => {
        const { name, value } = e.target;
        setProdutoInput(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9,.]/g, ''); 
        value = value.replace(/\./g, ',');
        
        const parts = value.split(',');
        if (parts.length > 2) {
            value = parts[0] + ',' + parts.slice(1).join('');
        }

        setProdutoInput(prev => ({ ...prev, preco: value }));
    };

    // FUNÇÃO DE PESQUISA CLIENTE (Mantida)
    const handleSearchCliente = () => {
        const { cpf, nome } = clienteData;
        
        let clienteEncontrado;

        // 1. Tenta buscar pelo CPF, se houver
        if (cpf.length >= 11) { 
            clienteEncontrado = MOCK_PEOPLE.find(
                p => p.cpf.replace(/[^0-9]/g, '') === cpf.replace(/[^0-9]/g, '') && p.tipo === 'Cliente'
            );
        }
        
        // 2. Se não encontrou pelo CPF ou o CPF não foi digitado, tenta buscar pelo nome
        if (!clienteEncontrado && nome.length > 2) {
            const lowerCaseName = nome.toLowerCase();
            clienteEncontrado = MOCK_PEOPLE.find(
                p => p.nome.toLowerCase().includes(lowerCaseName) && p.tipo === 'Cliente'
            );
        }

        if (clienteEncontrado) {
            setClienteData({ 
                cpf: clienteEncontrado.cpf, 
                nome: clienteEncontrado.nome 
            });
            setFeedback(`Cliente ${clienteEncontrado.nome} carregado!`);
        } else {
            setFeedback('Cliente não encontrado pelo CPF ou Nome fornecidos.');
            setClienteData(prev => ({ ...prev, nome: '' })); 
        }
    };
    
    // FUNÇÃO DE PESQUISA PRODUTO (ATUALIZADA para buscar por Código OU Nome/Descrição)
    const handleSearchProduto = () => {
        const { codigo, produto } = produtoInput;
        let produtoEncontrado = null;

        // 1. Tenta buscar pelo Código (convertendo para número, pois no mockProdutos.jsx é number)
        const codigoNumerico = parseInt(codigo);
        if (!isNaN(codigoNumerico)) {
            produtoEncontrado = MOCK_PRODUTOS.find(p => p.codigo === codigoNumerico);
        }

        // 2. Se não encontrou pelo Código, tenta buscar pelo nome/descrição
        if (!produtoEncontrado && produto && produto.length > 2) {
             const lowerCaseProduto = produto.toLowerCase();
             // O campo é 'descricao' em mockProdutos.jsx
            produtoEncontrado = MOCK_PRODUTOS.find(
                p => p.descricao.toLowerCase().includes(lowerCaseProduto)
            );
        }
        
        if (produtoEncontrado) {
            setProdutoInput({ 
                codigo: produtoEncontrado.codigo.toString(), // Garante que volta como string para o input
                produto: produtoEncontrado.descricao, 
                preco: produtoEncontrado.preco.toFixed(2).replace('.', ','), 
                qtd: '1' 
            });
            setFeedback(`Produto ${produtoEncontrado.descricao} carregado!`);
        } else {
            // Se não encontrou, limpa os campos de preco e qtd, mas mantém o código/produto digitado
            setProdutoInput(prev => ({ 
                codigo: prev.codigo, 
                produto: prev.produto, 
                preco: '', 
                qtd: '' 
            }));
            setFeedback('Produto não encontrado pelo código ou nome.');
        }
    };
    
    const handleAddItem = () => {
        const precoLimpo = parseFloat(produtoInput.preco.replace(',', '.'));
        const qtdLimpa = parseInt(produtoInput.qtd);

        if (!produtoInput.produto || qtdLimpa <= 0 || isNaN(precoLimpo) || isNaN(qtdLimpa)) {
            alert('Dados do produto inválidos (preço ou quantidade).');
            return;
        }
        
        // CORRIGINDO A BUSCA DO MOCK PARA O REAL E PARA O ESTOQUE
        const codigoNumerico = parseInt(produtoInput.codigo);
        const mockProduct = MOCK_PRODUTOS.find(p => p.codigo === codigoNumerico);

        if (mockProduct && qtdLimpa > mockProduct.qtdEstoque) { // Verifica o estoque real
            alert(`Erro: Estoque insuficiente. Restam apenas ${mockProduct.qtdEstoque} unidades.`);
            return;
        }

        const itemExistenteIndex = carrinho.findIndex(item => item.codigo === produtoInput.codigo);

        const novoItem = {
            codigo: produtoInput.codigo,
            produto: produtoInput.produto,
            qtd: qtdLimpa,
            preco: precoLimpo, 
            subtotal: precoLimpo * qtdLimpa
        };

        if (itemExistenteIndex > -1) {
            const carrinhoAtualizado = [...carrinho];
            carrinhoAtualizado[itemExistenteIndex].qtd += qtdLimpa;
            carrinhoAtualizado[itemExistenteIndex].subtotal = carrinhoAtualizado[itemExistenteIndex].qtd * carrinhoAtualizado[itemExistenteIndex].preco;
            setCarrinho(carrinhoAtualizado);
        } else {
            setCarrinho(prev => [...prev, novoItem]);
        }
        setProdutoInput({ codigo: '', produto: '', preco: '', qtd: '' });
        setFeedback('Item adicionado ao carrinho!');
    };
    
    const handleRemoveItem = (codigo) => {
        const carrinhoAtualizado = carrinho.filter(item => item.codigo !== codigo);
        setCarrinho(carrinhoAtualizado);
        setFeedback(`Item ${codigo} removido do carrinho.`);
    };


    const totalVenda = useMemo(() => {
        return carrinho.reduce((total, item) => total + item.subtotal, 0);
    }, [carrinho]);

    const handleFinalizarVenda = () => {
        if (carrinho.length === 0) {
            alert('O carrinho está vazio. Adicione produtos para finalizar a venda.');
            return;
        }
        if (!clienteData.nome) {
            alert('Nenhum cliente selecionado/encontrado. Por favor, pesquise e selecione um cliente.');
            return;
        }

        console.log('--- VENDA FINALIZADA ---');
        console.log('Data:', dataVenda);
        console.log('Cliente:', clienteData.nome, 'CPF:', clienteData.cpf);
        console.log('Itens:', carrinho);
        console.log('Total:', totalVenda.toFixed(2));
        alert(`Venda de R$ ${totalVenda.toFixed(2).replace('.', ',')} finalizada com sucesso para ${clienteData.nome}!`);
        
        // Limpar o estado
        setClienteData({ cpf: '', nome: '' });
        setCarrinho([]);
        setFeedback('Venda finalizada com sucesso! Novo cadastro pronto.');
        setDataVenda(new Date().toLocaleDateString('pt-BR')); 
    };

    // Componente CarrinhoTabela (Adicionado para renderizar o carrinho)
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
                            <td colSpan="6" style={{ textAlign: 'center', color: '#6b7280' }}>
                                O carrinho está vazio.
                            </td>
                        </tr>
                    ) : (
                        carrinho.map((item, index) => (
                            <tr key={index}>
                                <td>{item.codigo}</td>
                                <td>{item.produto}</td>
                                <td>{item.qtd}</td>
                                <td>R$ {item.preco.toFixed(2).replace('.', ',')}</td>
                                <td>R$ {item.subtotal.toFixed(2).replace('.', ',')}</td>
                                <td>
                                    <button 
                                        onClick={() => handleRemoveItem(item.codigo)}
                                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
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
                <h1 className="vendas-cadastro-title">Nova Venda (Data: {dataVenda})</h1>
                <button className="vendas-btn-back" onClick={handleGoBack}>
                    Voltar para Vendas
                </button>
            </div>

            {feedback && (
                <div className="vendas-feedback-message">
                    {feedback}
                </div>
            )}

            <div className="vendas-grid-container">
                <div className="vendas-left-column">
                    
                    <fieldset className="vendas-fieldset customer-fieldset">
                        <legend>Dados do Cliente</legend>
                        <div className="vendas-form-row">
                            <label htmlFor="cpfCliente">CPF:</label>
                            <input 
                                type="text" 
                                id="cpfCliente" 
                                name="cpf" 
                                value={clienteData.cpf} 
                                onChange={handleClienteChange} 
                                placeholder="Apenas números"
                            />
                            <button className="vendas-btn-search" onClick={handleSearchCliente}>
                                Pesquisar
                            </button>
                        </div>
                        <div className="vendas-form-row full-width">
                            <label htmlFor="clienteNome">Nome:</label>
                            <input 
                                type="text" 
                                id="clienteNome" 
                                name="nome" 
                                value={clienteData.nome} 
                                onChange={handleClienteChange}
                                disabled={!!clienteData.nome} 
                                placeholder="Digite o nome ou use o CPF para buscar"
                            />
                        </div>
                    </fieldset>

                    <fieldset className="vendas-fieldset product-fieldset">
                        <legend>Adicionar Produto</legend>
                        <div className="vendas-form-row">
                            <label htmlFor="codProduto">Código:</label>
                            <input 
                                type="text" 
                                id="codProduto" 
                                name="codigo" 
                                value={produtoInput.codigo} 
                                onChange={handleProdutoChange} 
                                placeholder="Cód. do produto"
                            />
                            <button className="vendas-btn-search" onClick={handleSearchProduto}>
                                Pesquisar
                            </button>
                        </div>
                        
                        <div className="vendas-form-row full-width">
                            <label htmlFor="produtoNome">Produto:</label>
                            <input 
                                type="text" 
                                id="produtoNome" 
                                name="produto" 
                                value={produtoInput.produto} 
                                onChange={handleProdutoChange} 
                                placeholder="Nome/Descrição do produto"
                            />
                        </div>
                        
                        <div className="vendas-form-row">
                            <label htmlFor="precoUnitario">Preço Unit.:</label>
                            <input 
                                type="text" 
                                id="precoUnitario" 
                                name="preco" 
                                value={produtoInput.preco} 
                                onChange={handlePriceChange}
                                placeholder="0,00"
                            />
                            <label htmlFor="qtdProduto">Qtd:</label>
                            <input 
                                type="number" 
                                id="qtdProduto" 
                                name="qtd" 
                                value={produtoInput.qtd} 
                                onChange={handleProdutoChange} 
                                min="1"
                                placeholder="1"
                            />
                        </div>

                        <div className="vendas-action-add-item">
                            <button className="vendas-btn-add" onClick={handleAddItem}>
                                + Adicionar Item
                            </button>
                        </div>
                    </fieldset>
                </div>
                
                <div className="vendas-right-column">
                    
                    <fieldset className="vendas-fieldset cart-fieldset">
                        <legend>Carrinho de compras</legend>
                        <CarrinhoTabela />
                    </fieldset>

                    <fieldset className="vendas-fieldset total-fieldset">
                        <legend>Total da Venda</legend>
                        <div className="vendas-total-display">
                            <span className="vendas-total-label">TOTAL DA VENDA:</span>
                            <span className="vendas-total-value">
                                R$ {totalVenda.toFixed(2).replace('.', ',')}
                            </span>
                        </div>
                    </fieldset>
                    
                    <div className="vendas-final-actions">
                        <button className="vendas-btn-payment" onClick={handleFinalizarVenda}>
                            PAGAMENTO
                        </button>
                        <button className="vendas-btn-cancel" onClick={() => { setCarrinho([]); setClienteData({ cpf: '', nome: '' }); setFeedback('Venda Cancelada.'); navigate('/vendas'); }}>
                            CANCELAR VENDA
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CadastrarVendas;