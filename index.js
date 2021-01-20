require('dotenv').config();

const express = require('express');
const cors = require('cors');

// configuracion de la base de datos
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configuracion CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/clientes/', require('./routes/clientes'));
app.use('/api/tramites/', require('./routes/tramites'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})