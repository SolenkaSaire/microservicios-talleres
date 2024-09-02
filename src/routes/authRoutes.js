const express = require("express");
const {
    register,
    login,
    recoverPassword,
    resetPassword,
} = require("../controllers/authController");
const router = express.Router();

// Ruta de registro
router.post("/register", register);

// Ruta de inicio de sesión
router.post("/login", login);

// Ruta de recuperación de contraseña
router.post("/password", recoverPassword);

// Ruta para restablecer la contraseña
router.post("/reset-password", resetPassword);

module.exports = router;
