from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        # Aqui esta assumundo que ja temos o funcionario logado 
        return request.user.funcionario.nivel_acesso == 'ADMIN'