const express = require('express');
const client = require('prom-client');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
require('dotenv').config();
require('./config/dbConfig');

const app = express();

app.use(bodyParser.json());

// Cargar el archivo de especificación OpenAPI
const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir una ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del taller!');
});

// Rutas
/**
 * @swagger
 * /api/users:
 *  get:
 *   summary: Obtiene todos los usuarios
 *   description: Obtiene todos los usuarios
 *   responses:
 *      200:
 *          description: OK
 *         content:
 *          application/json:
 *             schema:
 *                type: array
 *  
 *      404:
 *          description: No se encontraron usuarios
 *
 */
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Endpoint para métricas
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// Manejo de rutas no definidas
app.use((req, res, next) => {
    res.status(404).json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

module.exports = app;