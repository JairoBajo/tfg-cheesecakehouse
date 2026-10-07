// CONSOLA PROTEGIDA ADMINISTRATIVA

// Modulo integral de gestion para usuarios, inventario y transacciones del sistema.
// Requiere validacion de privilegios tipo 'Administrador' desde el backend.
let gestorAdmin = {

    mostrarSeccion: function(nombre) {
        // Itera sobre el vector de secciones para ocultarlas previniendo superposiciones.
        let secciones = ['usuarios', 'productos', 'pedidos', 'creador', 'mensajes', 'valoraciones'];
        for (let i = 0; i < secciones.length; i++) {
            let elemento = document.getElementById('areaAdmin' + secciones[i]);
            if (elemento !== null) {
                elemento.style.display = 'none';
            }
        }

        // Restablece la visibilidad exclusivamente del bloque interactuado por el administrador.
        let seccionElegida = document.getElementById('areaAdmin' + nombre);
        if (seccionElegida !== null) {
            seccionElegida.style.display = 'block';
        }

        // Ejecuta la carga dinamica de la base de datos dependiendo de la eleccion activa.
        if (nombre === 'usuarios') {
            this.cargarUsuarios();
        }
        if (nombre === 'productos') {
            this.cargarProductosAdmin();
        }
        if (nombre === 'pedidos') {
            this.cargarPedidos();
        }
        if (nombre === 'creador') {
            this.cargarConfiguracionCreador();
        }
        if (nombre === 'mensajes') {
            this.cargarMensajesContacto();
        }
        if (nombre === 'valoraciones') {
            this.cargarValoracionesAdmin();
        }
    },

    // GESTION DE USUARIOS

    // Solicita al servidor el censo completo de usuarios mediante una peticion asincrona GET.
    // Renderiza una tabla estructurada con las acciones correspondientes (editar, eliminar).
    cargarUsuarios: function() {
        let contenedor = document.getElementById('listadoUsuarios');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p>Conectando con la base de datos...</p>';

        fetch('api/admin_usuarios.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                if (datos.success && datos.usuarios.length > 0) {
                    let htmlTabla = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
                    htmlTabla = htmlTabla + '<tr style="border-bottom: 2px solid var(--color-primario);">';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">ID</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Nombre</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Email</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Rol</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Fecha Alta</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Acciones</th>';
                    htmlTabla = htmlTabla + '</tr>';

                    // Iteracion metodica para rellenar las filas de la tabla de control.
                    for (let i = 0; i < datos.usuarios.length; i++) {
                        let u = datos.usuarios[i];
                        let rolTexto = 'Cliente';
                        if (Number(u.es_admin) === 1) {
                            rolTexto = 'Administrador';
                        }

                        htmlTabla = htmlTabla + '<tr id="registro_usuario_' + u.id + '" style="border-bottom: 1px solid var(--color-borde);">';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + u.id + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;" id="campo_nombre_' + u.id + '">' + u.nombre + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;" id="campo_email_' + u.id + '">' + u.email + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + rolTexto + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + (u.creado_en || 'Sin fecha') + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">';
                        htmlTabla = htmlTabla + '<button class="boton" style="background:var(--color-secundario);color:white;padding:0.2rem 0.5rem;font-size:0.8rem;margin-right:5px;" onclick="gestorAdmin.activarEdicionUsuario(' + u.id + ')"><i class="fas fa-edit"></i> Editar</button>';
                        htmlTabla = htmlTabla + '<button class="boton" style="background:#dc3545;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="gestorAdmin.eliminarUsuario(' + u.id + ')"><i class="fas fa-trash"></i> Eliminar</button>';
                        htmlTabla = htmlTabla + '</td>';
                        htmlTabla = htmlTabla + '</tr>';
                    }

                    htmlTabla = htmlTabla + '</table>';
                    contenedor.innerHTML = htmlTabla;
                } else {
                    contenedor.innerHTML = '<p style="text-align:center; color:#777;">No se encontraron usuarios en el sistema.</p>';
                }
            });
    },

    activarEdicionUsuario: function(id) {
        // Habilita la edicion sustituyendo el texto estatico por campos variables interactivos.
        let tdNombre = document.getElementById('campo_nombre_' + id);
        let tdEmail = document.getElementById('campo_email_' + id);
        if (tdNombre === null || tdEmail === null) return;

        let nombreActual = tdNombre.innerText;
        let emailActual = tdEmail.innerText;

        // Inyecta formularios dinamicos pre-rellenados con las cadenas de texto presentes.
        tdNombre.innerHTML = '<input type="text" id="editor_nombre_' + id + '" class="input-form" value="' + nombreActual + '" style="padding:0.3rem;font-size:0.9rem;">';
        tdEmail.innerHTML = '<input type="email" id="editor_email_' + id + '" class="input-form" value="' + emailActual + '" style="padding:0.3rem;font-size:0.9rem;">';

        // Reemplaza los botones de edicion por confirmacion y cancelacion.
        let fila = document.getElementById('registro_usuario_' + id);
        if (fila !== null) {
            let celdas = fila.getElementsByTagName('td');
            let ultimaCelda = celdas[celdas.length - 1];
            ultimaCelda.innerHTML = '<button class="boton" style="background:green;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;margin-right:5px;" onclick="gestorAdmin.guardarUsuario(' + id + ')"><i class="fas fa-save"></i> Guardar</button>';
            ultimaCelda.innerHTML = ultimaCelda.innerHTML + '<button class="boton" style="background:#6c757d;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="gestorAdmin.cargarUsuarios()"><i class="fas fa-times"></i> Cancelar</button>';
        }
    },

    guardarUsuario: function(id) {
        // Captura las nuevas cadenas del formulario introducidas por el gestor.
        let inputNombre = document.getElementById('editor_nombre_' + id);
        let inputEmail = document.getElementById('editor_email_' + id);
        if (inputNombre === null || inputEmail === null) return;

        let nuevoNombre = inputNombre.value.trim();
        let nuevoEmail = inputEmail.value.trim();

        // Asegura la integridad conceptual antes de lanzar peticiones defectuosas.
        if (nuevoNombre === '' || nuevoEmail === '') {
            alert('Error: Todos los campos son obligatorios.');
            return;
        }

        let datosEnvio = { id: id, nombre: nuevoNombre, email: nuevoEmail };

        // Lanza una solicitud mecanizada tipo PUT para sobreescribir datos especificos.
        fetch('api/admin_usuarios.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnvio)
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                alert('Usuario actualizado correctamente.');
                gestorAdmin.cargarUsuarios();
            } else {
                alert('Error al actualizar: ' + datos.message);
            }
        });
    },

    eliminarUsuario: function(id) {
        // Impone una confirmacion emergente previniendo una modificacion accidental de la base de datos.
        let confirmado = confirm('¿Está seguro de que desea eliminar este usuario? Esta acción no se puede deshacer.');
        if (confirmado === false) return;

        // Formula peticion formal de tipo DELETE indicando la clave identificativa de usuario.
        fetch('api/admin_usuarios.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                alert('Usuario eliminado del sistema.');
                gestorAdmin.cargarUsuarios();
            } else {
                alert('Error al eliminar: ' + datos.message);
            }
        });
    },

    // GESTION DE PRODUCTOS

    // Solicita el volumen de inventario a la interfaz PHP para procesarlo visualmente interactivo.
    cargarProductosAdmin: function() {
        let contenedor = document.getElementById('listadoProductos');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p>Conectando con la base de datos...</p>';

        fetch('api/productos.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datosJSON) {
                let htmlTabla = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
                htmlTabla = htmlTabla + '<tr style="border-bottom: 2px solid var(--color-primario);">';
                htmlTabla = htmlTabla + '<th style="padding: 10px;">ID</th>';
                htmlTabla = htmlTabla + '<th style="padding: 10px;">Nombre</th>';
                htmlTabla = htmlTabla + '<th style="padding: 10px;">Descripción</th>';
                htmlTabla = htmlTabla + '<th style="padding: 10px;">Precio</th>';
                htmlTabla = htmlTabla + '<th style="padding: 10px;">Acciones</th>';
                htmlTabla = htmlTabla + '</tr>';

                //Iteracion basica para rellenar la tabla celda por celda
                for (let i = 0; i < datosJSON.length; i++) {
                    let p = datosJSON[i];
                    htmlTabla = htmlTabla + '<tr id="registro_producto_' + p.id + '" style="border-bottom: 1px solid var(--color-borde);">';
                    htmlTabla = htmlTabla + '<td style="padding: 10px;">' + p.id + '</td>';
                    htmlTabla = htmlTabla + '<td style="padding: 10px;" id="item_nombre_' + p.id + '">' + p.nombre + '</td>';
                    htmlTabla = htmlTabla + '<td style="padding: 10px;" id="item_desc_' + p.id + '">' + p.descripcion + '</td>';
                    htmlTabla = htmlTabla + '<td style="padding: 10px;" id="item_precio_' + p.id + '">' + p.precio + '€</td>';
                    htmlTabla = htmlTabla + '<td style="padding: 10px;">';
                    htmlTabla = htmlTabla + '<button class="boton" style="background:var(--color-secundario);color:white;padding:0.2rem 0.5rem;font-size:0.8rem;margin-right:5px;" onclick="gestorAdmin.activarEdicionProducto(' + p.id + ')"><i class="fas fa-edit"></i> Editar</button>';
                    htmlTabla = htmlTabla + '<button class="boton" style="background:#dc3545;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="gestorAdmin.eliminarProducto(' + p.id + ')"><i class="fas fa-trash"></i> Eliminar</button>';
                    htmlTabla = htmlTabla + '</td>';
                    htmlTabla = htmlTabla + '</tr>';
                }

                htmlTabla = htmlTabla + '</table>';
                contenedor.innerHTML = htmlTabla;
            });
    },

    activarEdicionProducto: function(id) {
        //Convierte las celdas de la fila en campos editables
        let tdNombre = document.getElementById('item_nombre_' + id);
        let tdDesc = document.getElementById('item_desc_' + id);
        let tdPrecio = document.getElementById('item_precio_' + id);
        if (tdNombre === null || tdDesc === null || tdPrecio === null) return;

        let nombreActual = tdNombre.innerText;
        let descActual = tdDesc.innerText;
        //Limpia el simbolo del euro para quedarse solo con el numero
        let precioActual = tdPrecio.innerText.replace('€', '');

        tdNombre.innerHTML = '<input type="text" id="nuevo_nombre_prod_' + id + '" class="input-form" value="' + nombreActual + '" style="padding:0.3rem;font-size:0.9rem;">';
        tdDesc.innerHTML = '<input type="text" id="nueva_desc_prod_' + id + '" class="input-form" value="' + descActual + '" style="padding:0.3rem;font-size:0.9rem;">';
        tdPrecio.innerHTML = '<input type="number" id="nuevo_precio_prod_' + id + '" class="input-form" value="' + precioActual + '" step="0.01" style="padding:0.3rem;font-size:0.9rem;width:80px;">';

        //Sustituye los botones de accion por guardar y cancelar
        let fila = document.getElementById('registro_producto_' + id);
        if (fila !== null) {
            let celdas = fila.getElementsByTagName('td');
            let ultimaCelda = celdas[celdas.length - 1];
            ultimaCelda.innerHTML = '<button class="boton" style="background:green;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;margin-right:5px;" onclick="gestorAdmin.guardarProducto(' + id + ')"><i class="fas fa-save"></i> Guardar</button>';
            ultimaCelda.innerHTML = ultimaCelda.innerHTML + '<button class="boton" style="background:#6c757d;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="gestorAdmin.cargarProductosAdmin()"><i class="fas fa-times"></i> Cancelar</button>';
        }
    },

    guardarProducto: function(id) {
        //Recoge los valores editados por el admin y los envia al backend
        let inputNombre = document.getElementById('nuevo_nombre_prod_' + id);
        let inputDesc = document.getElementById('nueva_desc_prod_' + id);
        let inputPrecio = document.getElementById('nuevo_precio_prod_' + id);
        if (inputNombre === null || inputDesc === null || inputPrecio === null) return;

        let nuevoNombre = inputNombre.value.trim();
        let nuevaDesc = inputDesc.value.trim();
        let nuevoPrecio = parseFloat(inputPrecio.value);

        //Comprueba que todos los campos tengan contenido valido
        if (nuevoNombre === '' || nuevaDesc === '' || isNaN(nuevoPrecio)) {
            alert('Error: Todos los campos son obligatorios y el precio debe ser un número.');
            return;
        }

        let datosEnvio = { id: id, nombre: nuevoNombre, descripcion: nuevaDesc, precio: nuevoPrecio };

        //Lanza la actualizacion al PHP con metodo PUT
        fetch('api/admin_productos.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnvio)
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                alert('Producto actualizado correctamente.');
                gestorAdmin.cargarProductosAdmin();
            } else {
                alert('Error al actualizar: ' + datos.message);
            }
        });
    },

    eliminarProducto: function(id) {
        //Confirma que el admin quiere borrar el producto antes de eliminarlo
        let confirmado = confirm('¿Está seguro de que desea eliminar este producto? Esta acción no se puede deshacer.');
        if (confirmado === false) return;

        //Contacta el PHP con DELETE enviando el id del producto
        fetch('api/admin_productos.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                alert('Producto eliminado del catálogo.');
                gestorAdmin.cargarProductosAdmin();
            } else {
                alert('Error al eliminar: ' + datos.message);
            }
        });
    },

    // GESTION DE PEDIDOS

    // Solicita el historico de transacciones finalizadas renderizadas de forma unicamente visual.
    cargarPedidos: function() {
        let contenedor = document.getElementById('listadoPedidos');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p>Conectando con la base de datos...</p>';

        fetch('api/admin_pedidos.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                if (datos.success && datos.pedidos.length > 0) {
                    let htmlTabla = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
                    htmlTabla = htmlTabla + '<tr style="border-bottom: 2px solid var(--color-primario);">';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">ID Pedido</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Cliente</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Email</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Dirección</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Pago</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Total</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Fecha</th>';
                    htmlTabla = htmlTabla + '</tr>';

                    //Itera todos los pedidos y los pinta en filas separadas
                    for (let i = 0; i < datos.pedidos.length; i++) {
                        let ped = datos.pedidos[i];
                        let nombreCliente = ped.nombre_cliente || 'Usuario eliminado';
                        let emailCliente = ped.email_cliente || 'N/A';

                        htmlTabla = htmlTabla + '<tr style="border-bottom: 1px solid var(--color-borde);">';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">#' + ped.id + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + nombreCliente + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + emailCliente + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + (ped.direccion || 'Sin dirección') + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + (ped.metodo_pago || 'N/A') + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px; font-weight:bold;">' + ped.total_amount + '€</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">' + (ped.creado_en || 'Sin fecha') + '</td>';
                        htmlTabla = htmlTabla + '</tr>';
                    }

                    htmlTabla = htmlTabla + '</table>';
                    contenedor.innerHTML = htmlTabla;
                } else {
                    contenedor.innerHTML = '<p style="text-align:center; color:#777;">No se encontraron pedidos en el sistema.</p>';
                }
            });
    },

    //GESTION DE CONFIGURACION DEL CREADOR DE TARTAS

    //Pide al servidor la configuracion actual de precios y la muestra en tabla editable
    cargarConfiguracionCreador: function() {
        let contenedor = document.getElementById('listadoConfiguracion');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p>Conectando con la base de datos...</p>';

        fetch('api/admin_configuracion.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                if (datos.success && datos.configuraciones.length > 0) {
                    let htmlTabla = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
                    htmlTabla = htmlTabla + '<tr style="border-bottom: 2px solid var(--color-primario);">';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Parámetro</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Valor Actual</th>';
                    htmlTabla = htmlTabla + '<th style="padding: 10px;">Acciones</th>';
                    htmlTabla = htmlTabla + '</tr>';

                    //Mapa de nombres legibles para las claves de configuracion
                    let nombresLegibles = {
                        'precio_base_tarta': 'Precio Base de la Tarta (€)',
                        'precio_extra_ingrediente': 'Precio por Ingrediente Extra (€)'
                    };

                    //Bucle clasico para pintar cada fila de configuracion
                    for (let i = 0; i < datos.configuraciones.length; i++) {
                        let conf = datos.configuraciones[i];
                        let nombreMostrar = nombresLegibles[conf.clave] || conf.clave;

                        htmlTabla = htmlTabla + '<tr id="linea_ajuste_' + conf.clave + '" style="border-bottom: 1px solid var(--color-borde);">';
                        htmlTabla = htmlTabla + '<td style="padding: 10px; font-weight: bold;">' + nombreMostrar + '</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;" id="valor_ajuste_' + conf.clave + '">' + conf.valor + '€</td>';
                        htmlTabla = htmlTabla + '<td style="padding: 10px;">';
                        htmlTabla = htmlTabla + '<button class="boton" style="background:var(--color-secundario);color:white;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="gestorAdmin.activarEdicionConfig(\'' + conf.clave + '\')"><i class="fas fa-edit"></i> Editar</button>';
                        htmlTabla = htmlTabla + '</td>';
                        htmlTabla = htmlTabla + '</tr>';
                    }

                    htmlTabla = htmlTabla + '</table>';
                    contenedor.innerHTML = htmlTabla;
                } else {
                    contenedor.innerHTML = '<p style="text-align:center; color:#777;">No se encontró configuración en el sistema.</p>';
                }
            });
    },

    activarEdicionConfig: function(clave) {
        //Convierte la celda de valor en un input editable para modificar el precio
        let tdValor = document.getElementById('valor_ajuste_' + clave);
        if (tdValor === null) return;

        //Limpia el simbolo del euro para quedarse solo con el numero
        let valorActual = tdValor.innerText.replace('€', '');

        tdValor.innerHTML = '<input type="number" id="entrada_valor_' + clave + '" class="input-form" value="' + valorActual + '" step="0.01" min="0" style="padding:0.3rem;font-size:0.9rem;width:100px;">';

        //Sustituye el boton de editar por guardar y cancelar
        let fila = document.getElementById('linea_ajuste_' + clave);
        if (fila !== null) {
            let celdas = fila.getElementsByTagName('td');
            let ultimaCelda = celdas[celdas.length - 1];
            ultimaCelda.innerHTML = '<button class="boton" style="background:green;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;margin-right:5px;" onclick="gestorAdmin.guardarConfiguracion(\'' + clave + '\')"><i class="fas fa-save"></i> Guardar</button>';
            ultimaCelda.innerHTML = ultimaCelda.innerHTML + '<button class="boton" style="background:#6c757d;color:white;padding:0.2rem 0.5rem;font-size:0.8rem;" onclick="gestorAdmin.cargarConfiguracionCreador()"><i class="fas fa-times"></i> Cancelar</button>';
        }
    },

    guardarConfiguracion: function(clave) {
        //Recoge el nuevo valor escrito por el admin en el input
        let inputValor = document.getElementById('entrada_valor_' + clave);
        if (inputValor === null) return;

        let nuevoValor = parseFloat(inputValor.value);

        //Comprueba que el valor sea un numero positivo valido
        if (isNaN(nuevoValor) || nuevoValor < 0) {
            alert('Error: El valor debe ser un número positivo.');
            return;
        }

        let datosEnvio = { clave: clave, valor: nuevoValor.toFixed(2) };

        //Lanza la actualizacion al PHP con metodo PUT
        fetch('api/admin_configuracion.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnvio)
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                alert('Configuración actualizada correctamente.');
                gestorAdmin.cargarConfiguracionCreador();
            } else {
                alert('Error al actualizar: ' + datos.message);
            }
        });
    },

    // GESTION DE MENSAJES DE CONTACTO

    // Solicita al servidor todos los mensajes enviados por los clientes a traves del formulario de contacto.
    cargarMensajesContacto: function() {
        let contenedor = document.getElementById('listadoMensajes');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p>Conectando con la base de datos...</p>';

        fetch('api/admin_mensajes.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                if (datos.success && datos.mensajes.length > 0) {
                    let htmlTabla = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
                    htmlTabla += '<tr style="border-bottom: 2px solid var(--color-primario);">';
                    htmlTabla += '<th style="padding: 10px;">ID</th>';
                    htmlTabla += '<th style="padding: 10px;">Nombre</th>';
                    htmlTabla += '<th style="padding: 10px;">Email</th>';
                    htmlTabla += '<th style="padding: 10px;">Asunto</th>';
                    htmlTabla += '<th style="padding: 10px;">Mensaje</th>';
                    htmlTabla += '<th style="padding: 10px;">Fecha</th>';
                    htmlTabla += '</tr>';

                    for (let i = 0; i < datos.mensajes.length; i++) {
                        let m = datos.mensajes[i];
                        htmlTabla += '<tr style="border-bottom: 1px solid var(--color-borde);">';
                        htmlTabla += '<td style="padding: 10px;">' + m.id + '</td>';
                        htmlTabla += '<td style="padding: 10px;">' + m.nombre + '</td>';
                        htmlTabla += '<td style="padding: 10px;">' + m.email + '</td>';
                        htmlTabla += '<td style="padding: 10px;">' + (m.asunto || 'Sin asunto') + '</td>';
                        htmlTabla += '<td style="padding: 10px; max-width: 350px; white-space: pre-wrap; word-break: break-word;">' + m.mensaje + '</td>';
                        htmlTabla += '<td style="padding: 10px; white-space: nowrap;">' + (m.creado_en || 'Sin fecha') + '</td>';
                        htmlTabla += '</tr>';
                    }

                    htmlTabla += '</table>';
                    contenedor.innerHTML = htmlTabla;
                } else {
                    contenedor.innerHTML = '<p style="text-align:center; color:#777;">No hay mensajes de contacto en el sistema.</p>';
                }
            });
    },

    // GESTION DE VALORACIONES

    // Obtiene del servidor todas las valoraciones dejadas por los clientes en los productos.
    // Muestra el nombre del producto, el cliente, la puntuacion en estrellas, el comentario y la fecha.
    cargarValoracionesAdmin: function() {
        let contenedor = document.getElementById('listadoValoraciones');
        if (contenedor === null) return;

        contenedor.innerHTML = '<p>Conectando con la base de datos...</p>';

        fetch('api/admin_valoraciones.php')
            .then(function(respuesta) {
                return respuesta.json();
            })
            .then(function(datos) {
                if (datos.success && datos.valoraciones.length > 0) {
                    let htmlTabla = '<table style="width: 100%; border-collapse: collapse; text-align: left;">';
                    htmlTabla += '<tr style="border-bottom: 2px solid var(--color-primario);">';
                    htmlTabla += '<th style="padding: 10px;">ID</th>';
                    htmlTabla += '<th style="padding: 10px;">Producto</th>';
                    htmlTabla += '<th style="padding: 10px;">Cliente</th>';
                    htmlTabla += '<th style="padding: 10px;">Email</th>';
                    htmlTabla += '<th style="padding: 10px;">Valoración</th>';
                    htmlTabla += '<th style="padding: 10px;">Comentario</th>';
                    htmlTabla += '<th style="padding: 10px;">Fecha</th>';
                    htmlTabla += '</tr>';

                    for (let i = 0; i < datos.valoraciones.length; i++) {
                        let v = datos.valoraciones[i];

                        // Genera las estrellas visualmente usando el numero de estrellas almacenado
                        let estrellas = '';
                        for (let s = 1; s <= 5; s++) {
                            if (s <= v.estrellas) {
                                estrellas += '<i class="fas fa-star" style="color: #f5a623;"></i>';
                            } else {
                                estrellas += '<i class="far fa-star" style="color: #ccc;"></i>';
                            }
                        }

                        htmlTabla += '<tr style="border-bottom: 1px solid var(--color-borde);">';
                        htmlTabla += '<td style="padding: 10px;">' + v.id + '</td>';
                        htmlTabla += '<td style="padding: 10px; font-weight: bold;">' + v.nombre_producto + '</td>';
                        htmlTabla += '<td style="padding: 10px;">' + v.nombre_usuario + '</td>';
                        htmlTabla += '<td style="padding: 10px;">' + v.email_usuario + '</td>';
                        htmlTabla += '<td style="padding: 10px; white-space: nowrap;">' + estrellas + ' (' + v.estrellas + '/5)</td>';
                        htmlTabla += '<td style="padding: 10px; max-width: 300px; white-space: pre-wrap; word-break: break-word;">' + (v.comentario || '<em style="color:#999;">Sin comentario</em>') + '</td>';
                        htmlTabla += '<td style="padding: 10px; white-space: nowrap;">' + (v.creado_en || 'Sin fecha') + '</td>';
                        htmlTabla += '</tr>';
                    }

                    htmlTabla += '</table>';
                    contenedor.innerHTML = htmlTabla;
                } else {
                    contenedor.innerHTML = '<p style="text-align:center; color:#777;">No hay valoraciones registradas en el sistema.</p>';
                }
            });
    }
};





