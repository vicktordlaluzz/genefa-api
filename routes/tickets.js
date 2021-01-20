const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');

const router = Router();
const { getTickets, createTicket, updateTicket } = require('../controllers/ticket/tickets');
const { getComprobantes, createComprobante } = require('../controllers/ticket/comprobantes');
const fileUpload = require('express-fileupload');


// Obtener todos los usuarios
router.get('/', [
    validarJWT
], getTickets);


router.post('/', [
    validarJWT,
    check('tramite', 'El campo tramite es obligatorio').notEmpty(),
    check('cliente', 'El campo cliente es obligatorio').notEmpty(),
    check('monto', 'El campo monto es obligatorio').notEmpty(),
    check('formaPago', 'El campo forma de pago es obligatorio').notEmpty(),
    check('estado', 'El campo estado es obligatorio').notEmpty(),
    validarCampos
], createTicket);

router.put('/:id', [
    validarJWT
], updateTicket);


router.use(fileUpload());

router.get('/comprobantes/', [
    validarJWT
], getComprobantes);

router.post('/comprobantes/:ticket', [
    validarJWT,
    check('folio', 'El campo folio es obligatorio').notEmpty(),
    check('monto', 'El campo monto es obligatorio').notEmpty(),
    validarCampos
], createComprobante);

module.exports = router;