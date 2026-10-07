// SISTEMA DE SEGURIDAD

// Gestiona las solicitudes asincronas al servidor para verificacion de credenciales.
let gestorAutenticacion = {
    mostrarError: function(idElemento, mensaje) {
        // Inyecta dinamicamente notificaciones de error en el bloque de formulario activo.
        let elemento = document.getElementById(idElemento);
        if (elemento !== null) {
            elemento.innerText = mensaje;
            elemento.style.display = "block";
        }
    },

    ocultarError: function(idElemento) {
        // Reinicia la visibilidad de las advertencias previniendo ruido visual innecesario.
        let elemento = document.getElementById(idElemento);
        if (elemento !== null) {
            elemento.style.display = 'none';
        }
    },

    procesarLogin: function(evento) {
        // Intercepta el envio nativo del formulario para procesarlo de forma asincrona.
        evento.preventDefault();
        this.ocultarError('avisoErrorLogin');
        
        let identificador = document.getElementById('login-identificador').value;
        let password = document.getElementById('login-password').value;
        let recaptchaResponse = grecaptcha.getResponse();
        
        // Condiciona la ejecucion a la validacion previa del control de seguridad humano.
        if (recaptchaResponse.length === 0) {
            this.mostrarError('avisoErrorLogin', "Por favor, verifique el reCAPTCHA.");
            return;
        }

        // Muestra el indicador de carga visual mientras se valida la identidad.
        document.getElementById('bloqueFormlogin').style.display = 'none';
        document.getElementById('indicadorCargalogin').style.display = 'block';

        let datosEnvio = {
            identificador: identificador,
            password: password
        };

        // Dispara la peticion POST al servidor PHP para autenticar las credenciales.
        fetch('api/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnvio)
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            document.getElementById('indicadorCargalogin').style.display = 'none';
            document.getElementById('bloqueFormlogin').style.display = 'block';

            if (datos.success) {
                // Almacena el objeto del usuario en la sesion persistente del navegador.
                sessionStorage.setItem('usuarioApp', JSON.stringify(datos.user));
                if (typeof actualizarInterfazUsuario === 'function') {
                    actualizarInterfazUsuario();
                }
                // Cargar puntos del usuario
                if (typeof gestorPuntos !== 'undefined') {
                    gestorPuntos.cargar(datos.user.id);
                }
                gestorNavegacion.irA('inicio');
            } else {
                gestorAutenticacion.mostrarError('avisoErrorLogin', "Error: " + datos.message);
            }
        })
        .catch(function() {
            // Error 1 CORREGIDO: restaurar formulario y avisar al usuario si falla la red.
            document.getElementById('indicadorCargalogin').style.display = 'none';
            document.getElementById('bloqueFormlogin').style.display = 'block';
            gestorAutenticacion.mostrarError('avisoErrorLogin', "Error de conexión. Por favor, inténtalo de nuevo.");
        });
    },

    procesarRegistro: function(evento) {
        // Previene el comportamiento por defecto del formulario y captura sus campos.
        evento.preventDefault();
        this.ocultarError('avisoErrorRegistro');
        
        let nombre = document.getElementById('reg-nombre').value;
        let email = document.getElementById('reg-email').value;
        let p1 = document.getElementById('reg-password').value;

        // Implementa una expresion regular para validar la integridad del correo electronico.
        let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regexCorreo.test(email) === false) {
            this.mostrarError('avisoErrorRegistro', "Formato de correo no válido.");
            return;
        }

        let datosEnvio = {
            nombre: nombre,
            email: email,
            password: p1
        };

        fetch('api/registro.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnvio)
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                // Error 2 CORREGIDO: usar el email como identificador en el auto-login, no el nombre.
                let loginData = {
                    identificador: email,
                    password: p1
                };
                
                fetch('api/login.php', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData) 
                })
                .then(function(res) { return res.json(); })
                .then(function(loginJson) {
                    if (loginJson.success) {
                        sessionStorage.setItem('usuarioApp', JSON.stringify(loginJson.user));
                        if (typeof actualizarInterfazUsuario === 'function') {
                            actualizarInterfazUsuario();
                        }
                        gestorNavegacion.irA('inicio');
                    } else {
                        // Si el auto-login falla, redirigir al login manualmente
                        gestorNavegacion.irA('login');
                    }
                })
                .catch(function() {
                    gestorNavegacion.irA('login');
                });
            } else {
                gestorAutenticacion.mostrarError('avisoErrorRegistro', "Error: " + datos.message);
            }
        })
        .catch(function() {
            // Error 1 CORREGIDO: .catch() en el fetch de registro para errores de red.
            gestorAutenticacion.mostrarError('avisoErrorRegistro', "Error de conexión. Por favor, inténtalo de nuevo.");
        });
    },

    cerrarSesion: function() {
        // Liquida las variables de control local cerrando la instancia del cliente.
        sessionStorage.removeItem('usuarioApp');
        if (typeof actualizarInterfazUsuario === 'function') {
            actualizarInterfazUsuario();
        }
        gestorNavegacion.irA('inicio');
    }
};

