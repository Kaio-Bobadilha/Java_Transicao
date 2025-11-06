from django.contrib import admin
from pessoas.models import Cliente, Funcionario
from produtos.models import Produto
from vendas.models import Venda

admin.site.register(Cliente)
admin.site.register(Funcionario)
admin.site.register(Produto)
admin.site.register(Venda)
