const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

// Controlador para la recuperación de contraseña
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const response = await authService.recoverPassword({ email });
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para restablecer la contraseña
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const response = await authService.resetPassword({ token, newPassword });
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para el registro de usuario
exports.register = async (req, res) => {
    try {
        const { nombre, apellido, username, email, password } = req.body;

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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

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

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controlador para la recuperación de contraseña
exports.recoverPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Aquí puedes implementar la lógica para enviar un correo de recuperación de contraseña

        res.json({ message: 'Password recovery email sent' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};