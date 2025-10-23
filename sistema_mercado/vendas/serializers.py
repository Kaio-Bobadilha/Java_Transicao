from rest_framework import serializers
from .models import Venda, ItemVenda
from produtos.models import Produto
from django.db import transaction 

class ItemVendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVenda
        fields = ['id', 'produto', 'qtd'] 
        read_only_fields = ('id', 'subtotal') # 'subtotal' é apenas para leitura

class VendaSerializer(serializers.ModelSerializer):
    itens = ItemVendaSerializer(many=True)

    class Meta:
        model = Venda
        # O usuário envia 'cliente' e 'itens'
        # 'funcionario', 'data_venda' e 'total_venda' serão definidos pelo sistema
        fields = ['id', 'cliente', 'funcionario', 'data_venda', 'total_venda', 'observacoes', 'itens']
        read_only_fields = ('id', 'funcionario', 'data_venda', 'total_venda')

    def create(self, validated_data):
        # Pegar dados
        itens_data = validated_data.pop('itens')
        funcionario_logado = self.context['request'].user.funcionario
        
        total_venda_calculado = 0
        itens_para_criar = []
        produtos_para_atualizar = []

        # Loop de validacao e calculo
        for item_data in itens_data:
            produto = item_data['produto']
            qtd_pedida = item_data['qtd']

            # 4. Verificar estoque
            if qtd_pedida > produto.qtd_estoque:
                raise serializers.ValidationError(
                    f"Estoque insuficiente para {produto.descricao}. Disponível: {produto.qtd_estoque}"
                )
            
            # Regras de negocios
            subtotal_calculado = qtd_pedida * produto.preco
            item_data['subtotal'] = subtotal_calculado
            total_venda_calculado += subtotal_calculado
            
            produto.qtd_estoque -= qtd_pedida
            produtos_para_atualizar.append(produto)
            itens_para_criar.append(item_data)

        # Salvamento de venda
        venda = Venda.objects.create(
            **validated_data, 
            total_venda=total_venda_calculado,
            funcionario=funcionario_logado
        )

        # Atualiza itens da venda
        for item_data in itens_para_criar:
            ItemVenda.objects.create(venda=venda, **item_data)
            
        # Atualiza o estoque de todos os produtos
        Produto.objects.bulk_update(produtos_para_atualizar, ['qtd_estoque'])

        return venda