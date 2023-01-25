from django.db import models
import uuid

# Create your models here.
class Empleado(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    fecha_contratacion = models.DateField()
    numero_seguro_social = models.CharField(max_length=8)
    salario = models.DecimalField(max_digits=10, decimal_places=2)
    cont_vacaciones = models.IntegerField()
    is_active = models.BooleanField(default=True)

class Grupo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    empleados = models.ManyToManyField(Empleado)
    is_active = models.BooleanField(default=True)