const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');



const cargarArchivo = async(req, res) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar si se envio algun archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok: false,
            msg: 'No se recibio ningun archivo.'
        });
    }

    // se obtiene el arhivo
    const file = req.files.documento;

    // se corta el nombre por los puntos
    const nombreCortado = file.name.split('.');

    // se obtiene la extencion del archivo
    const extencion = nombreCortado[nombreCortado.length - 1];

    // extenciones de archivo validas
    const extencionesValidas = ['pdf'];

    // se valida si el archivo tiene una extencion valida
    if (!extencionesValidas.includes(extencion)) {
        return res.status(400).json({
            ok: false,
            msg: 'Este tipo de archivo no esta permitido'
        })
    }

    // generar el nombre de la imagen
    const nombreArchivo = `${uuidv4()}.${extencion}`;

    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    const act = await actualizarImagen(tipo, id, nombreArchivo);

    if (!act) {
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal al guardar la imagen'
        });
    }

    // mover la imagen
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                msg: 'Algo salio mal al guardar la imagen'
            });
        }
        res.json({
            ok: true,
            msg: 'archivo cargado con exito',
            nombreArchivo
        });
    });


};

const validarArchivo = async(file, valids, resp) => {

}
const getImagen = async(req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.id;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }


}

module.exports = {
    cargarArchivo,
    getImagen
};