from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from produtos.views import ProdutoViewSet
from vendas.views import VendaViewSet

from pessoas.views import ClienteViewSet, FuncionarioViewSet, FornecedorViewSet

router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'funcionarios', FuncionarioViewSet)
router.register(r'fornecedores', FornecedorViewSet)
router.register(r'produtos', ProdutoViewSet)
router.register(r'vendas', VendaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
