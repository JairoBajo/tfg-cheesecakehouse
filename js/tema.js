// SELECTOR VISUAL

// Administra los estilos de colores de la pagina web.
// Permite guardar las preferencias elegibles del usuario en todo momento.
let gestorTema = {
    iniciar: function() {
        // Enlaza las variables del programa con los botones de la interfaz HTML.
        let btnTema = document.getElementById('btn-tema');
        let btnDaltonico = document.getElementById('btn-daltonico');
        
        // Verifica en el almacenamiento local si existe un tema previo elegido.
        let temaGuardado = localStorage.getItem('temaWeb');
        if (temaGuardado === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (btnTema !== null) {
                btnTema.innerHTML = '<i class="fas fa-sun" id="icono-tema"></i>';
            }
        }
        
        // Comprueba si el modo de alto contraste fue activado anteriormente.
        let daltonicoGuardado = localStorage.getItem('modoDaltonico');
        if (daltonicoGuardado === 'true') {
            document.documentElement.setAttribute('data-daltonico', 'true');
        }

        // Asigna la funcion de alternar tema al hacer click en el boton correspondiente.
        if (btnTema !== null) {
            btnTema.onclick = function() {
                gestorTema.alternarTema(btnTema);
            };
        }
        
        // Protege la ejecucion asegurando que el boton exista antes del click.
        if (btnDaltonico !== null) {
            btnDaltonico.onclick = function() {
                gestorTema.alternarDaltonico();
            };
        }
    },

    alternarTema: function(boton) {
        // Consulta el atributo del tema actual para decidir el cambio.
        let raiz = document.documentElement;
        let temaActual = raiz.getAttribute('data-theme');
        
        // Aplica el modo claro si estaba en oscuro, actualizando el icono.
        if (temaActual === 'dark') {
            raiz.setAttribute('data-theme', 'light');
            boton.innerHTML = '<i class="fas fa-moon" id="icono-tema"></i>';
            localStorage.setItem('temaWeb', 'light');
        } else {
            // Activa el modo oscuro y guarda la preferencia localmente.
            raiz.setAttribute('data-theme', 'dark');
            boton.innerHTML = '<i class="fas fa-sun" id="icono-tema"></i>';
            localStorage.setItem('temaWeb', 'dark');
        }
    },

    alternarDaltonico: function() {
        // Lee el estado actual del modo para personas con daltonismo.
        let raiz = document.documentElement;
        let estado = raiz.getAttribute('data-daltonico');
        
        // Intercambia el estado entre activado y desactivado.
        if (estado === 'true') {
            raiz.setAttribute('data-daltonico', 'false');
            localStorage.setItem('modoDaltonico', 'false');
        } else {
            // Guarda el ajuste activado en memoria cache.
            raiz.setAttribute('data-daltonico', 'true');
            localStorage.setItem('modoDaltonico', 'true');
        }
    }
};





