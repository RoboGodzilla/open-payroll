from django.db import models
import uuid

# Create your models here.
class Prestaciones(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    concepto = models.CharField(max_length=100)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    operador = models.CharField(max_length=1)
    is_active = models.BooleanField(default=True)

class Deducciones(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    concepto = models.CharField(max_length=100)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    operador = models.CharField(max_length=1)
    is_active = models.BooleanField(default=True)

class Viaticos(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    concepto = models.CharField(max_length=100)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    operador = models.CharField(max_length=1)
    is_active = models.BooleanField(default=True)