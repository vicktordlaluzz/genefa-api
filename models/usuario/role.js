const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true
    }

});


module.exports = model('Role', RoleSchema);