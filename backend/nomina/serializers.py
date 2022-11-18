from rest_framework import serializers
from .models import Jornada, Nomina, Planilla

class JornadaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Jornada
        fields = ['__all__']

class NominaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Nomina
        fields = ['__all__']

class PlanillaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Planilla
        fields = ['__all__']