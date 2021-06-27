require('dotenv').config();

const express = require('express');
const cors = require('cors');

// configuracion de la base de datos
const { dbConnection, setUp } = require('./database/config');

// Crear el servidor de express
const app = express();

// Configuracion CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();
setUp();

app.use( express.static('public'));
// Rutas
app.use('/api/clientes/', require('./routes/clientes'));
app.use('/api/tramites/', require('./routes/tramites'));
app.use('/api/facturas/', require('./routes/facturas'));
app.use('/api/usuarios/', require('./routes/usuarios'));
app.use('/api/auth/', require('./routes/auth'));


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})