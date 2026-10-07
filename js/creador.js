// CREADOR DE TARTAS

// Motor logico para el control de inventario personalizado y tarificacion dinamica.
let gestorCreador = {
    precioBase: 20.00,
    precioExtra: 5.00,
    ingredientesBase: [
        { id: 'ing1',  clave: 'ing-sirope-fresa',  nombreEs: 'Sirope de Fresa' },
        { id: 'ing2',  clave: 'ing-sirope-choco',  nombreEs: 'Sirope de Chocolate' },
        { id: 'ing3',  clave: 'ing-caramelo',      nombreEs: 'Caramelo Fundido' },
        { id: 'ing4',  clave: 'ing-nuez',          nombreEs: 'Nuez Picada' },
        { id: 'ing5',  clave: 'ing-almendra',      nombreEs: 'Almendra Tostada' },
        { id: 'ing6',  clave: 'ing-coco',          nombreEs: 'Virutas de Coco' },
        { id: 'ing7',  clave: 'ing-oreo',          nombreEs: 'Trozos de Oreo' },
        { id: 'ing8',  clave: 'ing-arandanos',     nombreEs: 'Mermelada de Arándanos' },
        { id: 'ing9',  clave: 'ing-mango',         nombreEs: 'Trozos de Mango' },
        { id: 'ing10', clave: 'ing-cacahuete',     nombreEs: 'Crocanti de Cacahuete' }
    ],
    get ingredientes() {
        let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto.bind(gestorIdioma) : null;
        return this.ingredientesBase.map(function(ing) {
            let nombre = t ? t(ing.clave) : ing.nombreEs;
            if (nombre === ing.clave) nombre = ing.nombreEs;
            return { id: ing.id, nombre: nombre };
        });
    },

    iniciar: function() {
        // Selecciona el contenedor del DOM y aborta la ejecucion si no existe.
        let contenedor = document.getElementById('opcionesExtras');
        if (contenedor === null) return;

        // Preserva el contexto de ejecucion actual para invocaciones asincronas.
        let creador = this;

        // Solicita mediante FETCH la tabla de precios configurada en el servidor.
        fetch('api/admin_configuracion.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                if (datos.success && datos.configuraciones.length > 0) {
                    // Itera los parametros devueltos y estabiliza los precios locales.
                    for (let c = 0; c < datos.configuraciones.length; c++) {
                        let conf = datos.configuraciones[c];
                        if (conf.clave === 'precio_base_tarta') {
                            creador.precioBase = parseFloat(conf.valor);
                        }
                        if (conf.clave === 'precio_extra_ingrediente') {
                            creador.precioExtra = parseFloat(conf.valor);
                        }
                    }
                }

                // Inyecta dinamicamente la explicacion textual incorporando los precios reales.
                let textoDesc = document.getElementById('creador-desc-texto');
                if (textoDesc !== null) {
                    let plantillaTexto = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('creador-texto') : 'Crea tu propia tarta personalizada desde cero. La base incluye galleta y crema de queso fresco. Selecciona entre 1 y 3 complementos extra para darle tu toque especial. El primer complemento es totalmente gratuito. Cada complemento adicional sumará {precio}€ al precio base de la tarta.';
                    textoDesc.innerHTML = plantillaTexto.replace('{precio}', creador.precioExtra.toFixed(2));
                }

                // Construye iterativamente la interfaz visual de casillas de verificacion.
                let html = '';
                for (let i = 0; i < creador.ingredientes.length; i++) {
                    let ing = creador.ingredientes[i];
                    html = html + '<div class="grupo-checkbox" style="display:flex; align-items:center; gap:10px; padding:10px; background:var(--color-fondo); border:1px solid var(--color-borde); border-radius:8px;">';
                    html = html + '<input type="checkbox" id="' + ing.id + '" value="' + ing.nombre + '" onchange="gestorCreador.calcularPrecio()">';
                    html = html + '<label for="' + ing.id + '" style="margin:0; font-weight:normal; color:var(--color-texto);">' + ing.nombre + '</label>';
                    html = html + '</div>';
                }
                contenedor.innerHTML = html;

                // Obliga a computar el precio inicial tras renderizar la interfaz.
                creador.calcularPrecio();
            });
    },

    calcularPrecio: function() {
        // Cuantifica linealmente el total de casillas que han sido marcadas.
        let seleccionados = 0;
        for (let i = 0; i < this.ingredientes.length; i++) {
            let check = document.getElementById(this.ingredientes[i].id);
            if (check !== null && check.checked === true) {
                seleccionados = seleccionados + 1;
            }
        }

        // Deshabilita interactivamente los selectores restantes si se alcanza el limite superior permitido.
        for (let j = 0; j < this.ingredientes.length; j++) {
            let check = document.getElementById(this.ingredientes[j].id);
            if (check !== null) {
                if (seleccionados >= 3 && check.checked === false) {
                    check.disabled = true;
                } else {
                    check.disabled = false;
                }
            }
        }

        // Efectua el sumatorio aplicando el margen estipulado por ingredientes excepcionales.
        let precioFinal = this.precioBase;
        if (seleccionados > 1) {
            let extra = seleccionados - 1;
            precioFinal = precioFinal + (extra * this.precioExtra);
        }

        // Exporta la resolucion finalizada al marcador numerico visible por el cliente.
        let etiquetaPrecio = document.getElementById('precioCalculado');
        if (etiquetaPrecio !== null) {
            etiquetaPrecio.innerText = precioFinal.toFixed(2);
        }
    },

    añadirAlCarrito: function() {
        // Impide continuar el flujo si la aplicacion carece de variables de sesion activas.
        let sesionActiva = sessionStorage.getItem('usuarioApp');
        if (sesionActiva === null) {
            alert('Debes iniciar sesión para poder añadir tu tarta al carrito.');
            gestorNavegacion.irA('login');
            return;
        }

        // Almacena estaticamente en un vector los nombres de las opciones marcadas.
        let elegidos = [];
        for (let i = 0; i < this.ingredientes.length; i++) {
            let check = document.getElementById(this.ingredientes[i].id);
            if (check !== null && check.checked === true) {
                elegidos.push(this.ingredientes[i].nombre);
            }
        }

        // Veta logicamente la continuacion si el usuario no declaro ninguna preferencia.
        if (elegidos.length < 1) {
            alert('Atención: Debe seleccionar como mínimo 1 complemento.');
            return;
        }

        // Extrae el recuento de precio actual del bloque renderizado en pantalla.
        let textoDinerario = document.getElementById('precioCalculado').innerText;
        let costeCalculado = parseFloat(textoDinerario);

        // Dispone el empaquetado del articulo para cumplir el formato del gestor de cesta.
        let textoArticulo = 'Tarta Personalizada (' + elegidos.join(', ') + ')';
        let articuloPreparado = {
            id: 1,
            nombre: textoArticulo,
            precio: costeCalculado,
            imagen: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=300'
        };

        // Ejecuta la insercion del paquete si el modulo del carrito esta disponible.
        if (typeof gestorCarrito !== 'undefined') {
            gestorCarrito.agregar(articuloPreparado);

            // Activa un repique acustico para garantizar acuse de recibo sensorial.
            let sonido = document.getElementById('audio-carrito');
            if (sonido !== null) {
                sonido.currentTime = 0;
                sonido.play().catch(function() {});
            }

            alert('Tarta exclusiva añadida al ticket con éxito.');
            gestorNavegacion.irA('carrito');
        } else {
            alert('Error grave: El motor del carrito no responde.');
        }
    }
};




