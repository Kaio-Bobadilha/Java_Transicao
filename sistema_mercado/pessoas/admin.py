from django.contrib import admin
from .models import Cliente, Funcionario, Fornecedor

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'email', 'telefone', 'cidade', 'estado')
    search_fields = ('nome', 'cpf', 'email')

@admin.register(Funcionario)
class FuncionarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cpf', 'cargo', 'nivel_acesso', 'email')
    search_fields = ('nome', 'cpf', 'email')
    list_filter = ('cargo', 'nivel_acesso')

@admin.register(Fornecedor)
class FornecedorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cnpj', 'email', 'telefone', 'cidade', 'estado')
    search_fields = ('nome', 'cnpj', 'email')
