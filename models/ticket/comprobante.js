const { Schema, model } = require('mongoose');

const ComprobanteSchema = Schema({
    fecha: {
        type: Date,
        required: true
    },
    folio: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    ticket: {
        type: Schema.Types.ObjectId,
        ref: 'Ticket',
        required: true
    }
});


module.exports = model('Comprobante', ComprobanteSchema);