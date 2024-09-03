const User = require('../models/userModel');
const userService = require('../services/userService');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await userService.updateUserById(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const user = await userService.deleteUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

// Partially update user by ID
exports.partialUpdateUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const user = await userService.partialUpdateUserById(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};
