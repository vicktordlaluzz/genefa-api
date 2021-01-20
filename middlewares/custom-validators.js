const { response } = require("express");

const validarDirecciones = (req, res = response, next) => {
    if (!req.body.direcciones) {
        return res.status(400).json({
            ok: false,
            msg: 'Debes agregar al menos una direccion'
        });
    }
    if (!Object.keys(req.body.direcciones).length > 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Debes agregar al menos una direccion'
        });
    }

    next();
};

const validarTelefonos = (req, res = response, next) => {
    if (!req.body.telefonos) {
        return res.status(400).json({
            ok: false,
            msg: 'Debes agregar al menos un telefono'
        });
    }
    if (!Object.keys(req.body.telefonos).length > 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Debes agregar al menos un telefono'
        });
    }

    next();
};

module.exports = {
    validarDirecciones,
    validarTelefonos
};