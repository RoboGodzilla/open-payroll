from rest_framework import serializers
from .models import Empleado, Grupo

class EmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'


class GrupoSerializer(serializers.ModelSerializer):
    empleadoinfo = EmpleadoSerializer(source='empleados', read_only=True, many=True)
    class Meta:
        model = Grupo
        fields = '__all__'