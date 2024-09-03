const app = require('./app');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Cargar el archivo de especificación OpenAPI
//const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));

// Ruta para la documentación de Swagger
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cargar el archivo de especificación OpenAPI
const swaggerDocument = YAML.load(path.join(__dirname, './openapi.yaml'));

// Ruta para la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Definir una ruta para la raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del taller!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
