# Manual de Usuario - OpenPayroll

## Introducción

El Manual de Usuario proporciona una guía detallada sobre cómo utilizar la aplicación OpenPayroll, un proyecto de cálculo de nómina desarrollado con las siguientes tecnologías:

- React
- Vite
- Django
- Django Rest Framework
- PostgreSQL

A continuación, se describen los pasos necesarios para configurar el proyecto, así como las funcionalidades disponibles para el usuario.

## Requisitos del Sistema

Antes de comenzar, asegúrese de contar con los siguientes requisitos en su sistema:

- Node.js
- Python
- PostgreSQL

## Instalación

1. Clonar el repositorio del proyecto desde GitHub:

    ```bash
    git clone https://github.com/RoboGodzilla/open-payroll
    ```

2. Instalar las dependencias del backend:

    ```bash
    cd openpayroll/backend
    pipenv install
    pipenv shell
    ```

3. Configurar la base de datos:

- Cree una base de datos en PostgreSQL para OpenPayroll.
- Cree un archivo `.env` en la carpeta `openpayroll/backend` y agregue la siguiente configuración:
    ```bash
    DEBUG=True
    SECRET_KEY= # Generar una clave secreta
    ALLOWED_HOST=*
    DATABASE_URL= # Agregar la URL de la base de datos
    ```

4. Realizar las migraciones de la base de datos:

    ```bash
    python manage.py migrate
    ```

5. Instalar las dependencias del frontend:

    ```bash
    cd openpayroll/frontend
    npm install
    npm run dev
    ```

## Uso

A continuación se describen las funcionalidades disponibles en la aplicación OpenPayroll:

### 1. Inicio de Sesión

Para acceder al sistema, siga estos pasos:

1. Abra su navegador web e ingrese la URL de OpenPayroll: `http://localhost:5173`.
2. Se mostrará la página de inicio de sesión.
3. Ingrese sus credenciales de usuario (nombre de usuario y contraseña).
4. Haga clic en el botón "Iniciar Sesión" para ingresar al sistema.

### 2. Panel de Control

Una vez iniciada la sesión, será redirigido al panel de control, donde podrá realizar las siguientes acciones:

- Ver información general de la nómina.
- Crear, editar y eliminar registros de trabajadores.
- Ver historial de jornadas laborales.
- Ver historial de colillas de pagos.
- Ver historial de planillas.
- Generar y descargar formatos de impresión de colillas de pago y planillas de pago.
- Generar y editar formulas de cálculo de nómina.

### 3. Gestión de Trabajadores

La sección de gestión de trabajadores le permite administrar la información de los trabajadores de la empresa. Siga estos pasos:

1. En el panel de control, haga clic en la opción "Trabajadores" en el menú lateral.
2. Verá la lista de trabajadores existentes.
3. Para crear un nuevo trabajador, haga clic en el botón "Agregar" y complete los datos requeridos.
4. Para editar o eliminar un trabajador existente, haga clic en el botón correspondiente en la lista de trabajadores.

> La sección de grupos de trabajadores es una funcionalidad adicional que se implementará en futuras versiones.

### 4. Gestión de Formulas de Cálculo

La sección de gestión de formulas de cálculo le permite administrar las formulas de cálculo de nómina. Siga estos pasos:

1. En el panel de control, haga clic en la opción "Formulas" en el menú lateral.
2. Verá la lista de formulas de cálculo existentes.
3. Para crear una nueva formula de cálculo, haga clic en el botón "Agregar" y complete los datos requeridos.
    > Las formulas de cálculo se llenan siguiendo la siguiente sintaxis:
    > - Los campos de valor se llenan con los nombres de los campos calculables de la tabla de trabajadores. Por ejemplo: `salario`, `horas_trabajadas`, `dias_trabajados`, etc.
    > - Los operadores aritméticos se llenan con los siguientes símbolos: `+`, `-`, `*`, `/`.
    > - Las formulas de cálculo se pueden anidar seleccionando el nombre de la formula de cálculo deseada en el campo de valor.
    > - Las formulas de cálculo se analizan de arriba a abajo en el orden de entrada de los campos de valor.
4. Para editar o eliminar una formula de cálculo existente, haga clic en el botón correspondiente en la lista de formulas de cálculo.

