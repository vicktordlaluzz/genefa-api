const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const fileUpload = require('express-fileupload');

const router = Router();
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario, chargeImg, getImg, getUsuario } = require('../controllers/usuarios');

// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getUsuarios);

router.get('/:usuario', [
    validarJWT
], getUsuario);

// Crear un nuevo usario
router.post('/', [
    //validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('apaterno', 'El campo a. paterno es obligatorio').notEmpty(),
    check('rfc', 'El campo rfc es obligatorio').notEmpty(),
    check('curp', 'El campo curp es obligatorio').notEmpty(),
    check('puesto', 'El campo puesto es obligatorio').notEmpty(),
    check('calle', 'El campo calle es obligatorio').notEmpty(),
    check('colonia', 'El campo puesto es obligatorio').notEmpty(),
    check('estado', 'El campo puesto es obligatorio').notEmpty(),
    check('municipio', 'El campo puesto es obligatorio').notEmpty(),
    check('telefono', 'El campo puesto es obligatorio').notEmpty(),
    check('email', 'El campo email debe contener un email valido').isEmail(),
    validarCampos
], createUsuario);

// Actualiza un usuario
router.put('/:id', [
    validarJWT
], updateUsuario);

// Actualiza un usuario
router.delete('/:id', [
    validarJWT
], deleteUsuario);

router.use(fileUpload());

// obtener imgen de usuario
router.get('/img/:img', getImg);

router.post('/img/:usuario', [
    validarJWT
], chargeImg);



module.exports = router;