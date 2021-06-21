const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');


const getUsuario = async(req, res = response) => {
    try {
        const tramites = await Tramite.findOne()
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

const createUsuario = async(req, res = response) => {
    try {
        const { email, pass } = req.body;
        // Checar si el email ya existe
        const mailExists = await Usuario.findOne({email: email});
        // Si el email existe envia un badRequest
        if(mailExists){
            return res.status(400).json({
                ok: false,
                msg: 'El ya existe un usario con este email'
            })
        }
        
        const usuario = new Usuario(req.body);
        // Se encripta la contrasena antes de guardarla
        const salt = bcrypt.genSaltSync();
        usuario.pass = bcrypt.hashSync(pass, salt);

        // Se guarda el usuario
        const usuarioDB = await usuario.save();
        res.json({
            ok: true,
            msg: 'El usuario se genero correctamente, espere respuesta del administrador del sistema.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al adminstrador'
        })
    }
};

const deleteUsuario = async(req, res = response) => {
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(id);

        // Verifica si existe el usuario
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Usuario.deleteOne({ _id: id });
        res.json({
            ok: true,
            msg: 'Se elimino el usuario seleccionado',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const activarUsuario = async(req, res = response) => {
    const id = req.params.id;
    try {
        const usuario = await Usuario.findById(id);

        // Verifica si existe el usuario
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Hay un error en la solicitud'
            });
        }

        // se guardan los cambios
        await Usuario.findByIdAndUpdate({ _id: id }, {activo: true, activado: req.uid}, { new: true });
        res.json({
            ok: true,
            msg: 'Se ha activado el usuario seleccionado'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

const getUsuarios = async(req, res = response) => {
    try {
        const usuarios = await Usuario.find({activo: true},{pass: 0}).populate('activado','nombre apaterno amaterno');
        if (!usuarios) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen registros'
            });
        }
        res.json({
            ok: true,
            usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};


const getSolicitudes = async(req, res = response) => {
    try {
        const usuarios = await Usuario.find({activo: false},{pass: 0});
        if (!usuarios) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen registros'
            });
        }
        res.json({
            ok: true,
            usuarios
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
    const logueado = req.uid;
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
    createUsuario,
    getUsuarios,
    getSolicitudes,
    deleteUsuario,
    activarUsuario
};