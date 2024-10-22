const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');

// Controlador para actualizar la contraseña
exports.recoverPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ message: 'Email y nueva contraseña son requeridos' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await authService.updatePassword({ email, newPassword });
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error del servidor al recuperar la contraseña' });
    }
};


// Controlador para el registro de usuario
exports.register = async (req, res) => {
    try {
        const { nombre, apellido, username, email, password } = req.body;
        let message = '';

        if (!nombre) message += 'El campo nombre es requerido, ';
        if (!apellido) message += 'El campo apellido es requerido, ';
        if (!username) message += 'El campo username es requerido, ';
        if (!email) message += 'El campo email es requerido, ';
        if (!password) message += 'El campo password es requerido, ';
        if (message) return res.status(400).json({ message: message.slice(0, -2) });

        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(409).json({ message: 'El email o username ya existen' });
        }

        user = new User({ nombre, apellido, username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        console.log("User created successfully")
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: user._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error del servidor al registrar usuario' });
    }
};

// Controlador para el inicio de sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Failed login attempt: Invalid credentials")
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Failed login attempt: Invalid credentials")
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        console.log("User logged in successfully")
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error del servidor al iniciar sesión' });
    }
};