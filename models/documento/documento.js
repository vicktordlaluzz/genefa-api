const { Schema, model } = require('mongoose');

const TipoDocumentoSchema = Schema({
    img: {
        type: String,
        required: true
    },
    comentarios: {
        type: String,
        required: true
    },
    tipoDocumento: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDocumento'
    },
    fecha: {
        type: Date,
        default: new Date()
    },
    tramite: {
        type: Schema.Types.ObjectId,
        ref: 'Tramite'
    }
});

module.exports = model('Documento', TipoDocumentoSchema);