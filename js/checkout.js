// MECANISMO DE PAGO EN TRES PASOS

let gestorCheckout = {
    pasoActual: 1,
    puntosUsadosDescuento: 0,
    tartasGratisActivadas: false,
    esPrimeraCompra: false,
    compraTotalmenteGratis: false,

    verificarPrimeraCompra: function(callback) {
        let usuario = JSON.parse(sessionStorage.getItem('usuarioApp'));
        if (!usuario) { gestorCheckout.esPrimeraCompra = false; callback(false); return; }
        fetch('api/historial_pedidos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: usuario.id })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            let esPrimera = data.success && Array.isArray(data.pedidos) && data.pedidos.length === 0;
            gestorCheckout.esPrimeraCompra = esPrimera;
            callback(esPrimera);
        })
        .catch(function() {
            gestorCheckout.esPrimeraCompra = false;
            callback(false);
        });
    },

    // Detecta si el CP es de Canarias (35xxx o 38xxx)
    esCanarias: function(cp) {
        return /^(35|38)\d{3}$/.test(cp);
    },

    // Actualiza el aviso visual y recalcula al cambiar el CP
    actualizarIvaCanarias: function(cp) {
        let aviso = document.getElementById('aviso-canarias');
        if (aviso) {
            aviso.style.display = gestorCheckout.esCanarias(cp) ? 'block' : 'none';
        }
        gestorCheckout.recalcularConPuntos();
    },

    // Muestra/oculta los campos específicos según el método de pago
    toggleCampoTarjeta: function() {
        let inputPago    = document.querySelector('input[name="pago"]:checked');
        let campoTarjeta = document.getElementById('campo-tarjeta');
        let campoBizum   = document.getElementById('campo-bizum');
        let campoPaypal  = document.getElementById('campo-paypal');

        if (campoTarjeta) campoTarjeta.style.display = 'none';
        if (campoBizum)   campoBizum.style.display   = 'none';
        if (campoPaypal)  campoPaypal.style.display  = 'none';

        ['chk-tarjeta','chk-cvv','chk-caducidad','chk-telefono-bizum','chk-cuenta-paypal'].forEach(function(id) {
            let el = document.getElementById(id);
            if (el) el.value = '';
        });

        if (inputPago !== null) {
            if (inputPago.value === 'Tarjeta' && campoTarjeta)  campoTarjeta.style.display = 'block';
            else if (inputPago.value === 'Bizum' && campoBizum) campoBizum.style.display   = 'block';
            else if (inputPago.value === 'Paypal' && campoPaypal) campoPaypal.style.display = 'block';
        }
    },

    siguientePaso: function(pasoDestino) {
        if (pasoDestino === 2) {
            let direccion = document.getElementById('chk-direccion').value;
            let cp        = document.getElementById('chk-cp').value;
            let regexCP   = /^[0-9]{5}$/;
            if (direccion === '' || cp === '') {
                alert("Atencion: Debe rellenar todos los campos de direccion.");
                return;
            }
            if (regexCP.test(cp) === false) {
                alert("El Codigo Postal debe tener 5 digitos numericos.");
                return;
            }
        }

        if (pasoDestino === 3) {
            let inputPago   = document.querySelector('input[name="pago"]:checked');
            // Error 3 CORREGIDO: comprobar que hay un método de pago seleccionado antes de acceder a .value.
            if (!inputPago) {
                alert("Por favor, selecciona un método de pago.");
                return;
            }
            let metodoPago  = inputPago.value;

            if (metodoPago === 'Tarjeta') {
                let tarjeta   = document.getElementById('chk-tarjeta').value;
                let cvv       = document.getElementById('chk-cvv').value;
                let caducidad = document.getElementById('chk-caducidad').value;
                if (/^[0-9]{16}$/.test(tarjeta) === false) {
                    alert("Tarjeta invalida. Verifique que contiene 16 digitos sin espacios ni letras.");
                    return;
                }
                if (/^[0-9]{3,4}$/.test(cvv) === false) {
                    alert("CVV invalido. Debe contener 3 o 4 digitos numericos.");
                    return;
                }
                if (/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(caducidad) === false) {
                    alert("Fecha de caducidad invalida. Use el formato MM/AA (ej: 05/27).");
                    return;
                }
                let partes  = caducidad.split('/');
                let mesExp  = parseInt(partes[0]);
                let anioExp = parseInt('20' + partes[1]);
                let ahora   = new Date();
                if (anioExp < ahora.getFullYear() || (anioExp === ahora.getFullYear() && mesExp < (ahora.getMonth() + 1))) {
                    alert("La tarjeta esta caducada. Por favor, use una tarjeta valida.");
                    return;
                }

            } else if (metodoPago === 'Bizum') {
                let telefono = document.getElementById('chk-telefono-bizum').value;
                if (/^[6789][0-9]{8}$/.test(telefono) === false) {
                    alert("Numero de telefono Bizum invalido. Debe ser un movil espanol de 9 digitos (ej: 612345678).");
                    return;
                }

            } else if (metodoPago === 'Paypal') {
                let cuenta = document.getElementById('chk-cuenta-paypal').value;
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cuenta) === false) {
                    alert("Cuenta PayPal invalida. Introduzca el email asociado a su cuenta PayPal.");
                    return;
                }
            }

            gestorCheckout.verificarPrimeraCompra(function() {
                document.getElementById('checkout-paso-1').style.display = 'none';
                document.getElementById('checkout-paso-2').style.display = 'none';
                document.getElementById('checkout-paso-3').style.display = 'block';
                gestorCheckout.pasoActual = 3;
                gestorCheckout.calcularFinanzas();
                gestorCheckout.mostrarBloquesPuntos();
            });
            return;
        }

        if (pasoDestino === 1) document.getElementById('checkout-paso-1').style.display = 'block';
        else document.getElementById('checkout-paso-1').style.display = 'none';

        if (pasoDestino === 2) document.getElementById('checkout-paso-2').style.display = 'block';
        else document.getElementById('checkout-paso-2').style.display = 'none';

        if (pasoDestino === 3) document.getElementById('checkout-paso-3').style.display = 'block';
        else document.getElementById('checkout-paso-3').style.display = 'none';

        this.pasoActual = pasoDestino;
    },

    mostrarBloquesPuntos: function() {
        let puntos = typeof gestorPuntos !== 'undefined' ? gestorPuntos.puntosTotales : 0;
        let elPuntos = document.getElementById('chk-puntos-disponibles');
        if (elPuntos) elPuntos.innerText = puntos;

        // Compra gratis con 200 puntos
        let bloqueCompraGratis = document.getElementById('bloque-compra-gratis-200');
        if (bloqueCompraGratis) {
            if (puntos >= 200) {
                bloqueCompraGratis.style.display = 'block';
                let elPts200 = document.getElementById('chk-puntos-compra-gratis');
                if (elPts200) elPts200.innerText = puntos;
            } else {
                bloqueCompraGratis.style.display = 'none';
            }
        }

        // Descuento por puntos (10 pts = 1 euro)
        let subtotal = parseFloat(document.getElementById('carrito-total').innerText) || 0;
        let maxDescuentoPuntos = Math.floor(puntos / 10);
        let bloqueDescuento = document.getElementById('bloque-descuento-puntos');
        if (bloqueDescuento) {
            if (puntos >= 10) {
                bloqueDescuento.style.display = 'block';
                document.getElementById('chk-max-descuento-puntos').innerText = maxDescuentoPuntos.toFixed(2);
                document.getElementById('chk-puntos-canjear').max = Math.min(puntos, maxDescuentoPuntos * 10);
            } else {
                bloqueDescuento.style.display = 'none';
            }
        }

        let elSin = document.getElementById('chk-puntos-sin-beneficios');
        if (elSin) {
            if (puntos === 0) {
                elSin.innerText = 'Aun no tienes puntos. Ganas 1 punto por cada euro que gastes!';
            } else if (puntos < 10) {
                elSin.innerText = 'Con ' + puntos + ' punto(s) aun no puedes canjear. Necesitas 10 para 1 de descuento y 200 para una compra gratis.';
            } else if (puntos < 200) {
                elSin.innerText = 'Te faltan ' + (200 - puntos) + ' puntos para conseguir una compra completamente gratis!';
            } else {
                elSin.innerText = '';
            }
        }

        // Resetear selecciones al entrar en el paso 3
        let chkCompraGratis = document.getElementById('chk-usar-compra-gratis');
        if (chkCompraGratis) chkCompraGratis.checked = false;
        let inputCanjear = document.getElementById('chk-puntos-canjear');
        if (inputCanjear) inputCanjear.value = 0;
        this.puntosUsadosDescuento = 0;
        this.tartasGratisActivadas = false;
        this.compraTotalmenteGratis = false;
        this.recalcularConPuntos();
    },

    recalcularConPuntos: function() {
        if (!document.getElementById('resumen-subtotal')) return;

        let subtotalConIva = parseFloat(document.getElementById('carrito-total').innerText) || 0;
        let cp = document.getElementById('chk-cp') ? document.getElementById('chk-cp').value : '';
        let esCanarias = gestorCheckout.esCanarias(cp);
        // Los precios ya incluyen IVA del 10%. Si es Canarias, eliminamos el IVA.
        let subtotal = esCanarias ? subtotalConIva / 1.10 : subtotalConIva;
        let porcentajeIva = esCanarias ? 0 : 0.10;

        // Descuento 10%: SOLO primera compra
        let descuentoPromo = gestorCheckout.esPrimeraCompra ? subtotal * 0.10 : 0;

        let filaDescPromo   = document.getElementById('fila-descuento-promo');
        let etiquetaDescPromo = document.getElementById('etiqueta-descuento-promo');
        if (filaDescPromo) filaDescPromo.style.display = gestorCheckout.esPrimeraCompra ? 'flex' : 'none';

        // Compra gratis (200 puntos)
        let chkCompraGratis = document.getElementById('chk-usar-compra-gratis');
        this.compraTotalmenteGratis = chkCompraGratis ? chkCompraGratis.checked : false;

        if (this.compraTotalmenteGratis) {
            document.getElementById('resumen-subtotal').innerText  = subtotal.toFixed(2) + '€';
            document.getElementById('resumen-descuento').innerText = '- ' + descuentoPromo.toFixed(2) + '€';
            document.getElementById('resumen-iva').innerText       = '0.00€ (0%)';
            document.getElementById('resumen-total').innerText     = '0.00€';

            let filaCompraGratis = document.getElementById('fila-compra-gratis');
            let resCompraGratis  = document.getElementById('resumen-compra-gratis');
            if (filaCompraGratis) filaCompraGratis.style.display = 'flex';
            if (resCompraGratis)  resCompraGratis.innerText = '- ' + subtotal.toFixed(2) + '€';

            let filaDP = document.getElementById('fila-descuento-puntos');
            if (filaDP) filaDP.style.display = 'none';
            return;
        } else {
            let filaCompraGratis2 = document.getElementById('fila-compra-gratis');
            if (filaCompraGratis2) filaCompraGratis2.style.display = 'none';
        }

        let base = subtotal - descuentoPromo;

        // Descuento por puntos
        let inputCanjear   = document.getElementById('chk-puntos-canjear');
        let puntosACanjear = inputCanjear ? (parseInt(inputCanjear.value) || 0) : 0;
        let puntos         = typeof gestorPuntos !== 'undefined' ? gestorPuntos.puntosTotales : 0;
        let maxPuntosCanjear = Math.floor(puntos / 10) * 10;
        if (puntosACanjear > maxPuntosCanjear) {
            puntosACanjear = maxPuntosCanjear;
            if (inputCanjear) inputCanjear.value = puntosACanjear;
        }
        let descuentoPuntos = puntosACanjear / 10;
        this.puntosUsadosDescuento = puntosACanjear;

        let elDescVal = document.getElementById('chk-descuento-puntos-valor');
        if (elDescVal) elDescVal.innerText = descuentoPuntos.toFixed(2);

        base = Math.max(0, base - descuentoPuntos);
        let iva   = base * porcentajeIva;
        let total = base + iva;

        document.getElementById('resumen-subtotal').innerText  = subtotal.toFixed(2) + '€';
        document.getElementById('resumen-descuento').innerText = '- ' + descuentoPromo.toFixed(2) + '€';

        let filaDescPuntos = document.getElementById('fila-descuento-puntos');
        let resDescPuntos  = document.getElementById('resumen-descuento-puntos');
        if (filaDescPuntos) filaDescPuntos.style.display = descuentoPuntos > 0 ? 'flex' : 'none';
        if (resDescPuntos)  resDescPuntos.innerText = '- ' + descuentoPuntos.toFixed(2) + '€';

        document.getElementById('resumen-iva').innerText   = esCanarias
            ? gestorIdioma.obtenerTexto('chk-iva-canarias')
            : iva.toFixed(2) + '€ (IVA ' + (porcentajeIva * 100) + '% incluido)';
        document.getElementById('resumen-total').innerText = total.toFixed(2) + '€';
    },

    calcularFinanzas: function() {
        this.recalcularConPuntos();
    },

    procesarPedido: function() {
        let direccion  = document.getElementById('chk-direccion').value;
        let piso       = document.getElementById('chk-piso') ? document.getElementById('chk-piso').value : '';
        let puerta     = document.getElementById('chk-puerta') ? document.getElementById('chk-puerta').value : '';
        let tipoInmueble = document.getElementById('chk-tipo-inmueble') ? document.getElementById('chk-tipo-inmueble').value : '';
        let ciudad     = document.getElementById('chk-ciudad').value;
        let cp         = document.getElementById('chk-cp').value;
        // Error 3b CORREGIDO: comprobar que hay método de pago seleccionado antes de acceder a .value.
        let pagoChecked = document.querySelector('input[name="pago"]:checked');
        if (!pagoChecked) {
            alert("Por favor, selecciona un método de pago.");
            return;
        }
        let metodoPago = pagoChecked.value;

        // Construir dirección completa
        let dirCompleta = direccion;
        if (piso) dirCompleta += ', ' + piso;
        if (puerta) dirCompleta += ' ' + puerta;
        if (tipoInmueble) dirCompleta += ' (' + tipoInmueble + ')';

        let subtotalConIva = parseFloat(document.getElementById('carrito-total').innerText) || 0;
        let esCanariasCalc = gestorCheckout.esCanarias(cp);
        let subtotalCalc   = esCanariasCalc ? subtotalConIva / 1.10 : subtotalConIva;
        let ivaCalc        = esCanariasCalc ? 0 : 0.10;
        let descPromoCalc  = gestorCheckout.esPrimeraCompra ? subtotalCalc * 0.10 : 0;

        let totalPago;
        let puntosGastados = gestorCheckout.puntosUsadosDescuento;

        if (gestorCheckout.compraTotalmenteGratis) {
            totalPago = '0.00';
            puntosGastados += 200;
        } else {
            let puntosCanjeados = parseInt(document.getElementById('chk-puntos-canjear') ? document.getElementById('chk-puntos-canjear').value : 0) || 0;
            let descPuntosCalc  = puntosCanjeados / 10;
            let baseCalc = Math.max(0, subtotalCalc - descPromoCalc - descPuntosCalc);
            totalPago = (baseCalc + baseCalc * ivaCalc).toFixed(2);
        }

        let usuario = JSON.parse(sessionStorage.getItem('usuarioApp'));

        let datosPedido = {
            usuario_id:  usuario.id,
            direccion:   dirCompleta + ', ' + cp + ', ' + ciudad + ' (España)',
            metodo_pago: metodoPago,
            total:       totalPago,
            items:       gestorCarrito.elementosGuardados
        };

        fetch('api/pedidos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosPedido)
        })
        .then(function(res) { return res.json(); })
        .then(function(data) {
            if (data.success) {
                let puntosGanados = gestorCheckout.compraTotalmenteGratis ? 0 : Math.floor(parseFloat(totalPago));

                let msg = 'Transaccion confirmada. Se le enviara el comprobante por correo.\n\n';
                if (gestorCheckout.compraTotalmenteGratis) {
                    msg += 'Has canjeado tu compra GRATIS con 200 puntos!';
                } else {
                    msg += 'Has ganado ' + puntosGanados + ' puntos con este pedido.';
                    if (gestorCheckout.esPrimeraCompra) {
                        msg += '\nSe ha aplicado el descuento de bienvenida del 10%.';
                    }
                    if (puntosGastados > 0) {
                        msg += '\nHas canjeado ' + puntosGastados + ' puntos.';
                    }
                }
                alert(msg);

                if (typeof gestorPuntos !== 'undefined') {
                    if (puntosGanados > 0) gestorPuntos.sumar(usuario.id, puntosGanados);
                    if (puntosGastados > 0) gestorPuntos.gastar(usuario.id, puntosGastados);
                }

                gestorCarrito.elementosGuardados = [];
                gestorCarrito.actualizarInterfaz();
                gestorCheckout.siguientePaso(1);
                gestorNavegacion.irA('inicio');
            } else {
                alert('Error en la pasarela de pagos.');
            }
        });
    }
};
