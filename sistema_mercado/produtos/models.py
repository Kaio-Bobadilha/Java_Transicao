from django.db import models
from pessoas.models import Fornecedor

class Produto(models.Model):
    descricao = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    qtd_estoque = models.IntegerField()
    fornecedor = models.ForeignKey(Fornecedor, on_delete=models.CASCADE)

    def __str__(self):
        return self.descricao
