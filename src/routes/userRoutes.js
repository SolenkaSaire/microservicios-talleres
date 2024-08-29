const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateMiddleware = require('../middlewares/validateMiddleware');
const { userSchemas } = require('../schemas/userSchemas');

const router = express.Router();

// Public routes
router.post('/auth/login', validateMiddleware.validateBody(userSchemas.loginRequest), userController.loginUser);
router.post('/auth/users', validateMiddleware.validateBody(userSchemas.registerRequest), userController.registerUser);
router.post('/auth/user/password', validateMiddleware.validateBody(userSchemas.passwordRecovery), userController.recoverPassword);

// Protected routes
router.use(authMiddleware.authenticateJWT);
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', validateMiddleware.validateBody(userSchemas.user), userController.updateUserById);
router.delete('/users/:id', userController.deleteUserById);
router.patch('/users/:id', validateMiddleware.validateBody(userSchemas.userUpdate), userController.partialUpdateUserById);

module.exports = router;
