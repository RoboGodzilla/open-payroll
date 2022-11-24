from rest_framework import viewsets, permissions
from .serializers import *
from .models import *

# Create your views here.
class PrestacionesViewSet(viewsets.ModelViewSet):
    queryset = Prestaciones.objects.all()
    serializer_class = PrestacionesSerializer

class DeduccionesViewSet(viewsets.ModelViewSet):
    queryset = Deducciones.objects.all()
    serializer_class = DeduccionesSerializer

class ViaticosViewSet(viewsets.ModelViewSet):
    queryset = Viaticos.objects.all()
    serializer_class = ViaticosSerializer
    