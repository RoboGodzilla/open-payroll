# Generated by Django 4.1.3 on 2022-11-18 01:32

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('empleados', '0001_initial'),
        ('formulas', '0001_initial'),
        ('nomina', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Nomina',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fecha_inicial', models.DateField()),
                ('fecha_final', models.DateField()),
                ('vacaciones', models.BooleanField(default=False)),
                ('aguinaldo', models.BooleanField(default=False)),
                ('salario', models.DecimalField(decimal_places=2, max_digits=10)),
                ('calculo_prestaciones', django.contrib.postgres.fields.ArrayField(base_field=models.DecimalField(decimal_places=2, max_digits=10), size=None)),
                ('calculo_deducciones', django.contrib.postgres.fields.ArrayField(base_field=models.DecimalField(decimal_places=2, max_digits=10), size=None)),
                ('calculo_viaticos', django.contrib.postgres.fields.ArrayField(base_field=models.DecimalField(decimal_places=2, max_digits=10), size=None)),
                ('total_prestaciones', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_deducciones', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_viaticos', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('deducciones', models.ManyToManyField(to='formulas.deducciones')),
                ('empleado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='empleados.empleado')),
                ('jornadas', models.ManyToManyField(to='nomina.jornada')),
                ('prestaciones', models.ManyToManyField(to='formulas.prestaciones')),
                ('viaticos', models.ManyToManyField(to='formulas.viaticos')),
            ],
        ),
        migrations.CreateModel(
            name='Planilla',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('fecha_inicial', models.DateField()),
                ('fecha_final', models.DateField()),
                ('vacaciones', models.BooleanField(default=False)),
                ('aguinaldo', models.BooleanField(default=False)),
                ('total_salarios', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_prestaciones', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_deducciones', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_viaticos', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=10)),
                ('nomina', models.ManyToManyField(to='nomina.nomina')),
            ],
        ),
    ]
