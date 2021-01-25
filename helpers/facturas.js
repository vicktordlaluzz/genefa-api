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
    console.log(cantidad);
    let cifra = cantidad * 100;
    console.log(cifra);
    let redondo = Math.round(cifra) / 100;
    console.log(redondo);
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

function aniosTrabajados(edad){
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


function crearFactura(anio, cliente, periodo) {
    // Checa si existe la factura que se esta intentando generar
    const existeFactura = await Factura.findOne({anio: anio, periodo: periodo, cliente: cliente});
    if(existeFactura){
        return 'Ya existe la factura solicitada';
    }
    let facturaAnterior;
    // Obtiene la ultima factura
    if (periodo == 1) {
        facturaAnterior = await Factura.findOne({anio: (anio -1), periodo: 3, cliente: cliente});
    }else {
        facturaAnterior = await Factura.findOne({anio: anio, periodo: (periodo -1), cliente: cliente});
    }

    // Se crea nueva factura
    let factura = new Factura();
    const cliente = await Cliente.findOne({_id: cliente});

    if (facturaAnterior) {
        factura.aRetiro.sA = facturaAnterior.aRetiro.suma;
        factura.aVoluntario.sA = facturaAnterior.aVoluntario.suma;
        factura.aVivienda.sA = facturaAnterior.aVivienda.suma;
    } else {
        const aniosT = aniosTrabajados();
        if (condition) {
            
        }
    }

    

}