const { response } = require('express');
const Cliente = require('../models/cliente/cliente')

const getClientes = async(req, res = response) => {
    try {
        const clientes = await Cliente.find({usuario: req.uid});
        res.json({
            ok: true,
            clientes
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        });
    }
};



const createCliente = async(req, res = response) => {
    const data = req.body;
    console.log(data);
    try {
        const cliente = Cliente({
            nombre: data.nombre,
            apaterno: data.apaterno,
            amaterno: data.amaterno,
            curp: data.curp,
            rfc: data.rfc,
            nss: data.nss,
            email: data.email,
            comentarios: data.comentarios,
            usuario: req.uid,
            direccion: {
                calle: data.calle,
                n_ext: data.n_ext,
                n_int: data.n_int,
                colonia: data.colonia,
                municipio: data.municipio,
                estado: data.estado,
                cp: data.cp,
                cr: data.cr
            }
        });
        const clienteDB = await cliente.save();
        res.json({
            ok: true,
            clienteDB,
            msg: 'Se ha guardado el cliente con exito :D'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado contacte al administrador'
        });
    }
};


const getCliente = async(req, res = response) => {
    const clienteID = req.params.cliente;
    try {
        const cliente = await Cliente.findById(clienteID);
        res.json({
            ok: true,
            cliente
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal por favor contacte al administrador'
        })
    }
}

const deleteCliente = async(req, res = response) => {
    const id = req.params.id;
    // const uid = req.uid;

    try {
        const clienteDB = await Cliente.findById(id);

        // Verifica si existe el usuario
        if (!clienteDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el cliente solicitado'
            });
        }

        // se guardan los cambios
        await Cliente.findByIdAndUpdate({ _id: id }, { activo: false }, { new: true });
        res.json({
            ok: true,
            msg: 'Cliente eliminado con exito',
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Algo salio mal contacte al administrador'
        });
    }
};

module.exports = {
    getClientes,
    createCliente,
    deleteCliente,
    getCliente
}