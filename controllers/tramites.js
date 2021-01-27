const { response } = require('express');
const Tramite = require('../models/tramite/tramite');
const Cliente = require('../models/cliente/cliente');
const { generarHistorial } = require('../helpers/facturas');

const getTramites = async(req, res = response) => {
    try {
        const tramites = await Tramite.find()
            .populate('cliente', 'nombre apaterno amaterno rfc');
        res.json({
            ok: true,
            tramites
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const createTramite = async(req, res = response) => {
    try {
        const tramite = new Tramite(req.body);
        const tramiteDB = await tramite.save();
        const clienteDB = await Cliente.findById(tramiteDB.cliente);
        generarHistorial(req.body.anio,req.body.salAnual,clienteDB._id,tramiteDB._id,req.body.banco,req.body.deduccion);
        res.json({
            ok: true,
            msg: 'El tramite ha sido dado de alta correctamente',
            tramiteDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteTramite = async(req, res = response) => {
    const id = req.params.id;

    try {
        const tramiteDB = await Tramite.findById(id)
        .populate('cliente', 'nombre apaterno amaterno rfc');

        // Verifica si existe el usuario
        if (!tramiteDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Tramite.findByIdAndUpdate({ _id: id }, { activo: false, usuario: req.uid, modificacion: new Date() }, { new: true });
        res.json({
            ok: true,
            msg: 'Tramite eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const updateTramite = async(req, res = response) => {
    const id = req.params.id;

    try {
        const tramite = await Tramite.findById(id);

        // Verifica si existe el usuario
        if (!tramite) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        let update = req.body;
        update.modificacion = new Date();
        update.usuarioMod = req.uid;

        // se guardan los cambios
        await Tramite.findByIdAndUpdate({ _id: id }, update, { new: true });
        res.json({
            ok: true,
            msg: 'Tramite actualizado con exito',
            update
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const getTramite = async(req, res = response) => {
    tramiteID = req.params.tramiteID;
    try {
        const tramite = await Tramite.findById(tramiteID)
        .populate('cliente', 'nombre apaterno amaterno rfc');
        if (!tramite) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el documento solicitado'
            });
        }
        res.json({
            ok: true,
            tramite
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};

const getByCliente = async(req, res = response) => {
    clienteId = req.params.clienteId;
    try {
        const tramite = await Tramite.find({ cliente: clienteId })
            .populate({
                path: 'registro',
                populate: {
                    path: 'registro',
                    model: 'Registro'
                }
            }).populate({
                path: 'hipoteca',
                populate: {
                    path: 'registro',
                    model: 'Hipoteca'
                }
            })
            .populate('tipo', 'nombre')
            .populate('usuarioAlta', 'nombre')
            .populate('usuarioMod', 'nombre img')
            .populate('cliente', 'nombre apaterno amaterno rfc')
            .populate('estado', 'estado');
        if (!tramite) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontro el documento solicitado'
            });
        }
        res.json({
            ok: true,
            tramite
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
    createTramite,
    getTramites,
    getTramite
};