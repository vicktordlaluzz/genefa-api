const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apaterno: {
        type: String,
        required: true
    },
    amaterno: {
        type: String
    },
    rfc: {
        type: String,
        required: true
    },
    curp: {
        type: String,
        required: true
    },
    puesto: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    telefono: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
        required: true,
        default: 'no-img.jpg'
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    direccion: {
        calle: {
            type: String,
            required: true
        },
        numeroE: {
            type: String,
            default: 'sin numero'
        },
        numeroI: {
            type: String
        },
        colonia: {
            type: String,
            required: true,
        },
        municipio: {
            type: String,
            required: true,
        },
        estado: {
            type: String,
            required: true,
        }
    }

});


module.exports = model('Usuario', UsuarioSchema);