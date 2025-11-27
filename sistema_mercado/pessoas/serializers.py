from rest_framework import serializers
from .models import Cliente, Funcionario, Fornecedor
from django.contrib.auth.models import User


# ---------------------------------
# USER (somente leitura)
# ---------------------------------
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


# ---------------------------------
# CLIENTE
# ---------------------------------

# Leitura
class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


# Criação (POST)
class ClienteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


# Update (PUT/PATCH)
class ClienteUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


# ---------------------------------
# FUNCIONÁRIO
# ---------------------------------

# Leitura
class FuncionarioSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    nome = serializers.SerializerMethodField()

    def get_nome(self, obj):
        return obj.user.first_name or obj.user.username

    class Meta:
        model = Funcionario
        fields = [
            'id', 'nome', 'user',
            'rg', 'cpf', 'cargo', 'nivel_acesso',
            'telefone', 'celular', 'cep', 'endereco',
            'numero', 'complemento', 'bairro', 'cidade', 'estado'
        ]


# Criação (POST)
class FuncionarioCreateSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    senha = serializers.CharField(write_only=True)

    class Meta:
        model = Funcionario
        fields = [
            'nome', 'email', 'senha',
            'rg', 'cpf', 'cargo', 'nivel_acesso',
            'telefone', 'celular',
            'cep', 'endereco', 'numero', 'complemento',
            'bairro', 'cidade', 'estado'
        ]

    def create(self, validated_data):
        nome = validated_data.pop("nome")
        email = validated_data.pop("email")
        senha = validated_data.pop("senha")

        user = User.objects.create_user(
            username=email,
            email=email,
            password=senha,
            first_name=nome
        )

        funcionario = Funcionario.objects.create(
            user=user,
            **validated_data
        )
        return funcionario


# Update (PUT/PATCH)
class FuncionarioUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Funcionario
        fields = [
            'rg', 'cpf', 'cargo', 'nivel_acesso',
            'telefone', 'celular', 'cep', 'endereco',
            'numero', 'complemento', 'bairro', 'cidade', 'estado'
        ]

# ---------------------------------
# FORNECEDORES
# ---------------------------------

# Leitura
class FornecedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'


# Criação
class FornecedorCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'


# Update
class FornecedorUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fornecedor
        fields = '__all__'
