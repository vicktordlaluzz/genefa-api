const Factura = require('../models/factura');
const Cliente = require('../models/cliente/cliente');
const Movimiento = require('../models/movimiento');
const Concepto = require('../models/concepto');

// Genera un numero aleatorio con dos decimales
function aleatorioDecimal(min, max) {
    const maximo = max;
    const minimo = min;
    let aleatorio = Math.random() * (maximo - minimo ) + minimo;
    return redondeo(aleatorio);
}

// Genera un numero aleatorio entero
function aleatorio(min, max) {
    const aleatorio = Math.random() * (max - min ) + min;
    return aleatorio;
}

// Redondea la cifra dada a dos decimales
function redondeo(cantidad) {
    let cifra = cantidad * 100;
    let redondo = Math.round(cifra) / 100;
    return redondo;
}

// Obtiene el anio de naciemiento
function getNacimiento(curp) {
    let edad = "19" + curp.substr(4,2);
    return edad;
}

// Obtiene la edad del trabajador
function getEdad(anio, curp) {
    return (anio - getNacimiento(curp)) + 1;
}

// Suma aleatoria
function getSumaAleatoria(cantidad, nPagos) {
    const pago = (cantidad) / nPagos;
    let pagos = [];
    for (let index = 0; index < nPagos; index++) {
        if (index == 0) {
            pagos[index] = pago * ((aleatorioDecimal(0.95,1.05)));           
        }else if (index == (nPagos - 1)) {
            const suma = sumarArray(pagos);
            pagos[index] = (cantidad - suma);
        }else {
            const pagoAnt = pagos[(index - 1)];
            if (pagoAnt < pago) {
                pagos[index] = pago * ((aleatorioDecimal(1,1.05)));
            }else if (pagoAnt > pago) {
                pagos[index] = pago * ((aleatorioDecimal(0.95,1)));
            }
        }
        
    }
    return pagos;
}

function sumarArray(array) {
    let suma = 0;
    array.forEach(element => {
        suma += element;
    });
    return suma;
}

function aniosTrabajados(curp,anio){
    const edad = getEdad(anio,curp);
    console.log(edad);
    return edad - 25;
}

// Generar montos de las aportaciones
// todos los metodos para obtener las aportaciones porcentuales
// requieren de el monto de la aportacion anual total, es decir
// el 6.5% del salario

// Aportaciones patronales
// Aportacion Cesantia, edad avanzada y vejez
function getCEAVpatron (aportacion) {
    let aportacionP = (aportacion * 3.15) / 100;
    return  redondeo(aportacionP);
}

// Aportacion ahorro para el retiro
function getARpatron(aportacion) {
    let aportacionP = (aportacion * 2) / 100;
    return  redondeo(aportacionP);
}

// Aportacion para la vivienda
function getAVpatron(aportacion) {
    let aportacionP = (aportacion * 5) / 100;
    return  redondeo(aportacionP);
}

// Aportacion Cesantia, edad avanzada y vejez trabajador
function getCEAVtrabajador (aportacion) {
    let aportacionP = (aportacion * 1.125) / 100;
    return  redondeo(aportacionP);
}

// Aportacion Cesantia, edad avanzada y vejez gobierno
function getCEAVgobierno (aportacion) {
    let aportacionP = (aportacion * 0.225) / 100;
    return  redondeo(aportacionP);
}

// Obtiene la basica de la nueva modalidad
function getBasicaNueva (edad) {
    if(edad < 25){
        return "Básica Inicial";
    } else if (edad >= 25 && edad <= 29){
        return "Básica 90-94";
    } else if (edad >= 30 && edad <= 34) {
        return "Básica 85-89";
    } else if (edad >= 35 && edad <= 39) {
        return "Básica 80-84";
    } else if (edad >= 40 && edad <= 44) {
        return "Básica 75-79";
    } else if (edad >= 45 && edad <= 49) {
        return "Básica 70-74";
    } else if (edad >= 50 && edad <= 54) {
        return "Básica 65-69";
    } else if (edad >= 55 && edad <= 59) {
        return "Básica 60-64";
    } else if (edad >= 60 && edad <= 64) {
        return "Básica 55-59";
    } else if (edad >= 65) {
        return "Básica de pensiones";
    }
}

