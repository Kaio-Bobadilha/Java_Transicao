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

    # Criamos propriedades para exibir o nome e o email do usuário associado
    def nome(self, obj):
        return obj.user.get_full_name() or obj.user.username

    def email(self, obj):
        return obj.user.email

    # Melhorar legibilidade no admin
    nome.short_description = 'Nome'
    email.short_description = 'Email'


@admin.register(Fornecedor)
class FornecedorAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'cnpj', 'email', 'telefone', 'cidade', 'estado')
    search_fields = ('nome', 'cnpj', 'email')
