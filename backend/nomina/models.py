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

class Nomina(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha_inicial = models.DateField()
    fecha_final = models.DateField()
    empleado = models.ForeignKey('empleados.Empleado', on_delete=models.CASCADE)
    vacaciones = models.BooleanField(default=False)
    aguinaldo = models.BooleanField(default=False)
    jornadas = models.ManyToManyField(Jornada)
    prestaciones = models.ManyToManyField('formulas.Prestaciones')
    deducciones = models.ManyToManyField('formulas.Deducciones')
    viaticos = models.ManyToManyField('formulas.Viaticos')
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    calculo_prestaciones = ArrayField(base_field=models.DecimalField(max_digits=10, decimal_places=2))
    calculo_deducciones = ArrayField(base_field=models.DecimalField(max_digits=10, decimal_places=2))
    calculo_viaticos = ArrayField(base_field=models.DecimalField(max_digits=10, decimal_places=2))
    total_prestaciones = models.DecimalField(max_digits=10, decimal_places=2)
    total_deducciones = models.DecimalField(max_digits=10, decimal_places=2)
    total_viaticos = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class Planilla(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fecha_inicial = models.DateField()
    fecha_final = models.DateField()
    vacaciones = models.BooleanField(default=False)
    aguinaldo = models.BooleanField(default=False)
    viaticos = models.BooleanField(default=False)
    nomina = models.ManyToManyField(Nomina)
    total_salarios = models.DecimalField(max_digits=10, decimal_places=2)
    total_prestaciones = models.DecimalField(max_digits=10, decimal_places=2)
    total_deducciones = models.DecimalField(max_digits=10, decimal_places=2)
    total_viaticos = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2, default=0)
