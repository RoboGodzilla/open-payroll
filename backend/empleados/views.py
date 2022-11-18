from rest_framework import viewsets, permissions
from .serializers import *
from .models import *

# Create your views here.
class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class GrupoViewSet(viewsets.ModelViewSet):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)