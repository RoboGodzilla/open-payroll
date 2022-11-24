"""openpayroll URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from empleados import views as empleados_views
from formulas import views as formulas_views
from nomina import views as nomina_views


router = routers.DefaultRouter()
router.register(r'empleados', empleados_views.EmpleadoViewSet)
router.register(r'grupos', empleados_views.GrupoViewSet)
router.register(r'prestaciones', formulas_views.PrestacionesViewSet)
router.register(r'deducciones', formulas_views.DeduccionesViewSet)
router.register(r'viaticos', formulas_views.ViaticosViewSet)
router.register(r'jornada', nomina_views.JornadaViewSet)
router.register(r'nomina', nomina_views.NominaViewSet)
router.register(r'planilla', nomina_views.PlanillaViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rest_framework.urls', namespace='rest_framework'))
]
