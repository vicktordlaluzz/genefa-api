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
            default: 0.00
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
            default: 0.00
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
            type: Number,
            required: true
        },
        mov: {
            type: Number,
            required: true
        },
        suma: {
            type: Number,
            required: true
        }
    },
    suma: {
        type: Number,
        required: true
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
    },
    detalles: {
        retiro: {
            type: Number,
            required: true
        },
        cesantia: {
            type: Number,
            required: true
        },
        cuotaSoc: {
            type: Number,
            required: true
        }
    },
    corte: {
        type: String,
        required: true,
    },
    periodo: {
        type: String,
        required: true
    },
    periodoN: {
        type: Number
    }
});


module.exports = model('Factura', facturaSchema);