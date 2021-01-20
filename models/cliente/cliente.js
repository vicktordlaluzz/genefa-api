const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
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
    curp: {
        type: String,
        required: true
    },
    rfc: {
        type: String,
        required: true
    },
    nss: {
        type: String
    },
    email: {
        type: String
    },
    direccion: {
        calle: {
            type: String,
            required: true
        },
        n_ext: {
            type: String,
            required: true
        },
        n_int: {
            type: String
        },
        colonia: {
            type: String,
            required: true
        },
        municipio: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        cp: {
            type: String,
            required: true,
        },
        cr: {
            type: String,
            required: true
        }
    },
    comentarios: {
        type: String
    },
    activo: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    update_at: {
        type: Date
    }
});


module.exports = model('Cliente', ClienteSchema);