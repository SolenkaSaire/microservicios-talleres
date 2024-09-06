const express = require("express");
const {
    register,
    login,
    recoverPassword,
} = require("../controllers/authController");
const router = express.Router();

// Ruta de registro
router.post("/", register);

// Ruta de inicio de sesión
router.post("/login", login);

// Ruta de recuperación de contraseña
router.put("/password", recoverPassword);

module.exports = router;