// AREA PRIVADA

// Inyecta en el DOM las variables almacenadas localmente y carga parametros asincronos.
// Hook para cargar puntos al abrir el perfil
let _gestorPerfilCargarDatosOrig;
let gestorPerfil = {
    cargarDatos: function() {
        // Recupera el token persistente de inicio de sesion del cliente actual.
        let sesion = sessionStorage.getItem('usuarioApp');
        if (sesion !== null) {
            let usuario = JSON.parse(sesion);
            // Cargar puntos en el perfil
            if (typeof gestorPuntos !== 'undefined') {
                gestorPuntos.cargar(usuario.id);
            }
            // Cargar historial mejorado
            if (typeof gestorHistorialMejorado !== 'undefined') {
                gestorHistorialMejorado.cargar(usuario.id);
            }
            
            let spanNombre = document.getElementById('perfil-nombre');
            let spanCorreo = document.getElementById('perfil-correo');
            if (spanNombre !== null) spanNombre.innerText = usuario.nombre;
            if (spanCorreo !== null) spanCorreo.innerText = usuario.email || "Sin correo asociado";

            let inputNombre = document.getElementById('perfil-edit-nombre');
            let inputEmail = document.getElementById('perfil-edit-email');
            if (inputNombre !== null) inputNombre.value = usuario.nombre;
            if (inputEmail !== null) inputEmail.value = usuario.email || "";

            // Desencadena la peticion asincrona para popular el historial de compras.
            this.cargarHistorial(usuario.id);
        }
    },

    cargarHistorial: function(idUsuario) {
        // Delega en el gestor mejorado de historial
        if (typeof gestorHistorialMejorado !== 'undefined') {
            gestorHistorialMejorado.cargar(idUsuario);
        }
    },

    actualizarDatos: function(evento) {
        // Aplica una modificacion directa en el registro del usuario en la base de datos mediante PHP.
        evento.preventDefault();
        
        let sesion = sessionStorage.getItem('usuarioApp');
        if (sesion === null) return;
        
        let usuario = JSON.parse(sesion);
        let nuevoNombre = document.getElementById('perfil-edit-nombre').value;
        let nuevoEmail = document.getElementById('perfil-edit-email').value;
        let nuevaPassword = document.getElementById('perfil-edit-password').value;
        
        let datosEnvio = {
            id: usuario.id,
            nombre: nuevoNombre,
            email: nuevoEmail,
            password: nuevaPassword
        };

        fetch('api/actualizar_perfil.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosEnvio)
        })
        .then(function(respuesta) {
            return respuesta.json();
        })
        .then(function(datos) {
            if (datos.success) {
                alert("Perfil actualizado correctamente en la base de datos.");
                usuario.nombre = nuevoNombre;
                usuario.email = nuevoEmail;
                sessionStorage.setItem('usuarioApp', JSON.stringify(usuario));
                
                // Invoca metodos sincronos para renderizar los cambios textuales confirmados de inmediato.
                gestorPerfil.cargarDatos(); 
                if (typeof actualizarInterfazUsuario === 'function') {
                    actualizarInterfazUsuario();
                }
            } else {
                alert("Error al actualizar: " + datos.message);
            }
        });
    }
};





