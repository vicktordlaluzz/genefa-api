const Factura = require('../models/factura');
const Cliente = require('../models/cliente/cliente')

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
function getEdad(anio, nacimiento) {
    return (anio - nacimiento) + 1;
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
    const nacimiento = getNacimiento(curp);
    const edad = getEdad(anio,nacimiento)
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

// Obtiene los saldos de la ultima factura
// en caso de que exista
async function getSaldoAnterior(cliente,anio,periodo){
    let facAnt;
    if ( periodo == 1 ) {
        facAnt = await Factura.findOne({cliente: cliente, anio: (anio - 1), periodo: 3});
    } else {
        facAnt = await Factura.findOne({cliente: cliente, anio: anio, periodo: (periodo - 1)});
    }

    if (!facAnt) {
        return false;
    }
    const saldos = {
        aV: facAnt.aVoluntario.suma,
        aR: facAnt.aRetiro.suma,
        aViv: facAnt.aVivienda.suma,
    }
    return saldos;
}

async function crearSaldos(cliente, anio,salarioAnual){
    const clienteDB = await Cliente.findById(cliente);
    const aTrabajados = aniosTrabajados(clienteDB.curp,anio);

    const saldos = {
        aR: aTrabajados * ((salarioAnual * 6.5)/100),
        aV: aTrabajados * ((salarioAnual * 0.5)/100),
        aViv: aTrabajados * ((salarioAnual * 5)/100)
    }
    return saldos;
}

async function crearFactura(anio, cliente, periodo, salarioPeriodo,tramite,banco, aportacionVol) {
    // Se obitnen los datos del cliente
    const clienteDB = await Cliente.findOne({_id: cliente});
    const nacimiento = getNacimiento(clienteDB.curp);
    const edad = getEdad(anio,nacimiento)
    getEdad(anio,)
    const antiguedad = aniosTrabajados(clienteDB.curp,anio);
    if (antiguedad < 0) {
        return false;
    }
    let saldosAnteriores = await getSaldoAnterior(cliente,anio,periodo);
    if (!saldosAnteriores) {
        saldosAnteriores = await crearSaldos(cliente,anio,(salarioPeriodo*3));
    }
    let factura = new Factura();
    factura.tramite = tramite;
    factura.basicaN = getBasicaNueva(edad);
    factura.basicaA = getBasica(edad);
    // Ahorro para el retiro
    factura.aRetiro.sA = saldosAnteriores.aR;
    factura.aRetiro.aportacion = (salarioPeriodo * 6.5) / 100;
    
    
    factura.aRetiro.rendimiento = (factura.aRetiro.sA * (5.54/3)) / 100;
    factura.aRetiro.comision = (factura.aRetiro.rendimiento * (33.5)) / 100;
    factura.aRetiro.suma = factura.aRetiro.sA + factura.aRetiro.aportacion + factura.aRetiro.rendimiento - factura.aRetiro.comision;
    
    // Ahorro voluntario
    factura.aVoluntario.sA = saldosAnteriores.aV;
    factura.aVoluntario.aportacion = aportacionVol;
    factura.aVoluntario.rendimiento = (factura.aVoluntario.sA * (5.54/3)) / 100;
    factura.aVoluntario.comision = (factura.aVoluntario.rendimiento * (33.5)) / 100;
    factura.aVoluntario.suma = factura.aVoluntario.sA + factura.aVoluntario.aportacion + factura.aVoluntario.rendimiento - factura.aVoluntario.comision;
    
    // Ahorro vivienda
    factura.aVivienda.sA = saldosAnteriores.aViv;
    factura.aVivienda.mov = (salarioPeriodo * 5) / 100
    factura.aVivienda.suma = factura.aVivienda.sA + factura.aVivienda.aportacion;

    factura.banco = banco;
    factura.cliente = cliente;
    factura.anio = anio;
    factura.periodo = periodo;
    const facDB = factura.save();
     if (facDB) {
         return true;
    }
}

// Genera las tres facturas de afore de un anio
function generarHistorial(anio, saLarioAnual, cliente, tramite, banco, aportacionVol) {
    // el salario se divide en 3
    const salarioPeriodico = getSumaAleatoria(saLarioAnual,3);
    crearFactura(anio,cliente,1,salarioPeriodico[0],tramite,banco,0);
    crearFactura(anio,cliente,2,salarioPeriodico[1],tramite,banco,0);
    crearFactura(anio,cliente,3,salarioPeriodico[2],tramite,banco,aportacionVol);
}

module.exports = {
    generarHistorial
}