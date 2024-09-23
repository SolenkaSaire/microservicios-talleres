const User = require("../models/userModel");
const userService = require("../services/userService");
const bcrypt = require("bcryptjs");

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res
                .status(404)
                .json({ message: "No se encontraron usuarios" });
        }
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({
            message: "Error del servidor al obtener usuarios",
        });
    }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res
                .status(403)
                .json({
                    message: "No autorizado para acceder a esta información",
                });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(user);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(400).json({ message: "Formato de ID inválido" });
        }
        res.status(500).json({
            message: "Error del servidor al obtener el usuario",
        });
    }
};

// Actualizar usuario por ID
exports.updateUserById = async (req, res) => {
    try {
        // Verificar si el usuario está autorizado para actualizar su información
        if (req.user.id !== req.params.id) {
            return res
                .status(403)
                .json({
                    message: "No autorizado para actualizar esta información",
                });
        }

        // Verificar si el cuerpo de la solicitud está vacío
        if (Object.keys(req.body).length === 0) {
            return res
                .status(400)
                .json({
                    message: "El cuerpo de la solicitud no puede estar vacío",
                });
        }

        // Buscar el usuario en la base de datos
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos de usuario
        for (const key in req.body) {
            if (key !== "password") {
                user[key] = req.body[key];
            }
        }

        // Si se incluye el campo 'password', encriptar antes de guardar
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        // Guardar los cambios del usuario
        await user.save();

        // Responder con el usuario actualizado
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error del servidor al actualizar usuario",
        });
    }
};

// Eliminar usuario por ID
exports.deleteUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res
                .status(403)
                .json({ message: "No autorizado para eliminar este usuario" });
        }

        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(400).json({ message: "Formato de ID inválido" });
        }
        res.status(500).json({
            message: "Error del servidor al eliminar usuario",
        });
    }
};

// Eliminar todos los usuarios
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: "Todos los usuarios han sido eliminados exitosamente" });
    } catch (err) {
        res.status(500).json({
            message: "Error del servidor al eliminar todos los usuarios",
        });
    }
};

// Actualización parcial de usuario
exports.partialUpdateUserById = async (req, res) => {
    try {
        if (req.user.id !== req.params.id) {
            return res
                .status(403)
                .json({
                    message: "No autorizado para actualizar esta información",
                });
        }

        if (Object.keys(req.body).length === 0) {
            return res
                .status(400)
                .json({
                    message: "El cuerpo de la solicitud no puede estar vacío",
                });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(400).json({ message: "Formato de ID inválido" });
        }
        res.status(500).json({
            message: "Error del servidor al actualizar usuario",
        });
    }
};
