// ============================================================
// VALORACIONES Y RESEÑAS
// ============================================================
let gestorValoraciones = {

    abrirModal: function(productoId, nombreProducto) {
        let sesion = sessionStorage.getItem('usuarioApp');
        if (!sesion) {
            alert('Debes iniciar sesión para valorar.');
            gestorNavegacion.irA('login');
            return;
        }
        document.getElementById('modal-val-titulo').innerText = 'Valorar: ' + nombreProducto;
        document.getElementById('modal-val-producto-id').value = productoId;
        document.getElementById('modal-val-comentario').value = '';
        this.seleccionarEstrella(0);
        document.getElementById('modal-valoracion').style.display = 'flex';
    },

    cerrarModal: function() {
        document.getElementById('modal-valoracion').style.display = 'none';
    },

    seleccionarEstrella: function(n) {
        document.getElementById('modal-val-estrellas').value = n;
        let estrellas = document.querySelectorAll('.estrella-selector');
        estrellas.forEach(function(s, i) {
            s.style.color = i < n ? '#d35400' : '#ccc';
        });
    },

    guardar: function() {
        let estrellas = parseInt(document.getElementById('modal-val-estrellas').value);
        if (estrellas < 1) { alert('Selecciona al menos 1 estrella.'); return; }
        let productoId = document.getElementById('modal-val-producto-id').value;
        let comentario = document.getElementById('modal-val-comentario').value;
        let usuario = JSON.parse(sessionStorage.getItem('usuarioApp'));

        fetch('api/valoraciones.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: usuario.id, producto_id: productoId, estrellas: estrellas, comentario: comentario })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                alert('¡Gracias por tu valoración!');
                gestorValoraciones.cerrarModal();
                gestorValoraciones.cargarEnTarjeta(productoId);
            } else {
                alert('Error al guardar la valoración.');
            }
        });
    },

    cargarEnTarjeta: function(productoId) {
        fetch('api/valoraciones.php?producto_id=' + productoId)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            let el = document.getElementById('estrellas-producto-' + productoId);
            if (el) {
                let estrellas = '';
                for (let i = 1; i <= 5; i++) {
                    estrellas += i <= Math.round(data.media) ? '★' : '☆';
                }
                let txtResenas = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('resenas') : 'reseñas';
                el.innerHTML = '<span style="color:#d35400; font-size:1.1rem;">' + estrellas + '</span> <small style="color:#777;">(' + data.total + ' ' + txtResenas + ')</small>';
            }
        });
    }
};

// ============================================================
// CALCULADORA DE PORCIONES
// ============================================================
let gestorCalculadora = {
    abrir: function() {
        document.getElementById('modal-calculadora').style.display = 'flex';
        this.calcular();
    },
    cerrar: function() {
        document.getElementById('modal-calculadora').style.display = 'none';
    },
    calcular: function() {
        let personas = parseInt(document.getElementById('calc-personas').value) || 1;
        let resultado = document.getElementById('calc-resultado');
        let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto.bind(gestorIdioma) : function(k){return k;};
        let recomendacion, detalle;

        if (personas <= 2) {
            recomendacion = t('calc-individual');
            detalle = t('calc-individual-det');
        } else if (personas <= 4) {
            recomendacion = t('calc-pequena');
            detalle = t('calc-pequena-det');
        } else if (personas <= 8) {
            recomendacion = t('calc-mediana');
            detalle = t('calc-mediana-det');
        } else if (personas <= 14) {
            recomendacion = t('calc-grande');
            detalle = t('calc-grande-det');
        } else {
            let tartas = Math.ceil(personas / 14);
            recomendacion = tartas + t('calc-multiples');
            detalle = t('calc-multiples-det');
        }

        resultado.innerHTML = '<div style="background:var(--color-fondo); border:1px solid var(--color-borde); border-radius:8px; padding:1rem; margin-top:1rem;">'
            + '<p style="font-size:1.2rem; color:var(--color-primario); font-weight:bold; margin-bottom:0.5rem;">📦 ' + recomendacion + '</p>'
            + '<p style="color:var(--color-texto);">' + detalle + '</p>'
            + '<p style="color:#777; font-size:0.85rem; margin-top:0.5rem;">' + t('calc-aprox') + Math.round(personas * 120) + t('calc-aprox-2') + '</p>'
            + '</div>';
    }
};

