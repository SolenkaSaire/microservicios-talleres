const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./config/dbConfig');

const app = express();

app.use(bodyParser.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Manejo de rutas no definidas
app.use((req, res, next) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

module.exports = app;
