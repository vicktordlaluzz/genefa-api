const { Schema, model } = require('mongoose');

const movimientoSchema = Schema({
    factura: {
        type: Schema.Types.ObjectId,
        ref: 'Factura',
        required: true
    },
    salBase: {
        type: Number,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    concepto: {
        type: String,
        required: true
    }
});


module.exports = model('Movimiento', movimientoSchema);