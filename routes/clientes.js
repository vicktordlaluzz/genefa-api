const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const { validarDirecciones, validarTelefonos } = require('../middlewares/custom-validators')

const router = Router();
const { getClientes, createCliente, updateCliente, deleteCliente, getCliente } = require('../controllers/clientes');

// obtener todos los clientes
router.get('/', [
    validarJWT
], getClientes);

// Crear un nuevo cliente
router.post('/', [
    validarJWT,
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('apaterno', 'El campo apaterno es obligatorio').notEmpty(),
    check('curp', 'El campo curp es obligatorio').notEmpty(),
    check('rfc', 'El campo rfc es obligatorio').notEmpty(),
    check('nss', 'El campo nss es obligatorio').notEmpty(),
    check('calle', 'El campo calle es obligatorio').notEmpty(),
    check('n_ext', 'El campo n_ext es obligatorio').notEmpty(),
    check('colonia', 'El campo colonia es obligatorio').notEmpty(),
    check('municipio', 'El campo municipio es obligatorio').notEmpty(),
    check('estado', 'El campo estado es obligatorio').notEmpty(),
    check('cp', 'El campo codigo postal es obligatorio').notEmpty(),
    check('cr', 'El campo cr es obligatorio').notEmpty(),
    validarCampos
], createCliente);

// // Actualiza un usuario
// router.put('/:id', [
//     validarJWT
// ], updateCliente);

router.get('/:cliente', [], getCliente);


// Actualiza un usuario
router.delete('/:id', [], deleteCliente);

module.exports = router;