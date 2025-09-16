from django.contrib import admin
from .models import Produto

@admin.register(Produto)
class ProdutoAdmin(admin.ModelAdmin):
    list_display = ('id', 'descricao', 'preco', 'qtd_estoque', 'fornecedor')
    search_fields = ('descricao',)
    list_filter = ('fornecedor',)
