// Importa la función de conexión a la base de datos
const connectToDatabase = require('./database.js'); 
const express = require('express');
const app = express();
const path = require('path');



// Llama a la función de conexión a la base de datos
connectToDatabase();

const routes = require('./routes/app.js'); // Rutas a app.js dentro de la carpeta de rutas
const authRoutes = require('./routes/authRoutes.js'); // Rutas a authRoutes.js dentro de la carpeta de rutas

// Configurar el puerto usando una variable de entorno o un valor predeterminado
const PORT = process.env.PORT || 3000;

// Configurar la carpeta pública para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para analizar JSON y cuerpos de formularios URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Incorporar las rutas definidas en otros archivos
app.use(routes);
app.use(authRoutes);

// Manejador de errores 404 para cualquier ruta no encontrada
app.use((req, res, next) => {
    res.status(404).send('Lo sentimos, no pudimos encontrar eso!');
});

// Iniciar el servidor y confirmar el puerto en uso
app.listen(PORT, () => {
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});


// Iniciar el servidor y confirmar el puerto en uso
app.listen(PORT, () => {
    console.log(`Corriendo aplicación en el puerto ${PORT}`);
});
