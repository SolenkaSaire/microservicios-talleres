const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, userController.getAllUsers);
router.get('/:id', authMiddleware, userController.getUserById);
router.put('/:id', authMiddleware, userController.updateUserById);
router.delete('/:id', authMiddleware, userController.deleteUserById);
router.patch('/:id', authMiddleware, userController.partialUpdateUserById);

module.exports = router;