from rest_framework import serializers
from .models import Venda, ItemVenda
from produtos.models import Produto
from produtos.serializers import ProdutoSerializer
from pessoas.serializers import ClienteSerializer, FuncionarioSerializer


# ------------------------
# SERIALIZER DE ITENS (LEITURA)
# ------------------------
class ItemVendaSerializer(serializers.ModelSerializer):
    produto = ProdutoSerializer(read_only=True)

    class Meta:
        model = ItemVenda
        fields = ['id', 'produto', 'qtd', 'subtotal']


# ------------------------
# SERIALIZER DE VENDA (LEITURA)
# ------------------------
class VendaSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer(read_only=True)
    itens = ItemVendaSerializer(many=True, read_only=True)

    class Meta:
        model = Venda
        fields = [
            'id',
            'cliente',
            'data_venda',
            'total_venda',
            'observacoes',
            'itens'
        ]


# ------------------------
# SERIALIZER PARA CRIAÇÃO DE VENDA (POST)
# ------------------------
class ItemVendaCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemVenda
        fields = ['produto', 'qtd']


class VendaCreateSerializer(serializers.ModelSerializer):
    itens = ItemVendaCreateSerializer(many=True)

    class Meta:
        model = Venda
        fields = ['cliente', 'observacoes', 'itens']

    def create(self, validated_data):
        itens_data = validated_data.pop('itens')

        total_venda = 0
        itens_salvar = []
        produtos_atualizar = []

        for item in itens_data:
            produto = item['produto']
            qtd = item['qtd']

            if qtd > produto.qtd_estoque:
                raise serializers.ValidationError(
                    f"Estoque insuficiente para {produto.descricao}. Disponível: {produto.qtd_estoque}"
                )

            subtotal = qtd * produto.preco
            total_venda += subtotal

            produto.qtd_estoque -= qtd
            produtos_atualizar.append(produto)

            itens_salvar.append({
                "produto": produto,
                "qtd": qtd,
                "subtotal": subtotal
            })

        venda = Venda.objects.create(
            total_venda=total_venda,
            **validated_data
        )

        for item in itens_salvar:
            ItemVenda.objects.create(venda=venda, **item)

        Produto.objects.bulk_update(produtos_atualizar, ['qtd_estoque'])

        return venda
