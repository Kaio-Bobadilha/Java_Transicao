import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./Telas/Login"
import Home from "./Telas/Home"
import PesquisaClientes from "./Telas/Clientes"
import Funcionarios from "./Telas/Funcionarios"
import Fornecedores from "./Telas/Fornecedores"
import Produtos from "./Telas/Produtos"


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/PesquisaClientes" element={<PesquisaClientes/>}/>
        <Route path="/Funcionarios" element={<Funcionarios/>}/>
        <Route path="/Fornecedores" element={<Fornecedores/>}/>
        <Route path="/Produtos" element={<Produtos/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
