from rest_framework import viewsets
from .models import Cliente, Funcionario, Fornecedor
from .serializers import (
    ClienteSerializer, ClienteCreateSerializer, ClienteUpdateSerializer,
    FuncionarioSerializer, FuncionarioCreateSerializer, FuncionarioUpdateSerializer,
    FornecedorSerializer, FornecedorCreateSerializer, FornecedorUpdateSerializer
)


# ------------------------------
# CLIENTE
# ------------------------------
class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return ClienteCreateSerializer
        if self.action in ["update", "partial_update"]:
            return ClienteUpdateSerializer
        return ClienteSerializer


# ------------------------------
# FUNCIONÁRIO
# ------------------------------
class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return FuncionarioCreateSerializer
        if self.action in ["update", "partial_update"]:
            return FuncionarioUpdateSerializer
        return FuncionarioSerializer

    def get_permissions(self):
        # 🔓 Liberado temporariamente até criarmos o login
        return []


# ------------------------------
# FORNECEDOR
# ------------------------------
class FornecedorViewSet(viewsets.ModelViewSet):
    queryset = Fornecedor.objects.all()

    def get_serializer_class(self):
        if self.action == "create":
            return FornecedorCreateSerializer
        if self.action in ["update", "partial_update"]:
            return FornecedorUpdateSerializer
        return FornecedorSerializer
