from django.db import models

class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    rg = models.CharField(max_length=30, blank=True)
    cpf = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    telefone = models.CharField(max_length=30, blank=True)
    celular = models.CharField(max_length=30, blank=True)
    cep = models.CharField(max_length=100, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    numero = models.IntegerField(null=True, blank=True)
    complemento = models.CharField(max_length=200, blank=True)
    bairro = models.CharField(max_length=100, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    estado = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.nome

class Funcionario(models.Model):
    nome = models.CharField(max_length=100)
    rg = models.CharField(max_length=30)
    cpf = models.CharField(max_length=20)
    email = models.EmailField(max_length=200)
    senha = models.CharField(max_length=50)
    cargo = models.CharField(max_length=100)
    nivel_acesso = models.CharField(max_length=50)
    telefone = models.CharField(max_length=30, blank=True)
    celular = models.CharField(max_length=30, blank=True)
    cep = models.CharField(max_length=100, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    numero = models.IntegerField(null=True, blank=True)
    complemento = models.CharField(max_length=200, blank=True)
    bairro = models.CharField(max_length=100, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    estado = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.nome

class Fornecedor(models.Model):
    nome = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=20)
    email = models.EmailField(max_length=200, blank=True)
    telefone = models.CharField(max_length=30, blank=True)
    celular = models.CharField(max_length=30, blank=True)
    cep = models.CharField(max_length=100, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    numero = models.IntegerField(null=True, blank=True)
    complemento = models.CharField(max_length=200, blank=True)
    bairro = models.CharField(max_length=100, blank=True)
    cidade = models.CharField(max_length=100, blank=True)
    estado = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.nome