// Obtiene la basica
function  getBasica(edad) {
    if (edad >= 60) {
        return 1;
    } else if (edad < 60 && edad > 45) {
        return 2;
    } else if (edad < 46 && edad > 36) {
        return 3;
    } else if (edad < 37) {
        return 4;
    }
}

function crearSaldos(curp, anio,salarioAnual){
    const aTrabajados = aniosTrabajados(curp,anio);
    console.log(aTrabajados);

    const saldos = {
        aR: aTrabajados * ((salarioAnual * 3.5)/100),
        aV: aTrabajados * ((salarioAnual * 0.1)/100),
        aViv: aTrabajados * ((salarioAnual * 2.5)/100)
    }
    return saldos;
}

async function crearFactura(anio, cliente, periodo, salarioPeriodo,tramite,banco, aportacionVol, facturaAnt) {
    const clienteDB = await Cliente.findOne({_id: cliente});
    const edad = getEdad(anio,clienteDB.curp);
    if(edad < 0){
        return false;
    }
    let factura = new Factura();
    if(facturaAnt){
        factura.aRetiro.sA = facturaAnt.aRetiro.suma;
        factura.aVoluntario.sA = facturaAnt.aVoluntario.suma;
        factura.aVivienda.sA = facturaAnt.aVivienda.suma;
    }else {
        const facAnt = await Factura.findOne({cliente: cliente, anio: (anio - 1), periodo: 3});
        if(!facAnt){
            const saldosAnt = crearSaldos(clienteDB.curp,anio,salarioPeriodo);
            factura.aRetiro.sA = saldosAnt.aR;
            factura.aVoluntario.sA = saldosAnt.aV;
            factura.aVivienda.sA = saldosAnt.aViv;
        }else {
            factura.aRetiro.sA = facAnt.aRetiro.suma;
            factura.aVoluntario.sA = facAnt.aVoluntario.suma;
            factura.aVivienda.sA = facAnt.aVivienda.suma;
        }
    }
    factura.tramite = tramite;
    factura.basicaN = getBasicaNueva(edad);
    factura.basicaA = getBasica(edad);
    // Ahorro para el retiro
    factura.aRetiro.aportacion = (salarioPeriodo * 6.5) / 100;
    
    
    factura.aRetiro.rendimiento = (factura.aRetiro.sA * (5.54/3)) / 100;
    factura.aRetiro.comision = (factura.aRetiro.rendimiento * (33.5)) / 100;
    factura.aRetiro.suma = factura.aRetiro.sA + factura.aRetiro.aportacion + factura.aRetiro.rendimiento - factura.aRetiro.comision;
    
    // Ahorro voluntario
    factura.aVoluntario.aportacion = aportacionVol;
    factura.aVoluntario.rendimiento = (factura.aVoluntario.sA * (5.54/3)) / 100;
    factura.aVoluntario.comision = (factura.aVoluntario.rendimiento * (33.5)) / 100;
    factura.aVoluntario.suma = factura.aVoluntario.sA + factura.aVoluntario.aportacion + factura.aVoluntario.rendimiento - factura.aVoluntario.comision;
    
    // Ahorro vivienda
    factura.aVivienda.mov = (salarioPeriodo * 5) / 100;
    factura.aVivienda.suma =factura.aVivienda.sA + factura.aVivienda.mov;
    factura.detalles.retiro =  (factura.aRetiro.suma * 30.76923076923077) / 100;
    factura.detalles.cesantia = (factura.aRetiro.suma * 65.76923076923077) / 100;
    factura.detalles.cuotaSoc = (factura.aRetiro.suma * 3.461538461538462) / 100;
    factura.suma = factura.aVivienda.suma + factura.aVoluntario.suma + factura.aRetiro.suma;
    factura.banco = banco;
    factura.cliente = cliente;
    factura.anio = anio;
    factura.periodo = periodo;
    if (periodo === 1) {
        factura.corte = `30 de abril de ${anio}`;
        factura.periodo = `Del 01 de mayo de ${anio -1} al 30 de abril de ${anio}`;
    }else if (periodo === 2) {
        factura.corte = `31 de agosto de ${anio}`;
        factura.periodo = `Del 01 de septiembre de ${anio -1} al 31 de agosto de ${anio}`;
    }else {
        factura.corte = `31 de diciembre de ${anio}`;
        factura.periodo = `Del 01 de enero de ${anio -1} al 31 de diciembre de ${anio}`;
    }
    const facDB = await factura.save();
     if (facDB) {
         console.log(facDB);
         await generarMovimientos(facDB._id,facDB.aVivienda.mov,facDB.aRetiro.aportacion,facDB.aVoluntario.aportacion,salarioPeriodo);
         return facDB;
    }
}

