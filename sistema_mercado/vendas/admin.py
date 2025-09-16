from django.contrib import admin
from .models import Venda, ItemVenda

class ItemVendaInline(admin.TabularInline):
    model = ItemVenda
    extra = 1

@admin.register(Venda)
class VendaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'funcionario', 'data_venda', 'total_venda')
    search_fields = ('cliente__nome', 'funcionario__nome')
    list_filter = ('data_venda',)
    inlines = [ItemVendaInline]

@admin.register(ItemVenda)
class ItemVendaAdmin(admin.ModelAdmin):
    list_display = ('id', 'venda', 'produto', 'qtd', 'subtotal')
    search_fields = ('produto__descricao', 'venda__id')
