from rest_framework import viewsets
from .models import Venda
from .serializers import VendaSerializer, VendaCreateSerializer

class VendaViewSet(viewsets.ModelViewSet):
    queryset = Venda.objects.all().order_by("-id")

    def get_serializer_class(self):
        if self.action in ["list", "retrieve"]:
            return VendaSerializer  # <-- LISTAGEM CERTA
        if self.action == "create":
            return VendaCreateSerializer  # <-- CRIAÇÃO CERTA
        return VendaSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context
