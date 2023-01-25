from rest_framework import serializers
from .models import Prestaciones, Deducciones, Viaticos

class PrestacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prestaciones
        fields = '__all__'

class DeduccionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deducciones
        fields = '__all__'

class ViaticosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Viaticos
        fields = '__all__'