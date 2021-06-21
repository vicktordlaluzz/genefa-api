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
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
        default: 'no-img.jpg'
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    activado: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});


module.exports = model('Usuario', UsuarioSchema);