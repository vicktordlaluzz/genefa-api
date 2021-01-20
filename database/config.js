const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        // REMOTA
        // process.env.DB_CON
        // LOCAL
        // process.env.DB_CON_LOCAL
        await mongoose.connect(process.env.DB_CON_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Base de datos conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la base de datos');
    }
};

module.exports = {
    dbConnection
}