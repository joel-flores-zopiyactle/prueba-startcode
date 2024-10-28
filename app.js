// const numbers = [1,16,20,14,17,12,19,4,15,11,7,8];
// const numbers = [20,16,20,1,17,12,19,4,15,11,7,8];
// const numbers = [20,16,50,60,17,12,19,4,15,11,2,8];
const numbers = [1,16,11,3,17,12,19,4,15,11,14,20];

// 12 Hrs
function calcularPrecioMaximo(precios = []) {
    return Math.max(...precios) ;
}

function calcularPrecioMinimo(precios = []) {
    return Math.min(...precios) ;
}

function verificarHoraAdecuadoParaComprarAccion(precios) {
    const precioMinimo = calcularPrecioMinimo(precios);
    for (let i = 0; i < precios.length; i++) {
        const precio = precios[i];         
        // Validación - Si el precio mínimo está en el último elemento de la lista, el flujo se detiene,
        // ya que no se puede obtener ganancia al no haber oportunidad de venta.
        if(i === precios.length - 1) {       
            // TODO: Puede mejorar la logica para usar recursividad y buscar un segundo precio minimo     
            console.log('No hay una hora adecuado para comprar');
            return null;           
        }
        
        if(precioMinimo === precio) {                        
            return {
                horaDeCompra:i, 
                precioDeCompra: precios[i]
            };           
        }
    }  

    return {
        horaDeCompra:0, 
        precioDeCompra: precios[0]
    };
}

function horaAdecuadoParaVender(precios, horaDeCompra) {    
    const nuevosPrecios = precios.slice(horaDeCompra, precios.length);        
    const precioMaximo = calcularPrecioMaximo(nuevosPrecios);
    
    const index = precios.indexOf(precioMaximo);
    
    // Validación - Si la posición de compra actual es la misma al precio máximo
    // no se regresa nada, ya que no hay una ganacia vendiendo por el mismo precio
    if(index === horaDeCompra) {
        console.log('No hay una hora adecuado para vender');
        return null;
    }

    return {
        horaDeVenta:index, 
        preciosDeVenta: precios[index]
    };
}

function calcularUtilidad(listaDePrecios) {
    const compra = verificarHoraAdecuadoParaComprarAccion(listaDePrecios);   
    if(!compra) return;
    const venta = horaAdecuadoParaVender(listaDePrecios, compra.horaDeCompra);   
    if(!venta) return;
    
    const utilidad = venta.preciosDeVenta - compra.precioDeCompra;
    
    console.log(`
        ** Horas disponibles: ${listaDePrecios.length} **
        La hora óptima para comprar es: ${compra.horaDeCompra + 1}, con un precio de $${compra.precioDeCompra} MXN.
        La hora óptima para vender es: ${venta.horaDeVenta + 1}, con un precio de $${venta.preciosDeVenta} MXN.
        Utilidad estimada: $${utilidad} MXN.
    `);    
}

calcularUtilidad(numbers)