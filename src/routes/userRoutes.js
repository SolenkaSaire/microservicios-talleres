const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
// Implementa las rutas updateUser y deleteUser con sus métodos correspondientes

module.exports = router;
