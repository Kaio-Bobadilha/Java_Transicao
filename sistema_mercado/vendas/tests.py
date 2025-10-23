from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from pessoas.models import Funcionario, Cliente, Fornecedor
from produtos.models import Produto
from .models import Venda

class VendaAPITests(APITestCase):

    def setUp(self):
        # Criar usuário e funcionário para autenticação
        self.user = User.objects.create_user(username='vendedor', password='123', first_name='Vendedor')
        self.funcionario = Funcionario.objects.create(user=self.user, cargo='Vendedor', nivel_acesso='USER')
        
        # Criar dados
        self.cliente = Cliente.objects.create(nome='Cliente Teste', cpf='111.111.111-11')
        self.fornecedor = Fornecedor.objects.create(nome='Fornecedor Teste', cnpj='22.222.222/0001-22')
        self.produto1 = Produto.objects.create(
            descricao='Produto A', 
            preco=10.00, 
            qtd_estoque=20, 
            fornecedor=self.fornecedor
        )

        # Autenticar o cliente de teste
        self.client.force_authenticate(user=self.user)

    def test_create_venda_com_estoque_suficiente(self):
        """ Testa se a venda é criada e o estoque é abatido corretamente. """
        url = '/api/vendas/' # rota do url
        data = {
            'cliente': self.cliente.id,
            'itens': [
                {'produto': self.produto1.id, 'qtd': 5}
            ]
        }
        
        response = self.client.post(url, data, format='json')
        
        # Verificar se a venda foi criada
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Verificar se o estoque foi abatido
        self.produto1.refresh_from_db() # Recarrega o produto do BD
        self.assertEqual(self.produto1.qtd_estoque, 15) # calculo
        
        # Verificar se o total foi calculado
        self.assertEqual(response.data['total_venda'], '50.00') # 5 * 10.00

    def test_create_venda_com_estoque_insuficiente(self):
        """ Testa se a venda é bloqueada se o estoque for insuficiente. """
        url = '/api/vendas/'
        data = {
            'cliente': self.cliente.id,
            'itens': [
                {'produto': self.produto1.id, 'qtd': 25} # Pedindo 25, mas só tem 20
            ]
        }
        
        response = self.client.post(url, data, format='json')
        
        # Verificar se o servidor retornou erro
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Verificar se o estoque NAO foi alterado
        self.produto1.refresh_from_db()
        self.assertEqual(self.produto1.qtd_estoque, 20) # Deve continuar 20
        
        # Verificar se a Venda NAO foi criada
        self.assertEqual(Venda.objects.count(), 0)