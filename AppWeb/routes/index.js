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

.get('/login', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
})

.get('/register', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
})

.get('/reserva', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'reserva.html'));
})

<<<<<<< HEAD
module.exports = router;
=======
.get('/recuperar', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'recuperar.html'));
})

.get('/nueva', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'nueva.html'));
})

.get('/faq', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'faq.html'));
})

.get('/perfil', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'perfil.html'));
})

.get('/editar_perfil', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'editar_perfil.html'));
})

.get('/ver_mis_reservas', (req, res) => {
    // Igual que arriba, usando path.join
    res.sendFile(path.join(__dirname, '..', 'views', 'verMisReserva.html'));
})



module.exports = router;

>>>>>>> origin/main
