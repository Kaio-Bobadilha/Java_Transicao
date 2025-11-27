from rest_framework import serializers
from .models import Produto
from pessoas.models import Fornecedor
from pessoas.serializers import FornecedorSerializer


class ProdutoSerializer(serializers.ModelSerializer):
    fornecedor = FornecedorSerializer(read_only=True)
    fornecedor_id = serializers.PrimaryKeyRelatedField(
        queryset=Fornecedor.objects.all(),
        write_only=True
    )

    class Meta:
        model = Produto
        fields = [
            'id',
            'descricao',
            'preco',
            'qtd_estoque',
            'fornecedor',
            'fornecedor_id'
        ]

    def create(self, validated_data):
        fornecedor = validated_data.pop("fornecedor_id")
        produto = Produto.objects.create(fornecedor=fornecedor, **validated_data)
        return produto

    def update(self, instance, validated_data):
        fornecedor = validated_data.pop("fornecedor_id", None)
        if fornecedor:
            instance.fornecedor = fornecedor

        return super().update(instance, validated_data)
