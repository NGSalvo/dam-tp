<a href="">
    <img src="doc/logo-fiuba.png" alt="logo" title="Goto IoT" align="right" width="60" height="60" style="background-color: white"/>
</a>

# Trabajo práctico de "Desarollo de aplicaciones multiplataforma"

Este proyecto es una aplicación híbrida que se ejecuta en parte sobre el ecosistema `Docker` que se compone de un servicio de base de datos `MySQL` y su administrador `PHPMyAdmin`. Asimismo cuenta de un frontend realizaco con la plataforma `Ionic` y de un backend realizado con `Typescript`.

## Comenzando 🚀

Esta sección es una guía con los pasos escenciales para que puedas poner en marcha la aplicación.

<details><summary><b>Mira los pasos necesarios</b></summary><br>

### Instalar las dependencias

Para correr este proyecto es necesario que instales `Docker` y `Docker Compose`.

En [este artículo](https://www.gotoiot.com/pages/articles/docker_installation_linux/) publicado en la web están los detalles para instalar Docker y Docker Compose en una máquina Linux.

En caso que quieras instalar las herramientas en otra plataforma o tengas algún incoveniente, podes leer la documentación oficial de [Docker](https://docs.docker.com/get-docker/) y también la de [Docker Compose](https://docs.docker.com/compose/install/).

Continua con la descarga del código cuando tengas las dependencias instaladas y funcionando.

### Descargar el código

Para descargar el código, utiliza este comando desde la terminal o con tu IDE favorito.

```
git clone https://github.com/NGSalvo/dam-tp
```

> No es necesario contar con una cuenta en Github.

### Instalar y ejecutar

**Base de datos**
Para instalar y levantar la base de datos tenes que correr el comando `docker-compose up` desde la raíz del proyecto. Este comando va a descargar las imágenes de Docker de la base datos, del admin de la DB, y luego ponerlas en funcionamiento.

Para acceder al administrador de la BD ingresa a la URL [http://localhost:8001/](http://localhost:8001/)

**Backend**
Para la instalacion y puesta en marcha del backend dirigirse a /src/backend y ejecutar el comando

```
npm install
```

para instalar las dependencias necesarias para ejecutarlo. Una vez finalizada la instalación entonces correr el comando

```
npm run serve
```

para levantar el servicio.

Para acceder a la documentación de la API ingresar a la URL [http://localhost:3000/docs](http://localhost:3000/docs)

**Frontend**
Para instalar y correr el frontend, pararse sobre la ruta /src/fronted y ejecutar el comando

```
npm install
```

para instalar las dependencias del código. Acto seguido correr el comando

```
npm run lab
```

Para acceder al cliente web ingresa a a la URL [http://localhost:8200/](http://localhost:8200/) o [http://localhost:8100/](http://localhost:8100/) para el formato APP.

Si pudiste acceder al cliente web significa que la aplicación se encuentra corriendo bien.

> Si te aparece un error la primera vez que corres la app, detené el proceso y volvé a iniciarla. Esto es debido a que el backend espera que la DB esté creada al iniciar, y en la primera ejecución puede no alcanzar a crearse. A partir de la segunda vez el problema queda solucionado.

</details>

Continuá explorando el proyecto una vez que lo tengas funcionando.

## Configuraciones de funcionamiento 🔩

Al crearse la aplicación se ejecutan los contenedores de Docker de cada servicio, se crea la base de datos y sus tablas.

## Detalles principales 🔍

En esta sección vas a encontrar las características más relevantes del proyecto.

<details><summary><b>Mira los detalles más importantes de la aplicación</b></summary><br>
<br>

### Base de datos

La base de datos se encuentra en un contenedor de Docker. Al inicio de la aplicación no hay registros en la BD, por lo que lo primero que hace es generar la estructura.

### El cliente web

El cliente web es una Single Page Application que se comunica con el servicio en NodeJS mediante JSON a través de requests HTTP. Puede consultar el estado de dispositivos en la base de datos (por medio del servicio en NodeJS) y también cambiar el estado de los mismos.

### El servicio web

El servicio en **NodeJS** posee distintos endpoints para comunicarse con el cliente web mediante requests HTTP enviando **JSON** en cada transacción. Procesando estos requests es capaz de comunicarse con la base de datos para consultar y controlar el estado de los dispositivos, y devolverle una respuesta al cliente web también en formato JSON. Así mismo el servicio es capaz de servir el código del cliente web.

### Documentación con Swagger API

La documentación de la API está a cargo del estándar definido en la **OpenAPI Specification** compuesta por una interfáz para API REST que permite tanto a las personas como a las máquinas descubrir y comprender las capacidades de un servicio sin tener acceso al código o documentación.

### Angular

**Angular** es una plataforma de desarollo en el lenguaje de JavaScript que a su vez está desarollada en el lenguaje de programación libre y de código abierto desarrollado y mantenido por Microsoft, **TypeScript**.

### Ionic

**Ionic** es un conjunto de herramientas de interfaz de usuario de codigo abierto para el desarrollo de aplicaciones híbridas. Nos brinda la facilidad de portabilizar el código a diferentes plataformas móviles.

### Organización del proyecto

En la siguiente ilustración podés ver cómo está organizado el proyecto para que tengas en claro qué cosas hay en cada lugar.

```sh
├── db                          # directorio de la DB
│   ├── data                    # estructura y datos de la DB
│   └── dumps                   # directorio de estructuras de la DB
│       └── dump-dam_fiuba.sql  # estructura con la base de datos "dam_fiuba"
├── doc                         # documentación general del proyecto
└── src                         # directorio código fuente
│   ├── backend                 # directorio para el backend de la aplicación
│   │   ├── scripts             # directorio de scripts
│   │   ├   └──db.sql           # DDL de la BD
│   │   ├── requests            # directorio de consultas HTTP
│   │   ├   ├──devices.http     # consultas de dispositivos
│   │   ├   ├──irrigation-log.http  # consultas de registro de riego
│   │   ├   ├──measurements.http    # consultas de mediciones
│   │   ├   └──solenoid-valves.http # consultas de valvulas
│   │   ├── src                 # directorio de código fuente
│   │   ├   ├──routes           # directorio de las rutas (Endpoints de la API)
│   │   ├     └──...            # declaración de las diferentes rutas con especificación de la documentación de Swagger API
│   │   ├   ├──controllers      # directorio de los métodos con las llamadas a BD
│   │   ├     └──...            # código de los diferentes metodos separados por Endpoint
│   │   ├   ├──models           # directorio de los modelos de datos
│   │   ├     └──...            # código de los diferentes modelos
│   │   ├   ├──app.ts           # código principal del backend
│   │   ├   ├──config.ts        # configuración de la BD
│   │   ├   ├──db.ts            # código de conexion a la base de datos
│   │   ├   ├──index.ts         # entrada de backend
│   │   ├   └──swaggerOptions.ts #configuración de Swagger API
│   │   ├── nodemon.json        # configuración de proyecto NodeJS
│   │   ├── package.json        # configuración de proyecto NodeJS
│   │   ├── package-lock.json   # configuración de proyecto NodeJS
│   │   └── tsconfig.json       # configuración de proyecto NodeJS
│   └── frontend                # directorio para el frontend de la aplicación
│       ├── src                 # directorio de código fuente
│       ├   ├──app              # directorio de código principal
│       ├   ├   ├──device       # directorio de código de dispositivos
│       ├   ├     └──...        #
│       ├   ├   ├──home         # directorio de código de lista de dispositivos
│       ├   ├     └──...        #
│       ├   ├   ├──irrigation-log-list  # directorio de código lista de regitros de riego
│       ├   ├     └──...        #
│       ├   ├   ├──measurement-list # directorio de código de lista de mediciones
│       ├   ├     └──...        #
│       ├   ├   ├──models       # directorio de modelos
│       ├   ├     └──...        #
│       ├   ├   ├──services     # directorio de servicios
│       ├   ├     └──...        #
│       ├   ├   ├──app-routing.module.ts  # direccion de rutas de la aplicación
│       ├   ├   ├──app.component.ts       # código del componente principal de la aplicación
│       ├   ├   ├──app.component.scss     # estilos del componente principal de la aplicación
│       ├   ├   ├──app.component.html     # maquetación del componente principal de la aplicación
│       ├   ├   └──app.module.ts          # módulos del componente principal de la aplicación
│       ├   ├──assets           # directorio de recursos estáticos
│       ├     └──...            #
│       ├   ├──environments     # directorio de configuración de entorno
│       ├     └──...            #
│       ├   ├──theme            # directorio de estilos
│       ├     └──...            #
│       ├   ├──global.scss      # configuración de la BD
│       ├   ├──index.html       # código de conexion a la base de datos
│       ├   ├──main.ts          # punto de entrada de la aplicación
│       ├   └──swaggerOptions.ts #configuración de Swagger API
│       ├── ...                 # resto de archivos de configuración
├── docker-compose.yml          # archivo donde se aloja la configuración completa
├── README.md                   # este archivo
├── CHANGELOG.md                # archivo para guardar los cambios del proyecto
├── LICENSE.md                  # licencia del proyecto
```

</details>

## Detalles de implementación 💻

En esta sección podés ver los detalles específicos de funcionamiento del código y que son los siguientes.

<details><summary><b>Mira los detalles de implementación</b></summary><br>

### Frontend

El frontend contiene el código principal distribuído dentro de la carpeta `app` en src.
Su estructura consiste de componenentes, cada uno separado en una carpeta diferente, que a su vez contiene la vista y su controlador.
Estos componentes son:

- device
- home
- irrigation-log-list
- measurement-list
- app
  Asi mismo en la carpeta `app` esta compuesto por los servicios utilizados en los componentes y los modelos.
  Los servicios son:
- device.service.ts
- irrigation-log.service.ts

`app` es el punto de entrada de la aplicación. Contiene solo un enrutador donde se cargará la primera vista. Es el componente que esta declarado dentro del `index.html`.
`home` es el primer componente con información. Representa la lista de los dispositivos tras la obtención de los datos.
`device` es el componente que representa un dispositivo.
`irrigation-log-list` es el componente por el que el modal es cargado cuando se ejecuta desde un dispositivo. Muestra la lista de registros de riego del dispositivo.
`measurement-list` vincula las mediciones de un dispositivo y las lista.

`device.service.ts` contiene los llamados a una REST API.
`irrigation-log.service.ts` contiene los llamados a una REST API.

Interactua con el backend por medio de las llamadas HTTP, realizando las correspondientes peticions GET (para obtener información del servidor), PUT (para actualizar información), POST (para agregar información) y DELETE (para eliminar información).

### Backend

El backend consiste de todos los endpoints para que el cliente web interactue. Estos endpoints contienen la lógica para escribir y obtener información de la base de datos `dam_fiuba`.

Los métodos utilizados son GET, POST, PUT y DELETE.

GET obtiene información.
POST agrega nueva información.
PUT modifica información.
DELETE elimina información.

El código está segregado principalmente en las rutas y los controladores.
Las rutas contienen el endpoint a consultar, la especificación para documentar el endpoint y el llamado a los métodos que se ejecutarán con el endpoint.
Los controladores describen los métodos que serán utilizado en los diferentes endpoints y están conformados por las llamadas a la base de datos.

<details><summary><b>Ver los endpoints disponibles</b></summary><br>

Para acceder a la documentación de la API levantar el backend e ingresar a la URL [http://localhost:3000/docs](http://localhost:3000/docs)

</details>

</details>

## Tecnologías utilizadas 🛠️

En esta sección podés ver las tecnologías más importantes utilizadas.

<details><summary><b>Mira la lista completa de tecnologías</b></summary><br>

- [Docker](https://www.docker.com/) - Ecosistema que permite la ejecución de contenedores de software.
- [Docker Compose](https://docs.docker.com/compose/) - Herramienta que permite administrar múltiples contenedores de Docker.
- [Node JS](https://nodejs.org/es/) - Motor de ejecución de código JavaScript en backend.
- [Ionic](https://ionicframework.com/) - Bibliotecas de estilo responsive para aplicaciones web.
- [TypeScript](https://www.typescriptlang.org/) - Superset de JavaScript tipado y con clases.
- [Swagger API](https://swagger.io/) - Especificación de API

</details>

## Autores 👥

Las colaboraciones principales fueron realizadas por:

- **[Agustin Bassi](https://github.com/agustinBassi)**: Estructura inicial del proyecto.
- **[Brian Ducca](https://github.com/brianducca)**: Ayuda para conectar el backend a la base de datos, puesta a punto de imagen de Docker.
- **[Nicolás Salvo](https://github.com/NGSalvo)**: realizó el ejercicio para la materia DAM de la Carrera de Especialización en Internet de las Cosas.

.

---

# Licencia

Este proyecto está bajo Licencia ([MIT](https://choosealicense.com/licenses/mit/)). Podés ver el archivo [LICENSE](LICENSE) para más detalles sobre el uso de este material.
