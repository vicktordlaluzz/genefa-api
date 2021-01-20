const { Schema, model } = require('mongoose');
const { stringify } = require('uuid');

const tramiteSchema = Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    salAnual: {
        type: Number,
        required: true
    },
    deduccion: {
        type: Number,
        required: true
    },
    rfcPatron: {
        type: String,
        required: true
    },
    tipoPago: {
        type: String,
        required: true
    },
    banco: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});


module.exports = model('Tramite', tramiteSchema);