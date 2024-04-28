# Establece la imagen base de Node.js
FROM node:16-alpine

# Crea y establece el directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias de la aplicación
# Aprovecha la caché de las capas de Docker copiando primero el package.json y ejecutando npm install
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/app.js"]

