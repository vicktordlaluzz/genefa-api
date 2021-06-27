const mongoose = require('mongoose');
const Concepto = require('../models/concepto');

const dbConnection = async() => {
    try {
        // REMOTA
        // process.env.DB_CON
        // LOCAL
        // process.env.DB_CON_LOCAL
        await mongoose.connect(process.env.DB, {
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

const setUp = async () => {
    try {
        const conceptos = await Concepto.countDocuments();
        if(conceptos < 1){
            await Concepto.insertMany([
                {
                    concepto: 'Aportación PATRONAL en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'
                },
                {
                    concepto: 'Aportación PATRONAL en Subcuenta RETIRO ISSSTE 08'
                },
                {
                    concepto: 'Aportación TRABAJADOR en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'
                },
                {
                    concepto: 'Aportación en Subcuenta CUOTA SOCIAL ISSSTE'
                },
                {
                    concepto: 'Aportación FOVISSSTE 2008'
                },
                {
                    concepto: 'Aportación TRABAJADOR en Cuenta AHORRO VOLUNTARIO'
                }
            ]);
        }
        
    } catch (error) {
        console.error(error);
    }
}
module.exports = {
    dbConnection,
    setUp
}