### 5. Generación de Jornadas Laborales

La sección de generación de jornadas laborales le permite generar las jornadas laborales de los trabajadores. Siga estos pasos:

1. En el panel de control, haga clic en la opción "Jornadas" en el menú lateral.
2. Verá la lista de jornadas laborales existentes.
3. El programa se encargará de generar las jornadas laborales de los trabajadores automáticamente si detecta que no existen jornadas laborales para el dia actual.
4. Para editar una jornada laboral existente, haga clic en el botón correspondiente en la lista de jornadas laborales.

> Las jornadas laborales se generan automáticamente cada vez que se inicia sesión en el sistema. Esta funcionalidad requiere que el usuario haya creado previamente los trabajadores e inicie sesión en el sistema al menos una vez al día.

> Las jornadas laborales se tratan como un registro de asistencia de los trabajadores. El usuario puede editar las jornadas laborales para corregir errores en el registro de asistencia, pero no tiene permitido eliminarlas para evitar conflictos con la validación de datos.

### 6. Generación de Colillas de Pago

La sección de generación de colillas de pago le permite generar las colillas de pago de los trabajadores. Siga estos pasos:

1. En el panel de control, haga clic en la opción "Colillas" en el menú lateral.
2. Verá la lista de colillas de pago existentes.
3. El programa se encargará de generar las colillas de pago de los trabajadores automáticamente si detecta que no existen colillas de pago para el mes actual.
4. Para actualizar una colilla de pago existente en caso de cambios a los datos del trabajador, haga clic en el botón correspondiente en la lista de colillas de pago.

> Las colillas de pago se generan automáticamente cada vez que se inicia sesión en el sistema. Esta funcionalidad requiere que el usuario haya creado previamente los trabajadores e inicie sesión en el sistema al menos una vez al mes.

> Las colillas de pago se tratan como un registro de pago de los trabajadores. El usuario puede actualizar las colillas de pago para corregir errores en el registro de pago en la colilla del mes actual, pero no tiene permitido eliminarlas para evitar conflictos con la validación de datos.

### 7. Generación de Planillas

La sección de generación de planillas le permite generar las planillas de pago de los trabajadores. Siga estos pasos:

1. En el panel de control, haga clic en la opción "Planillas" en el menú lateral.
2. Verá la lista de planillas existentes.
3. Para generar una nueva planilla de pago mensual, haga clic en el botón "Generar Planilla" y complete los datos requeridos.
4. Para editar una planilla de pago existente, haga clic en el botón correspondiente en la lista de planillas.

> Las planillas de pago se generan unicamente cuando hay nóminas de pago disponibles para el mes seleccionado.

> Las planillas de pago se tratan como un registro de pago de los trabajadores. El usuario puede editar las planillas de pago para corregir errores en el registro de pago en la planilla del mes actual, pero no tiene permitido eliminarlas para evitar conflictos con la validación de datos.

### 8. Generación de Formatos de Impresión

La sección de generación de formatos de impresión le permite generar los formatos de impresión de colillas de pago y planillas de pago. Siga estos pasos:

1. Diríjase a la sección de colillas de pago o planillas de pago dependiendo del formato que desee generar.
2. Haga clic en la colilla o planilla que desea generar.
3. Haga clic en el botón "Imprimir" para generar el formato de impresión.

### 9. Cierre de Sesión

Para cerrar la sesión, siga estos pasos:

1. Haga clic en el botón "Cerrar Sesión" en el menú lateral.
2. Se mostrará la página de inicio de sesión.

## Solución de Problemas

Si encuentra algún problema durante la instalación o el uso de OpenPayroll, siga estos pasos de solución de problemas:

1. Asegúrese de haber seguido todos los pasos de instalación correctamente.
2. Verifique que todas las dependencias estén instaladas y actualizadas.
3. Si el problema persiste, puede redactar un informe de error en la sección de problemas del repositorio de GitHub.

## Resumen

OpenPayroll ofrece una solución completa para el cálculo y gestión de nóminas de trabajadores. Siga las instrucciones de este manual para configurar y utilizar todas las funcionalidades disponibles.

Si tienes alguna pregunta adicional o necesitas más ayuda, no dudes en contactarnos. ¡Disfrute usando OpenPayroll!