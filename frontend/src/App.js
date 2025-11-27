import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Telas/Login"
import Home from "./Telas/Home"
import PesquisaClientes from "./Telas/Clientes"
import Funcionarios from "./Telas/Funcionarios"
import Fornecedores from "./Telas/Fornecedores"
import Produtos from "./Telas/Produtos"
import Vendas from "./Telas/Vendas"
import CadastroClientes from "./Telas/CadastroCliente"
import CadastroFuncionarios from "./Telas/CadastroFuncionarios"
import CadastroFornecedores from "./Telas/CadastroFornecedores"
import CadastroProdutos from "./Telas/CadastroProdutos"
import CadastrarVendas from "./Telas/CadastrarVendas"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/PesquisaClientes" element={<PesquisaClientes/>}/>
        <Route path="/CadastroCliente" element={<CadastroClientes/>}/>
        <Route path="/Funcionarios" element={<Funcionarios/>}/>
        <Route path="/CadastroFuncionarios" element={<CadastroFuncionarios/>}/>
        <Route path="/Fornecedores" element={<Fornecedores/>}/>
        <Route path="/CadastroFornecedores" element={<CadastroFornecedores/>}/>
        <Route path="/Produtos" element={<Produtos/>}/>
        <Route path="/CadastroProdutos" element={<CadastroProdutos/>}/>
        <Route path="/vendas" element={<Vendas/>}/>
        <Route path="/CadastrarVendas" element={<CadastrarVendas/>}/>        

      </Routes>
    </BrowserRouter>
  );
};

export default App;
