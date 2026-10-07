// CONTROLADOR DE ENTORNO

// Refresca la interfaz de usuario dependiendo del estado de la sesion.
// Modifica la visibilidad de los botones sin recargar la pagina.
function actualizarInterfazUsuario() {
    let sesionActiva = sessionStorage.getItem('usuarioApp');
    let menuAcceso = document.getElementById('menu-acceso');
    let controles = document.getElementById('controles-usuario');
    let btnAdmin = document.getElementById('btn-panel-admin');

    // Verifica si existen datos de un usuario autenticado previamente.
    if (sesionActiva !== null) {
        let usuario = JSON.parse(sesionActiva);
        if (menuAcceso !== null) menuAcceso.style.display = 'none';
        if (controles !== null) controles.style.display = 'flex';
        
        let etiqueta = document.getElementById('etiqueta-estado-usuario');
        if (etiqueta !== null) etiqueta.innerText = "👤 " + usuario.nombre;

        // Desbloquea el boton de administracion exclusivamente para el rol indicado.
        if (btnAdmin !== null) {
            if (usuario.rol === 'Administrador') {
                btnAdmin.style.display = 'inline-block';
                btnAdmin.classList.remove('seccion-oculta');
            } else {
                btnAdmin.style.display = 'none';
            }
        }
    } else {
        // Restablece el menu para visitantes publicos sin privilegios.
        if (menuAcceso !== null) menuAcceso.style.display = 'inline-block';
        if (controles !== null) controles.style.display = 'none';
        if (btnAdmin !== null) btnAdmin.style.display = 'none';
    }
}

// INICIO AUTOMATICO

// Ejecuta las funciones de preparacion tras cargar la estructura HTML completamente.
document.addEventListener('DOMContentLoaded', function() {
    gestorTema.iniciar();
    gestorIdioma.iniciar();
    actualizarInterfazUsuario();
    
    // Muestra una ventana promocional tras un retardo simulado si no hay sesion.
    let sesionActiva = sessionStorage.getItem('usuarioApp');
    if (sesionActiva === null) {
        setTimeout(function() {
            let popup = document.getElementById('popup-promo');
            if (popup !== null) popup.style.display = 'block';
        }, 2500);
    }

    // Desvanece el titulo "Bienvenidos" tras unos segundos de bienvenida.
    let tituloBienvenidos = document.getElementById('hero-bienvenidos');
    if (tituloBienvenidos !== null) {
        setTimeout(function() {
            tituloBienvenidos.classList.add('oculto');
        }, 3500);
    }
});

// FILTRO DE PULSACIONES

// Intercepta los clics fuera de los menus desplegables para cerrarlos.
window.onclick = function(evento) {
    let esBoton = evento.target.matches('.dropdown-acceso .boton');
    let esDentro = evento.target.matches('.dropdown-acceso .boton *');
    if (esBoton === false && esDentro === false) {
        if (typeof gestorNavegacion !== 'undefined') {
            gestorNavegacion.cerrarMenuAcceso();
        }
    }
};

// VALIDADOR PRE-ENVIO DE SERVIDOR

// Confirma que los datos basicos introducidos cumplen el formato antes de mandarlos.
let gestorValidacion = {
    validarContacto: function(evento) {
        evento.preventDefault();
        
        let nombre = document.getElementById('cont-nombre');
        let email = document.getElementById('cont-email');
        let mensaje = document.getElementById('cont-mensaje');
        
        let errNombre = document.getElementById('err-cont-nombre');
        let errEmail = document.getElementById('err-cont-email');
        let errMensaje = document.getElementById('err-cont-mensaje');
        
        let valido = true;
        errNombre.style.display = 'none';
        errEmail.style.display = 'none';
        errMensaje.style.display = 'none';
        
        // Verifica si la cadena de texto esta vacia utilizando el metodo trim.
        if (nombre.value.trim() === '') {
            errNombre.style.display = 'block';
            valido = false;
        }
        
        // Evalua el patron del correo electronico mediante una expresion regular basica.
        let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            errEmail.innerText = gestorIdioma.obtenerTexto('err-obligatorio');
            errEmail.style.display = 'block';
            valido = false;
        } else if (regexCorreo.test(email.value.trim()) === false) {
            errEmail.innerText = gestorIdioma.obtenerTexto('err-email');
            errEmail.style.display = 'block';
            valido = false;
        }
        
        if (mensaje.value.trim() === '') {
            errMensaje.style.display = 'block';
            valido = false;
        }
        
        // Envia los datos a la API si el formulario es valido
        if (valido === true) {
            let boton = document.querySelector('#formulario-contacto button[type="submit"]');
            if (boton) { boton.disabled = true; boton.innerText = 'Enviando...'; }

            fetch('api/contacto.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre:  nombre.value.trim(),
                    email:   email.value.trim(),
                    mensaje: mensaje.value.trim()
                })
            })
            .then(function(r) { return r.json(); })
            .then(function(data) {
                if (boton) { boton.disabled = false; boton.innerText = 'Enviar Mensaje'; }
                if (data.success) {
                    alert("Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.");
                    document.getElementById('formulario-contacto').reset();
                } else {
                    alert("Error al enviar el mensaje: " + (data.message || "Intentalo de nuevo."));
                }
            })
            .catch(function() {
                // Error 4 CORREGIDO: restaurar el botón siempre que haya error de red.
                if (boton) { boton.disabled = false; boton.innerText = gestorIdioma.obtenerTexto('btn-enviar-contacto') || 'Enviar Mensaje'; }
                alert("Error de conexión. Por favor, inténtalo de nuevo.");
            });
        }
    }
};

