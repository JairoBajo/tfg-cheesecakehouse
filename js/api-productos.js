// GESTOR DEL CATALOGO

let gestorProductos = {
    cargados: false,
    listaProductos: [],
    productoSeleccionado: null,   // Almacena el producto antes de elegir talla

    // Multiplicadores de precio según talla
    factoresTalla: {
        pequena: 0.7,
        mediana: 1.0,
        grande: 1.4
    },
    etiquetasTalla: {
        pequena: 'Pequeña',
        mediana: 'Mediana',
        grande: 'Grande'
    },
    obtenerEtiquetaTalla: function(talla) {
        if (typeof gestorIdioma !== 'undefined') {
            let claves = { pequena: 'talla-pequena', mediana: 'talla-mediana', grande: 'talla-grande' };
            let txt = gestorIdioma.obtenerTexto(claves[talla]);
            if (txt !== claves[talla]) return txt;
        }
        return this.etiquetasTalla[talla];
    },

    cargarCatalogo: function() {
        if (this.cargados === true) return;

        let contenedor = document.getElementById('contenedor-productos');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p style="text-align:center; width:100%;">Cargando base de datos...</p>';

        fetch('api/productos.php')
            .then(function(r) {
                if (!r.ok) throw new Error('API no disponible');
                return r.json();
            })
            .catch(function() {
                return fetch('data/productos.json').then(function(r) { return r.json(); });
            })
            .then(function(datosJSON) {
                contenedor.innerHTML = '';
                gestorProductos.listaProductos = datosJSON;

                // Separar por categoría
                let clasicas   = datosJSON.filter(function(p) { return !p.categoria || p.categoria === 'clasica'; });
                let sinGluten  = datosJSON.filter(function(p) { return p.categoria === 'sin_gluten'; });
                let sinAzucar  = datosJSON.filter(function(p) { return p.categoria === 'sin_azucar'; });

                function renderSeccion(titulo, icono, descripcion, lista, colorBadge, extraClase) {
                    if (lista.length === 0) return '';
                    extraClase = extraClase || '';
                    let html = '<div style="width:100%; margin-bottom:2.5rem;">';
                    html += '<div style="display:flex; align-items:center; gap:0.8rem; margin-bottom:0.5rem;">';
                    html += '<h3 style="color:var(--color-primario); font-size:1.4rem; margin:0;">' + icono + ' ' + titulo + '</h3>';
                    html += '<span style="background:' + colorBadge + '; color:white; font-size:0.75rem; padding:3px 10px; border-radius:20px; font-weight:bold;">' + lista.length + ' tartas</span>';
                    html += '</div>';
                    html += '<p style="color:#777; font-size:0.9rem; margin-bottom:1.2rem;">' + descripcion + '</p>';
                    html += '<div class="cuadricula-productos ' + extraClase + '" style="margin:0;">';
                    lista.forEach(function(producto) {
                        html += gestorProductos.renderTarjeta(producto);
                    });
                    html += '</div></div>';
                    html += '<hr style="border:0; border-top:1px solid var(--color-borde); margin-bottom:2.5rem;">';
                    return html;
                }

                let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto.bind(gestorIdioma) : function(k){return k;};
                contenedor.innerHTML =
                    renderSeccion(t('cat-clasicas-titulo'), '🧀', t('cat-clasicas-desc'), clasicas, '#d35400', 'clasicas-grid') +
                    renderSeccion(t('cat-singluten-titulo'), t('cat-singluten-badge'), t('cat-singluten-desc'), sinGluten, '#27ae60') +
                    renderSeccion(t('cat-sinazucar-titulo'), t('cat-sinazucar-badge'), t('cat-sinazucar-desc'), sinAzucar, '#3498db');

                gestorProductos.cargados = true;

                if (typeof gestorIdioma !== 'undefined') {
                    gestorIdioma.aplicarTraducciones();
                }

                // Cargar valoraciones
                for (let k = 0; k < datosJSON.length; k++) {
                    if (typeof gestorValoraciones !== 'undefined') {
                        gestorValoraciones.cargarEnTarjeta(datosJSON[k].id);
                    }
                }
            });
    },

    renderTarjeta: function(producto) {
        let precioDecimal = parseFloat(producto.precio).toFixed(2);
        let badge = '';
        if (producto.categoria === 'sin_gluten') {
            badge = '<span style="background:#27ae60; color:white; font-size:0.7rem; padding:2px 8px; border-radius:20px; font-weight:bold; margin-bottom:0.5rem; display:inline-block;">' + ((typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('badge-singluten') : '🌾 Sin Gluten') + '</span>';
        } else if (producto.categoria === 'sin_azucar') {
            badge = '<span style="background:#3498db; color:white; font-size:0.7rem; padding:2px 8px; border-radius:20px; font-weight:bold; margin-bottom:0.5rem; display:inline-block;">' + ((typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('badge-sinazucar') : '🍬 Sin Azúcar') + '</span>';
        }

        let html = '<div class="tarjeta-producto">';
        html += '<img src="' + producto.imagen + '" alt="' + producto.nombre + '">';
        html += '<div class="info-producto">';
        html += badge;
        let nombreTrad = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('nombreTarta' + producto.id) : producto.nombre;
        let descTrad   = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('descripcionTarta' + producto.id) : producto.descripcion;
        if (nombreTrad === 'nombreTarta' + producto.id) nombreTrad = producto.nombre;
        if (descTrad   === 'descripcionTarta' + producto.id) descTrad   = producto.descripcion;
        html += '<h3>' + nombreTrad + '</h3>';
        html += '<p>' + descTrad + '</p>';
        let txtSinResenas = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('sin-resenas') : '(sin reseñas)';
        html += '<div id="estrellas-producto-' + producto.id + '" style="margin-bottom:0.5rem; color:#ccc;">☆☆☆☆☆ <small style="color:#777;">' + txtSinResenas + '</small></div>';
        html += '<div class="precio-producto">' + precioDecimal + '€</div>';
        html += '<div style="display:flex; gap:0.5rem; flex-wrap:wrap;">';
        // Cambiamos la llamada para que abra el modal de talla
        let txtComprar = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('btn-comprar') : 'Comprar';
        let txtValorar = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('btn-valorar') : '⭐ Valorar';
        html += '<button class="boton boton-primario" onclick="gestorProductos.abrirModalTalla(' + producto.id + ')">' + txtComprar + '</button>';
        html += '<button class="boton" onclick="gestorValoraciones.abrirModal(' + producto.id + ', \'' + producto.nombre + '\')" style="background:var(--color-fondo); border:1px solid var(--color-borde); color:var(--color-texto);">' + txtValorar + '</button>';
        html += '</div>';
        html += '</div></div>';
        return html;
    },

    // Abre el modal de selección de tamaño para un producto concreto
    abrirModalTalla: function(idProducto) {
        let producto = this.listaProductos.find(function(p) { return String(p.id) === String(idProducto); });
        if (!producto) {
            alert('Producto no encontrado');
            return;
        }
        this.productoSeleccionado = producto;
        let modal = document.getElementById('modal-talla');
        if (modal) {
            // Resetear selección a "pequeña"
            let radios = document.querySelectorAll('input[name="talla"]');
            if (radios.length) radios[0].checked = true;
            modal.style.display = 'flex';
        } else {
            console.error('Modal de talla no encontrado en el DOM');
        }
    },

    cerrarModalTalla: function() {
        let modal = document.getElementById('modal-talla');
        if (modal) modal.style.display = 'none';
        this.productoSeleccionado = null;
    },

    // Se ejecuta al hacer clic en "Añadir al carrito" dentro del modal
    agregarConTalla: function() {
        if (!this.productoSeleccionado) {
            this.cerrarModalTalla();
            return;
        }

        // Obtener la talla seleccionada
        let talla = document.querySelector('input[name="talla"]:checked');
        if (!talla) {
            alert('Por favor, selecciona un tamaño');
            return;
        }
        let tallaValor = talla.value; // 'pequena', 'mediana', 'grande'
        let factor = this.factoresTalla[tallaValor];
        let etiqueta = this.obtenerEtiquetaTalla(tallaValor);

        let precioBase = parseFloat(this.productoSeleccionado.precio);
        let nuevoPrecio = precioBase * factor;
        nuevoPrecio = Math.round(nuevoPrecio * 100) / 100; // redondear a 2 decimales

        // Crear un objeto producto con identificador único que incluya la talla
        let productoConTalla = {
            id: this.productoSeleccionado.id + '_' + tallaValor,   // ej: "1_pequena"
            nombre: this.productoSeleccionado.nombre + ' (' + etiqueta + ')',
            precio: nuevoPrecio,
            imagen: this.productoSeleccionado.imagen,
            // Guardamos el id original por si se necesita en el futuro
            originalId: this.productoSeleccionado.id
        };

        // Añadir al carrito
        if (typeof gestorCarrito !== 'undefined') {
            gestorCarrito.agregar(productoConTalla);
            let sonido = document.getElementById('audio-carrito');
            if (sonido !== null) {
                sonido.currentTime = 0;
                sonido.play().catch(function() {});
            }
        } else {
            alert('Error: el carrito no está disponible');
        }

        this.cerrarModalTalla();
    },

    // Mantenemos la función intentarComprar por compatibilidad, pero ahora redirige al modal
    intentarComprar: function(idProducto) {
        this.abrirModalTalla(idProducto);
    }
};
