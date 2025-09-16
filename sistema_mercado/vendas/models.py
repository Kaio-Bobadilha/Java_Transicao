from django.db import models
from pessoas.models import Cliente, Funcionario
from produtos.models import Produto

class Venda(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE)
    data_venda = models.DateTimeField(auto_now_add=True)
    total_venda = models.DecimalField(max_digits=10, decimal_places=2)
    observacoes = models.TextField(blank=True)

    def __str__(self):
        return f"Venda {self.id} - {self.cliente.nome}"

class ItemVenda(models.Model):
    venda = models.ForeignKey(Venda, on_delete=models.CASCADE, related_name="itens")
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    qtd = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.qtd}x {self.produto.descricao}"
