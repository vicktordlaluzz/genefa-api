const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const fileUpload = require('express-fileupload');

const router = Router();
const { createUsuario,
        getUsuarios,
        getSolicitudes,
        deleteUsuario,
        activarUsuario } = require('../controllers/usuarios');



// Crear un nuevo usario
router.post('/', [
    //validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('apaterno', 'El campo a. paterno es obligatorio').notEmpty(),
    check('email', 'El campo email debe contener un email valido').isEmail(),
    validarCampos
], createUsuario);

// obtener usuarios activos
router.get('/activos', [
    validarJWT,
    getUsuarios
]);

// obtener solicitudes de usuario
router.get('/solicitudes', [
    validarJWT,
    getSolicitudes
]);

// eliminar un usuario
router.delete('/:id', [
    validarJWT,
    deleteUsuario
]);

// aprobar un usuario
router.put('/solicitudes/:id', [
    validarJWT,
    activarUsuario
]);


module.exports = router;