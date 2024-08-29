const userService = require('../services/userService');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const token = await userService.login(req.body);
    res.json({ token });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Password recovery
exports.recoverPassword = async (req, res) => {
  try {
    const recoveryCode = await userService.recoverPassword(req.body.email);
    res.json({ recoveryCode });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    await userService.deleteUserById(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// Partially update user by ID
exports.partialUpdateUserById = async (req, res) => {
  try {
    const user = await userService.partialUpdateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
