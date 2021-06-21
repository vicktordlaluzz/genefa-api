const { Router } = require('express');
const { login, refreshToken, changePass, getLogged } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/field-validator');
const { validarJWT } = require('../middlewares/jwt-validator');



const router = Router();

router.post('/', [
    check('email', 'Introduzca un email valido').isEmail(),
    check('pass', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);

router.put('/changePass', [
    validarJWT,
    check('passAnt', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], changePass);

router.get('/refresh',[
    validarJWT
], refreshToken);

router.get('/logged',[
    validarJWT
], getLogged);

// router.post('/changePass', [
//     validarJWT,
//     check('pass', 'El password es obligatorio').not().isEmpty(),
//     validarCampos
// ], changePass);

// router.get('/', [
//     validarJWT
// ], renewToken);


module.exports = router;