// Genera las tres facturas de afore de un anio
async function generarHistorial(anio, saLarioAnual, cliente, tramite, banco, aportacionVol) {
    // el salario se divide en 3
    const salarioPeriodico = getSumaAleatoria(saLarioAnual,3);
    let facturaAnterior = await Factura.findOne({anio: (anio -1), periodo: 3, cliente: cliente});
    const fac1 = await crearFactura(anio,cliente,1,salarioPeriodico[0],tramite,banco,0,facturaAnterior);
    const fac2 = await crearFactura(anio,cliente,2,salarioPeriodico[1],tramite,banco,0,fac1);
    const fac3 = await crearFactura(anio,cliente,3,salarioPeriodico[2],tramite,banco,aportacionVol,fac2);
}

async function generarMovimientos(facturaID, aVivienda, aRetiro, aVoluntario, salario){
    const mVivienda = getSumaAleatoria(aVivienda,2);
    const mVoluntario = getSumaAleatoria(aVoluntario,4);
    const mCesT = getSumaAleatoria(((aRetiro * 17.30769230769231) / 100),2);
    const mCesP = getSumaAleatoria(((aRetiro * 48.46153846153846) / 100),2);
    const mRetP = getSumaAleatoria(((aRetiro * 30.76923076923077) / 100),2);
    const mCSoc = getSumaAleatoria(((aRetiro * 3.461538461538462) / 100),2);
    try {
        await Movimiento.insertMany([{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mCesT[0],
            concepto: 'Aportación TRABAJADOR en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mCesT[1],
            concepto: 'Aportación TRABAJADOR en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mCesP[0],
            concepto: 'Aportación PATRONAL en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mCesP[1],
            concepto: 'Aportación PATRONAL en Subcuenta CESANTíA EN EDAD AVANZADA Y VEJEZ ISSSTE'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mRetP[0],
            concepto: 'Aportación PATRONAL en Subcuenta RETIRO ISSSTE 08'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mRetP[1],
            concepto: 'Aportación PATRONAL en Subcuenta RETIRO ISSSTE 08'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mCSoc[0],
            concepto: 'Aportación en Subcuenta CUOTA SOCIAL ISSSTE'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mCSoc[1],
            concepto: 'Aportación en Subcuenta CUOTA SOCIAL ISSSTE'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mVivienda[0],
            concepto: 'Aportación FOVISSSTE 2008'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mVivienda[1],
            concepto: 'Aportación FOVISSSTE 2008'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mVoluntario[0] || 0,
            concepto: 'Aportación TRABAJADOR en Cuenta AHORRO VOLUNTARIO'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mVoluntario[1] || 0,
            concepto: 'Aportación TRABAJADOR en Cuenta AHORRO VOLUNTARIO'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mVoluntario[2] || 0,
            concepto: 'Aportación TRABAJADOR en Cuenta AHORRO VOLUNTARIO'
        },{
            factura: facturaID,
            salBase: ((salario * 3)/360) * 30,
            monto: mVoluntario[3] || 0,
            concepto: 'Aportación TRABAJADOR en Cuenta AHORRO VOLUNTARIO'
        }]
        );
    } catch (error) {
        console.log(error);
    }


}



module.exports = {
    generarHistorial
}
