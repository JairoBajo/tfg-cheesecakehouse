// NAVEGADOR DE PANTALLAS

// Gestiona la visualización de las distintas secciones sin recargar la página.
// Utiliza clases CSS para alternar la visibilidad de los contenedores.
let gestorNavegacion = {
    irA: function(nombreVista) {
        // Selecciona todos los contenedores principales dentro de la etiqueta main.
        let vistas = document.querySelectorAll('main > section');
        
        // Oculta todas las secciones aplicando la clase CSS correspondiente.
        for (let i = 0; i < vistas.length; i++) {
            vistas[i].classList.add('seccion-oculta');
        }

        // Verifica si el usuario inició sesión antes de entrar al creador de tartas.
        if (nombreVista === 'creador') {
            let sesionSegura = sessionStorage.getItem('usuarioApp');
            if (sesionSegura === null) {
                // Alerta al usuario y lo redirige a la pantalla de inicio de sesión.
                let mensajeError = gestorIdioma.obtenerTexto('err-sesion-creador');
                alert(mensajeError);
                this.irA('login');
                return;
            }
        }

        // Resetea la pantalla de recuperación al navegar a ella
        if (nombreVista === 'recuperar') {
            let elRecuperar = document.getElementById('pantalla_recuperar');
            if (elRecuperar) elRecuperar.classList.remove('seccion-oculta');
            if (typeof gestorRecuperacion !== 'undefined') {
                gestorRecuperacion.iniciar();
            }
        } else if (nombreVista === 'login' || nombreVista === 'registro') {
            let idPantalla = 'pantalla_' + nombreVista;
            let elPantalla = document.getElementById(idPantalla);
            if (elPantalla) elPantalla.classList.remove('seccion-oculta');
            
            let bloqueForm = document.getElementById('bloqueForm' + nombreVista);
            let indicadorCarga = document.getElementById('indicadorCarga' + nombreVista);
            
            if (bloqueForm) bloqueForm.style.display = 'none';
            if (indicadorCarga) indicadorCarga.style.display = 'block';
            
            // Muestra el formulario tras 1.2 segundos de animación de carga.
            setTimeout(function() {
                if (indicadorCarga) indicadorCarga.style.display = 'none';
                if (bloqueForm) bloqueForm.style.display = 'block';
            }, 1200);
        } else if (nombreVista === 'perfil') {
            // Muestra temporalmente un indicador de carga al entrar al área personal.
            let elPerfil = document.getElementById('pantalla_perfil');
            if (elPerfil) elPerfil.classList.remove('seccion-oculta');
            
            let capaPerfil = document.getElementById('capaPerfil');
            let indicadorCargaPerfil = document.getElementById('indicadorCargaperfil');
            
            if (capaPerfil) capaPerfil.style.display = 'none';
            if (indicadorCargaPerfil) indicadorCargaPerfil.style.display = 'block';
            
            setTimeout(function() {
                // Descarga los datos del perfil actual tras concluir la pausa visual.
                if (indicadorCargaPerfil) indicadorCargaPerfil.style.display = 'none';
                if (capaPerfil) {
                    capaPerfil.style.display = 'grid';
                    if (typeof gestorPerfil !== 'undefined') {
                        gestorPerfil.cargarDatos();
                    }
                }
            }, 1500);
        } else {
            // Procesa el cambio de estado visual para el resto de vistas genéricas.
            let vistaDestino = document.getElementById('pantalla_' + nombreVista);
            if (vistaDestino !== null) {
                vistaDestino.classList.remove('seccion-oculta');
            }
        }

        // Solicita el inventario a la base de datos al visitar la carta de productos.
        if (nombreVista === 'carta') {
            if (typeof gestorProductos !== 'undefined') {
                gestorProductos.cargarCatalogo();
            }
        }
        
        // Retrasa brevemente la carga del creador para asegurar que el DOM esté listo.
        if (nombreVista === 'creador') {
            setTimeout(function() {
                if (typeof gestorCreador !== 'undefined') {
                    gestorCreador.iniciar();
                }
            }, 100);
        }
        
        // Restablece la posición de la barra de desplazamiento a la parte superior.
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0; 
    },

    alternarMenuAcceso: function(evento) {
        // Bloquea la propagación del clic para evitar que interfiera con otros elementos.
        if (evento) evento.stopPropagation(); 
        let menu = document.getElementById('dropdown-acceso-contenido');
        if (menu !== null) {
            menu.classList.toggle('mostrar-dropdown');
        }
    },

    cerrarMenuAcceso: function() {
        // Oculta el menú desplegable de usuario si se encuentra actualmente visible.
        let menu = document.getElementById('dropdown-acceso-contenido');
        if (menu !== null && menu.classList.contains('mostrar-dropdown')) {
            menu.classList.remove('mostrar-dropdown');
        }
    }
};






