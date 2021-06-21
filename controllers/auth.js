const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {

    const { email, pass } = req.body;

    try {

        // Verificar si el email existe
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o usuario no es valido.'
            });
        }

        // validar contrasena
        const validarPass = bcrypt.compareSync(pass, usuarioDB.pass);
        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Email o usuario no es valido.'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};

const changePass = async(req, res = response) => {

    try {
        const { passAnt, newPass } = req.body;
        const uid = req.uid;

        // Verificar si el email existe
        const usuarioDB = await Usuario.findOne({_id: uid});

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'El email o usuario no es valido121.'
            });
        }

        // validar contrasena
        const validarPass = bcrypt.compareSync(passAnt, usuarioDB.pass);
        if (!validarPass) {
            return res.status(400).json({
                ok: false,
                msg: 'La contrasena no es correcta.'
            });
        }

        // Guardar la nueva contrasena
         // Se encripta la contrasena antes de guardarla
         const salt = bcrypt.genSaltSync();
         const pass = bcrypt.hashSync(newPass, salt);
         console.log(uid);
         const usuarioUpdate = await Usuario.findByIdAndUpdate({_id: uid}, {pass: pass}, { new: true });
         console.log(usuarioUpdate);

         if(!usuarioUpdate){
             return  res.status(500).json({
                ok: false,
                msg: 'Error inesperado... Revisar logs'
            });
         }
        res.json({
            ok: true,
            msg: 'La contrasena se ha actualizado correctamente.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};


const getLogged = async(req, res = response) => {

    try {
        const loggedID = req.uid;

        // Verificar si el email existe
        const usuarioDB = await Usuario.findOne({_id: loggedID},{pass: 0});

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Hubo un error en la peticion'
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... Revisar logs'
        });
    }
};

const refreshToken = async(req, res = response) => {
    try {
        const uid = req.uid
        const user = await Usuario.findById(uid,{pass: 0})
                            .populate('activado', ('nombre apaterno amaterno'));
        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El token no es valido'
            })
        }
        // Generar el JWT
        const token = await generarJWT(user._id);

        console.log(user);
        res.json({
            ok: true,
            token,
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};

module.exports = {
    login,
    refreshToken,
    changePass,
    getLogged
};