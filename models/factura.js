const { Schema, model } = require('mongoose');
const { stringify } = require('uuid');

const facturaSchema = Schema({
    tramite: {
        type: Schema.Types.ObjectId,
        ref: 'Tramite',
        required: true
    },
    basicaN: {
        type: String,
        required: true
    },
    basicaA: {
        type: String,
        required: true
    },
    aRetiro: {
        sA: {
            type: Number,
            required: true
        },
        aportacion: {
            type: Number,
            required: true
        },
        retiros: {
            type: Number,
            required: true
        },
        rendimiento: {
            type: Number,
            required: true
        },
        comision: {
            type: Number,
            required: true
        },
        suma: {
            type: Number,
            required: true
        }
    },
    aVoluntario: {
        sA: {
            type: Number,
            required: true
        },
        aportacion: {
            type: Number,
            required: true
        },
        retiros: {
            type: Number,
            required: true
        },
        rendimiento: {
            type: Number,
            required: true
        },
        comision: {
            type: Number,
            required: true
        },
        suma: {
            type: Number,
            required: true
        }
    },
    aVivienda: {
        sA: {
            type: String,
            required: true
        },
        mov: {
            type: String,
            required: true
        },
        suma: {
            type: String,
            required: true
        }
    },
    banco: {
        type: String,
        required: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    periodo: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
});


module.exports = model('Factura', facturaSchema);