const express = require("express");
const {
    register,
    login,
    recoverPassword,
} = require("../controllers/authController");
const jwt = require('jsonwebtoken');
const router = express.Router();

// Ruta de registro
router.post("/", register);

// Ruta de inicio de sesión
router.post("/login", login);

// Ruta de recuperación de contraseña
router.put("/password", recoverPassword);

// Ruta de verificación de token
router.post('/validate-token', (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ valid: true, user: decoded });
    } catch (err) {
        res.status(401).json({ valid: false, message: 'Token is not valid' });
    }
});

module.exports = router;




