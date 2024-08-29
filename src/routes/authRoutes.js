const express = require('express');
const { register} = require('../controllers/authController'); // Verifica esta línea
const router = express.Router();

// Ruta de registro
router.post('/register', register);

// Ruta de inicio de sesión
//router.post('/login', login);

// Ruta de recuperación de contraseña
//router.post('/password', recoverPassword);

module.exports = router;
