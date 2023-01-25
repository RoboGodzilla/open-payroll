# OpenPayroll
## Nómina gratuita, rápida y sencilla
[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/RoboGodzilla/open-payroll)

OpenPayroll es un gestor de nómina que busca facilitar las tareas administrativas de las empresas,
evitando errores y multas que pueden dañar tu negocio.

## Tecnologías

OpenPayroll usa las siguientes tecnologías:

- [ReactJs]
- [VSCode]
- [Django]
- [Django REST Framework]
- [PostgreSQL]
- [MaterialUI]
- [Formik]

## Instalacion

OpenPayroll requiere:
[node.js] v17+
[Python](https://www.python.org/downloads/) v3.10+
[Pipenv](https://pipenv.pypa.io/en/latest/)
[PostgreSQL]
para funcionar.

Instala las dependencias

```sh
cd openpayroll
cd backend
python -m pipenv install
cd ..
cd frontend
npm i
```

#### Ejecutar Sistema

Corre estos comandos en 2 terminales separadas:

Primera terminal:
```sh
cd openpayroll/backend/
python ./manage.py migrate
python ./manage.py runserver
```
Segunda terminal:
```sh
cd openpayroll/frontend/
npm start
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # (Estos son links de referencia)

   [node.js]: <http://nodejs.org>
   [ReactJs]: <https://es.reactjs.org/>
   [VSCode]: <https://code.visualstudio.com/>
   [Django]: <https://www.djangoproject.com/>
   [Django REST Framework]: <https://www.django-rest-framework.org/>
   [PostgreSQL]: <https://www.postgresql.org/download/>
   [MaterialUI]: <https://mui.com/>
   [Formik]: <https://formik.org/>

