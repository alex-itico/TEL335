# TEL335
Diseño de Apps Web y Móviles

Proyecto Arriendo de Canchas USM

## Requisitos de instalación

Para ejecutar este proyecto, necesitas tener Node.js y npm instalados en tu sistema. Luego, debes instalar las dependencias necesarias ejecutando el siguiente comando:

```sh
npm install <dependencie>

```
En donde "dependencie" se colocan los siguientes módulos:
- bcryptjs
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose
- path
## Configuración del archivo .env
Es necesario crear un archivo .env dentro de la carpeta AppWeb del proyecto. Este archivo debe contener la siguiente configuración para la conexión a la base de datos:

```sh
URL_CONNECTION = "mongodb+srv://chris_ayudante:TEL335_grupo1@tel335webos.qhu1cab.mongodb.net/?retryWrites=true&w=majority&appName=TEL335WebOS/test"

```
## Cómo ejecutar el proyecto:

1. Clona el repositorio.
2. Navega a la carpeta del proyecto (cd AppWeb).
3. Instala las dependencias con npm install.
4. Crea el archivo .env con la configuración proporcionada (dentro de la carpeta AppWeb)
5. Ejecuta el proyecto con el comando:
```sh
node index.js

```