// ============================================================
// MODO SORPRÉNDEME
// ============================================================
let gestorSorpresa = {
    activar: function() {
        if (!gestorProductos.listaProductos || gestorProductos.listaProductos.length === 0) {
            alert('La carta aún se está cargando. Inténtalo en un momento.');
            return;
        }
        let sesion = sessionStorage.getItem('usuarioApp');
        if (!sesion) {
            alert('Debes iniciar sesión para usar esta función.');
            gestorNavegacion.irA('login');
            return;
        }
        let lista = gestorProductos.listaProductos;
        let aleatorio = lista[Math.floor(Math.random() * lista.length)];

        // Animación en el botón
        let btn = document.getElementById('btn-sorpresa');
        if (btn) {
            btn.innerText = '🎲 ¡Añadiendo...';
            btn.disabled = true;
            setTimeout(function() {
                btn.innerText = '🎲 ¡Sorpréndeme!';
                btn.disabled = false;
            }, 1500);
        }

        gestorCarrito.agregar(Object.assign({}, aleatorio));
        setTimeout(function() {
            alert('🎉 Hemos añadido una ' + aleatorio.nombre + ' a tu carrito. ¡Esperamos que te encante!');
        }, 300);
    }
};

// ============================================================
// SISTEMA DE PUNTOS
// ============================================================
let gestorPuntos = {
    puntosTotales: 0,

    cargar: function(usuarioId) {
        fetch('api/puntos.php?usuario_id=' + usuarioId)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                gestorPuntos.puntosTotales = data.puntos;
                gestorPuntos.actualizarUI();
            }
        });
    },

    sumar: function(usuarioId, total) {
        // 1 punto por cada euro gastado
        let puntosGanados = Math.floor(parseFloat(total));
        if (puntosGanados < 1) return;

        fetch('api/puntos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: usuarioId, puntos_ganados: puntosGanados })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                gestorPuntos.puntosTotales = data.puntos_totales;
                gestorPuntos.actualizarUI();
                alert('🏆 ¡Has ganado ' + puntosGanados + ' puntos! Ahora tienes ' + data.puntos_totales + ' puntos en total.');
            }
        });
    },

    gastar: function(usuarioId, puntosGastados) {
        if (puntosGastados < 1) return;
        fetch('api/puntos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: usuarioId, puntos_ganados: -puntosGastados })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (data.success) {
                gestorPuntos.puntosTotales = data.puntos_totales;
                gestorPuntos.actualizarUI();
            }
        });
    },

    actualizarUI: function() {
        let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto.bind(gestorIdioma) : function(k) { return k; };
        let el = document.getElementById('puntos-usuario');
        if (el) {
            let nivel = gestorPuntos.calcularNivel(gestorPuntos.puntosTotales);
            let nombreNivel = t('nivel-' + nivel.nombre) || nivel.nombre;
            el.innerHTML = '<i class="fas fa-star" style="color:#d35400;"></i> '
                + gestorPuntos.puntosTotales + ' pts &nbsp;|&nbsp; '
                + '<span style="color:var(--color-primario); font-weight:bold;">' + nombreNivel + '</span>';
        }
        let elPerfil = document.getElementById('perfil-puntos-valor');
        if (elPerfil) {
            let nivel = gestorPuntos.calcularNivel(gestorPuntos.puntosTotales);
            let nombreNivel = t('nivel-' + nivel.nombre) || nivel.nombre;
            let txtAcum = t('perfil-puntos-acum') || 'puntos acumulados';
            let txtNivel = t('perfil-nivel') || 'Nivel';
            // Error 5 CORREGIDO: mostrar mensaje especial si ya se ha alcanzado el nivel máximo.
            let txtProgreso;
            if (nivel.esMaximo) {
                txtProgreso = '<small style="color:#d35400; font-weight:bold;">👑 ¡Nivel máximo alcanzado!</small>';
            } else {
                let txtProximo = t('perfil-proximo-nivel') || 'Próximo nivel en';
                let txtPuntos = t('perfil-proximo-nivel-2') || 'puntos';
                txtProgreso = '<small style="color:#777;">' + txtProximo + ' ' + (nivel.siguiente - gestorPuntos.puntosTotales) + ' ' + txtPuntos + '</small>';
            }
            elPerfil.innerHTML = '<span style="font-size:1.5rem; color:var(--color-primario); font-weight:bold;">'
                + gestorPuntos.puntosTotales + '</span> ' + txtAcum + '<br>'
                + '<span style="color:var(--color-secundario);">' + nivel.icono + ' ' + txtNivel + ': ' + nombreNivel + '</span><br>'
                + txtProgreso;
        }
    },

    calcularNivel: function(puntos) {
        if (puntos < 50)  return { nombre: 'Novato',    icono: '🥐', siguiente: 50,   esMaximo: false };
        if (puntos < 150) return { nombre: 'Aficionado', icono: '🧀', siguiente: 150,  esMaximo: false };
        if (puntos < 300) return { nombre: 'Experto',   icono: '🎂', siguiente: 300,  esMaximo: false };
        // Error 5 CORREGIDO: nivel máximo, no hay siguiente nivel real.
        return { nombre: 'Maestro Cheesecake', icono: '👑', siguiente: null, esMaximo: true };
    }
};

