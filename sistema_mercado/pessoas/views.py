from django.shortcuts import render
from rest_framework import viewsets
from .models import Cliente, Funcionario, Fornecedor
from .serializers import ClienteSerializer, FuncionarioSerializer, FornecedorSerializer

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer

class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer

class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()
    serializer_class = FornecedorSerializer


