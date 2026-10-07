// MECANISMO DE CESTA

// Controla el almacenamiento temporal de la compra seleccionada por el cliente.
// Registra matematicamente el total y supervisa el inventario antes del pago final.
let gestorCarrito = {
    elementosGuardados: [],

    agregar: function(productoNuevo) {
        // Recorre la lista verificando si ese articulo exacto ya figura en la memoria.
        let existe = false;
        for (let i = 0; i < this.elementosGuardados.length; i++) {
            // Comparar tanto id como nombre (el id ahora puede ser string con talla)
            if (this.elementosGuardados[i].id === productoNuevo.id && this.elementosGuardados[i].nombre === productoNuevo.nombre) {
                // Incrementa la cantidad consolidada sin duplicar entradas visuales en el ticket.
                this.elementosGuardados[i].cantidad = this.elementosGuardados[i].cantidad + 1;
                existe = true;
                break;
            }
        }
        
        // Inserta el articulo como un nuevo registro independiente si no existia previamente.
        if (existe === false) {
            productoNuevo.cantidad = 1;
            this.elementosGuardados.push(productoNuevo);
        }
        this.actualizarInterfaz();
    },

    eliminar: function(idProducto, nombreExacto) {
        // Declara un vector provisional para aislar el dato que se desea suprimir del servidor.
        let listaActualizada = [];
        for (let i = 0; i < this.elementosGuardados.length; i++) {
            // Comparar correctamente como string (id puede ser "1_pequena")
            if (String(this.elementosGuardados[i].id) === String(idProducto) && this.elementosGuardados[i].nombre === nombreExacto) {
                // Omitir este indice permite que desaparezca silenciosamente del conjunto general.
            } else {
                listaActualizada.push(this.elementosGuardados[i]);
            }
        }
        this.elementosGuardados = listaActualizada;
        this.actualizarInterfaz();
    },

    actualizarInterfaz: function() {
        // Suma iterativamente las participaciones consolidadas para el icono numerico del menu superior.
        let contador = document.getElementById('contador-carrito');
        if (contador !== null) {
            let articulosTotales = 0;
            for (let i = 0; i < this.elementosGuardados.length; i++) {
                articulosTotales = articulosTotales + this.elementosGuardados[i].cantidad;
            }
            contador.innerText = articulosTotales;
        }

        // Construye el esquema HTML del ticket interno del comprador leyendo todos los items recolectados.
        let contenedorVisivo = document.getElementById('contenedor-items-carrito');
        let diseñoHTML = "";
        let sumaPrecios = 0;

        if (contenedorVisivo !== null) {
            for (let j = 0; j < this.elementosGuardados.length; j++) {
                let bloque = this.elementosGuardados[j];
                let subSuma = bloque.precio * bloque.cantidad;
                sumaPrecios = sumaPrecios + subSuma;
                
                diseñoHTML = diseñoHTML + '<div class="item-carrito" style="border-bottom:1px solid var(--color-borde); padding:0.5rem; display:flex; justify-content:space-between;">';
                diseñoHTML = diseñoHTML + '<span><b>' + bloque.nombre + '</b> (x' + bloque.cantidad + ')</span>';
                diseñoHTML = diseñoHTML + '<span>' + subSuma.toFixed(2) + '€ <button style="margin-left:10px; color:red; border:none; background:none; cursor:pointer;" onclick="gestorCarrito.eliminar(\'' + bloque.id + '\', \'' + bloque.nombre.replace(/'/g, "\\'") + '\')"><i class="fas fa-trash"></i></button></span>';
                diseñoHTML = diseñoHTML + '</div>';
            }
            
            // Reemplaza la estructura visual por un aviso de caja si no hay ningun articulo apilado.
            if (this.elementosGuardados.length === 0) {
                diseñoHTML = "<p>Estado del carrito en este momento: Vacío.</p>";
            }
            contenedorVisivo.innerHTML = diseñoHTML;
        }

        // Estampa al pie del cuadro visual el computo total formateado en euros y centimos.
        let cartelTotal = document.getElementById('carrito-total');
        if (cartelTotal !== null) {
            cartelTotal.innerText = sumaPrecios.toFixed(2);
        }
    },

    procederAlPago: function() {
        // Imposibilita avanzar con transacciones monetarias sin tener contenido declarado.
        if (this.elementosGuardados.length === 0) {
            alert("Atención preventiva: Agregue elementos a su compra antes de solicitar el abono.");
            return;
        }
        
        // Verifica rigurosamente que el usuario se haya identificado con su sesion de cliente activo.
        let credencialActiva = sessionStorage.getItem('usuarioApp');
        if (credencialActiva === null) {
            alert("Verificación fallida: Inicie su sesión acreditada para formalizar pedidos.");
            gestorNavegacion.irA('login');
        } else {
            gestorNavegacion.irA('checkout');
        }
    }
};





