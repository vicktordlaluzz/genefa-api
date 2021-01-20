const { Schema, model } = require('mongoose');

const TicketSchema = Schema({
    expedicion: {
        type: Date,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tramite: {
        type: Schema.Types.ObjectId,
        ref: 'Tramite',
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    formaPago: {
        type: String,
        required: true
    },
    comprobantePago: {
        type: Schema.Types.ObjectId,
        ref: 'Comprobante'
    },
    estado: {
        type: String,
        required: true
    },
    comentarios: {
        type: String,
        required: true
    }
});


module.exports = model('Ticket', TicketSchema);