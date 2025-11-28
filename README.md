# Software Legado de Mercado

## Porcentagens de participação

| Nome             | Participação |
|------------------|--------------|
| Kaio Quevedo     | 20%          |
| Tiago Storqui    | 30%          |
| Matheus Ricardo  | 30%          |
| Victor B. Netto  | 20%          |


---

---

# Sistema de Mercado — Fullstack (Django + React + Docker)

Este repositório contém um sistema completo de gerenciamento para um mercado, incluindo **cadastro de clientes, fornecedores, funcionários, produtos e vendas**.
A aplicação é dividida em:

* **Backend**: Django + Django REST Framework
* **Frontend**: React (CRA)
* **Infraestrutura**: Docker e Docker Compose

---

## Estrutura do Projeto

```
├── docker-compose.yml
├── Dockerfile
├── frontend/                # Aplicação React
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── Components/
│   │   ├── Hooks/
│   │   ├── Telas/          # Telas principais (Clientes, Produtos, Vendas...)
│   │   ├── App.js
│   │   └── index.js
│   └── public/
│       ├── index.html
│       └── assets
│
└── sistema_mercado/         # Backend Django
    ├── core/                # Configurações centrais
    ├── pessoas/             # Módulo de Clientes, Funcionários, Fornecedores
    ├── produtos/            # Módulo de Produtos
    ├── vendas/              # Módulo de Vendas
    ├── requirements.txt
    ├── manage.py
    └── sistema_mercado/
```

---

# Tecnologias Utilizadas

### **Backend**

* Python 3.13
* Django
* Django REST Framework
* PostgreSQL (opcional dependendo do docker-compose)

### **Frontend**

* React (Create React App)
* Axios
* React Hooks
* CSS Modules e CSS padrão

### **Deploy / Infra**

* Docker
* Docker Compose

---

# Funcionalidades

### **Clientes**

* Cadastro, listagem, edição e remoção
* Tabelas e busca dinâmica
* Tela completa com componentes reutilizáveis

### **Fornecedores**

* CRUD completo
* Hooks de integração com API
* Interface padronizada

### **Funcionários**

* Cadastro e gerenciamento
* Listas e tabelas personalizadas

### **Produtos**

* Cadastro de produtos
* Busca e filtros
* Tabela personalizada

### **Vendas**

* Registro de vendas
* Tabela, filtros e ações

---

# Executando com Docker

### 1. **Build + Up**

```sh
docker-compose up --build
```

### 2. Acesse:

| Serviço          | URL                                                        |
| ---------------- | ---------------------------------------------------------- |
| **Frontend**     | [http://localhost:3000](http://localhost:3000)             |
| **Backend API**  | [http://localhost:8000](http://localhost:8000)             |
| **Django Admin** | [http://localhost:8000/admin](http://localhost:8000/admin) |

---

# Execução manual (sem Docker)

## Backend (Django)

### 1. Instale dependências

```sh
pip install -r requirements.txt
```

### 2. Aplique migrações

```sh
python manage.py migrate
```

### 3. Rode o servidor

```sh
python manage.py runserver
```

---

## Frontend (React)

### 1. Instale dependências

```sh
cd frontend
npm install
```

### 2. Rode o projeto

```sh
npm start
```

---

# Estrutura dos Módulos Django

### **Pessoas**

Contém modelos e endpoints para:

* Cliente
* Funcionário
* Fornecedor

Inclui:

* `models.py`
* `serializers.py`
* `views.py`
* `permissions.py`

---

### **Produtos**

Gerenciamento de produtos e estoque básico.

---

### **Vendas**

Registra vendas com referência a clientes e produtos.

---

# Docker Compose

Seu `docker-compose.yml` organiza:

* Backend
* Frontend
* Banco (se existir)
* Rede interna entre containers

---

# Hooks (Frontend)

O projeto possui hooks personalizados para comunicação com API:

* `useClientes.js`
* `useFornecedores.js`
* `useFuncionarios.js`
* `useProdutos.js`
* `useVendas.js`

Cada um encapsula:

* GET
* POST
* PUT
* DELETE

---

# Telas do Sistema

Dentro de `src/Telas/`, estão todas as telas principais:

* **Home**
* **Login**
* **Clientes**
* **Fornecedores**
* **Funcionários**
* **Produtos**
* **Vendas**
* **CadastrarVendas**
* **CadastroCliente / Fornecedores / Funcionários / Produtos**

---

# Licença

Você pode adicionar uma licença caso queira (MIT, Apache etc.).

---

# Contato

Caso esteja criando para um projeto da faculdade, inclua:

* Nome
* RA
* Professor
* Disciplina

---
