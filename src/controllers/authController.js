const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para el registro de usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifica si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email or username already exists' });
        }

        // Crea un nuevo usuario
        user = new User({
            username,
            email,
            password
        });

        // Hash de la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Guarda el usuario en la base de datos
        await user.save();

        // Genera un token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.status(201).json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
