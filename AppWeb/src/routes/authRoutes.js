const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('/models/User.js');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);  // Aquí parece ser el problema
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();
        res.redirect('/login'); // Redirige al usuario a la página de inicio de sesión después del registro
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el usuario');
    }
});


// Ruta para manejar el inicio de sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            // Aquí deberías establecer alguna forma de sesión o token
            res.redirect('/perfil'); // O alguna ruta protegida
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al iniciar sesión');
    }
});

module.exports = router;