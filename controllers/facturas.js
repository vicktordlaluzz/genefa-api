const { response } = require('express');
const Factura = require('../models/factura');
const Movimiento = require('../models/movimiento');

const getFacturasByTramite = async(req, res = response) => {
    try {
        const tramite = req.params.tramite
        const facturas = await Factura.find({tramite: tramite})
        .populate('cliente', 'nss nombre apaterno amaterno direccion curp rfc');
        res.json({
            ok: true,
            facturas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const getFacturaByID = async(req, res = response) => {
    try {
        const fac = req.params.factura;
        const factura = await Factura.findOne({_id: fac})
                    .populate('cliente')
                    .populate('tramite');
        let movimientos = {
            pcav: await Movimiento.find({factura: fac, concepto: 'Aportación PATRONAL en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'}),
            pr: await Movimiento.find({factura: fac, concepto: 'Aportación PATRONAL en Subcuenta RETIRO ISSSTE 08'}),
            tcav: await Movimiento.find({factura: fac, concepto: 'Aportación TRABAJADOR en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'}),
            cs: await Movimiento.find({factura: fac, concepto: 'Aportación en Subcuenta CUOTA SOCIAL ISSSTE'}),
            avol: await Movimiento.find({factura: fac, concepto: 'Aportación TRABAJADOR en Cuenta AHORRO VOLUNTARIO'}),
            aviv: await Movimiento.find({factura: fac, concepto: 'Aportación FOVISSSTE 2008'})
        }
        res.json({
            ok: true,
            factura,
            movimientos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const getMovimientos = async(req, res = response) => {
    try {
        const fac = req.params.factura;
        const movimientos = await Movimiento.find({factura: fac});
        res.json({
            ok: true,
            movimientos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

module.exports = {
    getFacturasByTramite,
    getFacturaByID,
    getMovimientos
}