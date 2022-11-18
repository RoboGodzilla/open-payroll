from rest_framework import serializers
from .models import Prestaciones, Deducciones, Viaticos

class PrestacionesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Prestaciones
        fields = ['__all__']

class DeduccionesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Deducciones
        fields = ['__all__']

class ViaticosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Viaticos
        fields = ['__all__']