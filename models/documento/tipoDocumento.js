const { Schema, model } = require('mongoose');

const TipoDocumentoSchema = Schema({
    tipo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        default: 'Descripcion'
    }
});


module.exports = model('TipoDocumento', TipoDocumentoSchema);