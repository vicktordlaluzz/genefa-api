const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');


const router = Router();
const { getFacturaByID, getFacturasByTramite, getMovimientos } = require('../controllers/facturas');

// obtener todos los clientes
router.get('/:factura', [validarJWT], getFacturaByID);

// Crear un nuevo cliente
router.get('/tramite/:tramite', [validarJWT], getFacturasByTramite);

// Crear un nuevo cliente
router.get('/movimientos/:factura', [validarJWT], getMovimientos);


module.exports = router;