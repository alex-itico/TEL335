'use strict'

const express = require('express');
const path = require('path'); // Importar el módulo path
const router = express.Router();

router
.get('/', (req, res) => {
    // Usar path.join para construir la ruta de forma segura
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
})
.get('/integrantes', (req, res) => {
    // Usar path.join para asegurar compatibilidad entre sistemas operativos
    res.sendFile(path.join(__dirname, '..', 'views', 'integrantes.html'));
})
.get('/acerca', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'acerca.html'));
})

module.exports = router;

