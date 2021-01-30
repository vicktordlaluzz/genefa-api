const { Schema, model } = require('mongoose');

const conceptoSchema = Schema({
    concepto: {
        type: String,
        required: true
    }
});


module.exports = model('Concepto', conceptoSchema);