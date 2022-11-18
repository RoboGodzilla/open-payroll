from rest_framework import viewsets, permissions
from .serializers import *
from .models import *

# Create your views here.
class JornadaViewSet(viewsets.ModelViewSet):
    queryset = Jornada.objects.all()
    serializer_class = JornadaSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class NominaViewSet(viewsets.ModelViewSet):
    queryset = Nomina.objects.all()
    serializer_class = NominaSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

class PlanillaViewSet(viewsets.ModelViewSet):
    queryset = Planilla.objects.all()
    serializer_class = PlanillaSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)