// ============================================================
// HISTORIAL MEJORADO
// ============================================================
let gestorHistorialMejorado = {
    cargar: function(usuarioId) {
        let contenedor = document.getElementById('listaPedidosPerfil');
        if (!contenedor) return;

        // La API espera POST con usuario_id en el body
        fetch('api/historial_pedidos.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario_id: usuarioId })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto.bind(gestorIdioma) : function(k) { return k; };
            let idioma = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.idiomaActual : 'es';
            let localeMap = { es: 'es-ES', en: 'en-GB' };
            let locale = localeMap[idioma] || 'es-ES';

            if (!data.success || !data.pedidos || data.pedidos.length === 0) {
                contenedor.innerHTML = '<p style="color:#777; text-align:center; padding:2rem;">' + t('perfil-sin-pedidos') + '</p>';
                return;
            }

            let html = '';
            data.pedidos.forEach(function(pedido) {
                let fecha = new Date(pedido.creado_en).toLocaleDateString(locale, { day:'2-digit', month:'long', year:'numeric' });
                let estadoOriginal = pedido.estado || 'Pendiente';
                let estadoTraducido = t('estado-' + estadoOriginal) || estadoOriginal;
                let estadoColor = {
                    'Pendiente': '#e67e22',
                    'En preparación': '#3498db',
                    'Enviado': '#9b59b6',
                    'Entregado': '#27ae60'
                }[estadoOriginal] || '#e67e22';
                let direccion = pedido.direccion_envio || pedido.direccion || 'No especificada';
                let total = parseFloat(pedido.total_amount || pedido.total || 0).toFixed(2);

                html += '<div style="border:1px solid var(--color-borde); border-radius:8px; padding:1rem; margin-bottom:1rem; background:var(--color-fondo);">'
                    + '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">'
                    + '<strong style="color:var(--color-primario);">' + t('perfil-pedido-num') + pedido.id + '</strong>'
                    + '<span style="background:' + estadoColor + '; color:white; padding:2px 10px; border-radius:20px; font-size:0.8rem;">' + estadoTraducido + '</span>'
                    + '</div>'
                    + '<p style="color:#777; font-size:0.85rem; margin-bottom:0.3rem;"><i class="fas fa-calendar" style="width:16px;"></i> ' + fecha + '</p>'
                    + '<p style="color:#777; font-size:0.85rem; margin-bottom:0.3rem;"><i class="fas fa-map-marker-alt" style="width:16px;"></i> ' + direccion + '</p>'
                    + '<p style="color:#777; font-size:0.85rem; margin-bottom:0.8rem;"><i class="fas fa-credit-card" style="width:16px;"></i> ' + (pedido.metodo_pago || '') + '</p>'
                    + '<div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--color-borde); padding-top:0.8rem;">'
                    + '<strong style="color:var(--color-texto); font-size:1.1rem;">' + t('perfil-total') + ' ' + total + '€</strong>'
                    + '<button class="boton boton-primario" style="padding:0.3rem 0.8rem; font-size:0.85rem;" onclick="gestorHistorialMejorado.repetirPedido(' + pedido.id + ')">'
                    + '<i class="fas fa-redo"></i> ' + t('perfil-repetir') + '</button>'
                    + '</div>'
                    + '</div>';
            });
            contenedor.innerHTML = html;
        });
    },

    repetirPedido: function(pedidoId) {
        fetch('api/detalle_pedido.php?pedido_id=' + pedidoId)
        .then(function(r) { return r.json(); })
        .then(function(data) {
            if (!data.success || data.items.length === 0) {
                alert('No se encontraron productos en este pedido.');
                return;
            }
            // Añadir cada producto al carrito con su cantidad
            data.items.forEach(function(item) {
                for (let i = 0; i < item.cantidad; i++) {
                    gestorCarrito.agregar({
                        id: item.id,
                        nombre: item.nombre,
                        precio: parseFloat(item.precio),
                        imagen: item.imagen
                    });
                }
            });
            alert('✅ Se han añadido ' + data.items.length + ' producto(s) del pedido #' + pedidoId + ' a tu carrito.');
            gestorNavegacion.irA('carrito');
        })
        .catch(function() {
            alert('Error al recuperar los productos del pedido.');
        });
    }
};
