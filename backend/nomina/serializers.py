from rest_framework import serializers
from .models import Jornada, Nomina, Planilla, Formula
from empleados.serializers import EmpleadoSerializer

class JornadaSerializer(serializers.ModelSerializer):
    empleadoinfo = EmpleadoSerializer(source='empleado', read_only=True)
    class Meta:
        model = Jornada
        fields = '__all__'

class NominaSerializer(serializers.ModelSerializer):
    empleadoinfo = EmpleadoSerializer(source='empleado', read_only=True)
    class Meta:
        model = Nomina
        fields = '__all__'

class PlanillaSerializer(serializers.ModelSerializer):
    nominainfo = NominaSerializer(source='nominas', read_only=True, many=True)
    class Meta:
        model = Planilla
        fields = '__all__'

class FormulaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formula
        fields = '__all__'