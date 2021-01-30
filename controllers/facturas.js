const { response } = require('express');
const Factura = require('../models/factura');

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
        const factura = await Factura.find({_id: fac})
            .populate('cliente');
        res.json({
            ok: true,
            factura
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
    getFacturaByID
}