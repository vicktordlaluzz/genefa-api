const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();
const {
    createTramite,
    getTramites
} = require('../controllers/tramites')



router.post('/', [
    check('cliente', 'No se recibio el cliente').notEmpty(),
    check('anio', 'El campo año es obligatorio').notEmpty(),
    check('salAnual', 'El campo salario anual es obligatorio').notEmpty(),
    check('deduccion', 'El campo deduccion es obligatorio').notEmpty(),
    check('rfcPatron', 'El campo rfc del patron es obligatorio').notEmpty(),
    check('tipoPago', 'El campo tipo de pago es obligatorio').notEmpty(),
    check('banco', 'El campo banco es obligatorio').notEmpty(),
    validarCampos
], createTramite);

router.get('/', [], getTramites);


module.exports = router;