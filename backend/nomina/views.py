from rest_framework import viewsets, permissions
from .serializers import *
from .models import *

# Create your views here.
class JornadaViewSet(viewsets.ModelViewSet):
    queryset = Jornada.objects.all()
    serializer_class = JornadaSerializer

class NominaViewSet(viewsets.ModelViewSet):
    queryset = Nomina.objects.all()
    serializer_class = NominaSerializer

class PlanillaViewSet(viewsets.ModelViewSet):
    queryset = Planilla.objects.all()
    serializer_class = PlanillaSerializer
    