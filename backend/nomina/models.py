from django.db import models
import uuid

from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Jornada(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    empleado = models.ForeignKey('empleados.Empleado', on_delete=models.CASCADE)
    fecha = models.DateField()
    feriado = models.BooleanField(default=False)
    septimo_dia = models.BooleanField(default=False)
    vacaciones = models.BooleanField(default=False)
    ausencia = models.BooleanField(default=False)
    horas_extra = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    multa = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

class Formula(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    formula = models.JSONField()
    
class Nomina(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha_inicial = models.DateField()
    fecha_final = models.DateField()
    empleado = models.ForeignKey('empleados.Empleado', on_delete=models.CASCADE)
    vacaciones = models.BooleanField(default=False)
    aguinaldo = models.BooleanField(default=False)
    jornadas = models.ManyToManyField(Jornada)
    formulas = models.ManyToManyField('Formula')
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    calculos = ArrayField(base_field=models.DecimalField(max_digits=10, decimal_places=2))
    totales = ArrayField(base_field=models.DecimalField(max_digits=10, decimal_places=2))

class Planilla(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha_inicial = models.DateField()
    fecha_final = models.DateField()
    vacaciones = models.BooleanField(default=False)
    aguinaldo = models.BooleanField(default=False)
    viaticos = models.BooleanField(default=False)
    nominas = models.ManyToManyField(Nomina)