// CARRUSELES AUTOMATICOS Y MENU DE SOBRE NOSOTROS

// Archivan la informacion de imagenes estaticas para el fondo del inicio.
let heroImagenes = [
    { src: 'img/tarta_clasica.png',            txt: 'tag-clasica' },
    { src: 'img/tarta_pistacho.png',           txt: 'tag-pistacho' },
    { src: 'img/tarta_lotus.png',              txt: 'tag-lotus' },
    { src: 'img/tarta_arandanos.png',          txt: 'tag-arandanos' },
    { src: 'img/tarta_oreo.png',               txt: 'tag-oreo' },
    { src: 'img/clasica_sin_gluten.png',       txt: 'tag-clasica-sg' },
    { src: 'img/frambuesa_sin_gluten.png',     txt: 'tag-frambuesa-sg' },
    { src: 'img/limon_sin_gluten.png',         txt: 'tag-limon-sg' },
    { src: 'img/clasica_sin_azucar.png',       txt: 'tag-clasica-sa' },
    { src: 'img/frutos_rojos_sin_azucar.png',  txt: 'tag-frutos-rojos-sa' },
    { src: 'img/vainilla_sin_azucar.png',       txt: 'tag-vainilla-sa' }
];
let heroIndex = 0;

// Variables globales para la seccion de presentacion del equipo corporativo.
let obradorIndice = 0;
let obradorImagenes = [
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80&w=800'
];

// Temporizador repetitivo que actualiza el fondo ilustrativo cada ciclo temporal.
setInterval(function() {
    let imgFondo = document.getElementById('img-fondo-hero');
    let imgBlur  = document.getElementById('img-fondo-blur');
    let txtFondo = document.getElementById('texto-slideshow');
    if (imgFondo !== null && txtFondo !== null) {
        heroIndex = heroIndex + 1;
        if (heroIndex >= heroImagenes.length) {
            heroIndex = 0; // Reinicia el contador de posicion.
        }
        
        // Aplica una disminucion de opacidad para preparar visualmente el fundido.
        imgFondo.style.opacity = 0;
        txtFondo.style.opacity = 0;
        setTimeout(function() {
            if (imgFondo) imgFondo.src = heroImagenes[heroIndex].src;
            if (imgBlur)  imgBlur.src  = heroImagenes[heroIndex].src;
            if (txtFondo) {
                txtFondo.setAttribute('data-i18n', heroImagenes[heroIndex].txt);
                txtFondo.innerText = gestorIdioma.obtenerTexto(heroImagenes[heroIndex].txt);
            }
            if (imgFondo) imgFondo.style.opacity = 1; 
            if (txtFondo) txtFondo.style.opacity = 1;
        }, 800); 
    }
}, 3500);

// Alterna manualmente la galeria visual del obrador de tartas.
function cambiarFotoObrador(direccion) {
    let imgObrador = document.getElementById('img-obrador');
    if (imgObrador === null) return;
    
    // Suma la direccion elegida (1 o -1) al control de la galeria corporativa.
    obradorIndice = obradorIndice + direccion;
    
    // Reposiciona el indice al inicio o al final manteniendo la circularidad logica.
    if (obradorIndice >= obradorImagenes.length) {
        obradorIndice = 0;
    } else if (obradorIndice < 0) {
        obradorIndice = obradorImagenes.length - 1;
    }
    
    // Suaviza el cambio de fotografia desactivando momentaneamente la transparencia.
    imgObrador.style.opacity = 0;
    setTimeout(function() {
        if (imgObrador) {
            imgObrador.src = obradorImagenes[obradorIndice];
            imgObrador.style.opacity = 1;
        }
    }, 300);
}

// Subdivide las pestañas de contenido textual dentro del area descriptiva del muro corporativo.
function mostrarSubMenuNosotros(seccion) {
    let divEmpresa = document.getElementById('nosotros-empresa');
    let divLegal = document.getElementById('nosotros-legal');
    let botones = document.querySelectorAll('#pantalla_nosotros .boton');
    
    if (divEmpresa === null || divLegal === null) return;

    // Disimula de forma general las divisiones visuales alterando la gama del color CSS inactivo.
    divEmpresa.style.display = 'none';
    divLegal.style.display = 'none';
    
    for (let i = 0; i < botones.length; i++) {
        botones[i].style.backgroundColor = '#6c757d'; 
    }

    // Sobre-escribe dinamicamente los identificadores inactivos encendiendo la caja indicada.
    if (seccion === 'empresa') {
        divEmpresa.style.display = 'block';
        botones[0].style.backgroundColor = 'var(--color-primario)';
    } else if (seccion === 'legal') {
        divLegal.style.display = 'block';
        botones[1].style.backgroundColor = 'var(--color-primario)';
    }
}





