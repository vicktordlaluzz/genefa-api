const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');
const fileUpload = require('express-fileupload');
const router = Router();
const { getTipos, createTipo, deleteTipo } = require('../controllers/documentos/tipoDocumentos');
const { getDocumentos, saveDocumento, getDocumento, deleteDocumento } = require('../controllers/documentos/documentos');



// Obtiene todos los documentos de la coleccion tipoDocumento
router.get('/tipos', [
    validarJWT
], getTipos);

// Inserta un nuevo documento en la coleccion tipoDocumento
router.post('/tipos', [
    validarJWT,
    check('tipo', 'El campo tipo es obligatorio').notEmpty(),
    check('descripcion', 'La descripcion es obligatoria').notEmpty(),
    validarCampos
], createTipo);

// Elimina un documento de la coleccion tipoDocumento
router.delete('/tipos/:id', [
    validarJWT
], deleteTipo);

router.use(fileUpload());

// Obtener todos los docuemtos de un cliente
router.get('/:tramite', [
    validarJWT
], getDocumentos);

// Sube un nuevo documento
router.post('/:tramite', [
    validarJWT,
    check('tipoDocumento', 'No se indico el tipo de documento').notEmpty(),
    check('comentarios', 'Porfavor agregue una descripcion').notEmpty(),
    validarCampos
], saveDocumento);

router.get('/downloads/:documento', [
    validarJWT
], getDocumento);

router.delete('/:documento', [
    validarJWT
], deleteDocumento);

module.exports = router;