const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');


// Controlador para la recuperación de contraseña
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const response = await authService.recoverPassword({ email });
        if (!response) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Password recovery email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para restablecer la contraseña
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        const response = await authService.resetPassword({ token, newPassword });
        if (!response) {
            return res.status(400).json({ message: 'Invalid token or password' });
        }

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para el registro de usuario
exports.register = async (req, res) => {
    try {
        const { nombre, apellido, username, email, password } = req.body;

        message = '';
        // Validación de campos requeridos acumular el message
        if (!nombre) {
            message += 'El campo nombre es requerido, ';
        }
        if (!apellido) {
            message += 'El campo apellido es requerido, ';
        }   
        if (!username) {
            message += 'El campo username es requerido, ';
        }   
        if (!email) {
            message += 'El campo email es requerido, ';
        }
        if (!password) {
            message += 'El campo password es requerido, ';
        }
        if (message) {
            return res.status(400).json({ message });
        }

        // Verifica si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }

        // Crea un nuevo usuario
        user = new User({
            nombre,
            apellido,
            username,
            email,
            password
        });

        // Hash de la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guarda el usuario en la base de datos
        await user.save();

        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};