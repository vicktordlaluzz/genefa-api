const { Schema, model } = require('mongoose');

const EstadoTramiteSchema = Schema({
    estado: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


module.exports = model('EstadoTramite', EstadoTramiteSchema);