const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');

const router = Router();
const { getFacturaByID, getFacturasByTramite, getMovimientos } = require('../controllers/facturas');

// obtener todos los clientes
router.get('/:factura', [], getFacturaByID);

// Crear un nuevo cliente
router.get('/tramite/:tramite', [], getFacturasByTramite);

// Crear un nuevo cliente
router.get('/movimientos/:factura', [], getMovimientos);


module.exports = router;