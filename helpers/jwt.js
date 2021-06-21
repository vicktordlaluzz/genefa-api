const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        const pyload = {
            uid
        };
        jwt.sign(pyload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });

};

const validarToken = (uid) => {

    return new Promise((resolve, reject) => {
        const pyload = {
            uid
        };
        jwt.sign(pyload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });

};

module.exports = {
    generarJWT
}