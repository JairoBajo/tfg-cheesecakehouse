// GESTOR DE RECUPERACIÓN DE CONTRASEÑA
// Simulación de flujo real: correo + teléfono → SMS con código → nueva contraseña

let gestorRecuperacion = {
    codigoGenerado: null,
    telefonoValido: null,
    emailVerificado: null,

    // Valida en tiempo real los dos campos del paso 1 (email + teléfono)
    validarPaso1: function() {
        let inputEmail = document.getElementById('recup-email');
        let inputTel = document.getElementById('recup-telefono');
        let telError = document.getElementById('recup-tel-error');
        let btnEnviar = document.getElementById('recup-btn-enviar');

        if (!inputEmail || !inputTel) return;

        let email = inputEmail.value.trim();
        let tel = inputTel.value.replace(/\s/g, '');

        let emailFormatoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        let telOk = /^[679]\d{8}$/.test(tel);

        if (tel.length === 9 && !telOk) {
            if (telError) telError.style.display = 'block';
        } else {
            if (telError) telError.style.display = 'none';
        }

        if (btnEnviar) btnEnviar.disabled = !(emailFormatoOk && telOk);
    },

    // Verifica el email contra la API y, si existe, genera y muestra el código SMS
    enviarCodigo: function() {
        let inputEmail = document.getElementById('recup-email');
        let inputTel = document.getElementById('recup-telefono');
        let emailError = document.getElementById('recup-email-error');
        let btnEnviar = document.getElementById('recup-btn-enviar');

        if (!inputEmail || !inputTel) return;

        let email = inputEmail.value.trim();
        let tel = inputTel.value.replace(/\s/g, '');

        if (btnEnviar) {
            btnEnviar.disabled = true;
            btnEnviar.textContent = '...';
        }
        if (emailError) emailError.style.display = 'none';

        let recup = this;

        fetch('api/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identificador: email, password: '___CHECK_RECUP___' })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) {
            // Si devuelve "contraseña incorrecta" significa que el email existe
            let emailExiste = data.success ||
                (data.message && (
                    data.message.toLowerCase().includes('contraseña') ||
                    data.message.toLowerCase().includes('password') ||
                    data.message.toLowerCase().includes('incorrecta') ||
                    data.message.toLowerCase().includes('incorrect')
                ));

            if (!emailExiste) {
                if (emailError) emailError.style.display = 'block';
                if (btnEnviar) {
                    btnEnviar.disabled = false;
                    let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('recup-btn-enviar') : 'Enviar código SMS';
                    btnEnviar.textContent = t;
                }
                return;
            }

            recup._continuarConCodigo(email, tel);
        })
        .catch(function() {
            // Si la API falla, continuamos igualmente (simulación)
            recup._continuarConCodigo(email, tel);
        });
    },

    _continuarConCodigo: function(email, tel) {
        this.emailVerificado = email;
        this.telefonoValido = tel;
        this.codigoGenerado = String(Math.floor(100000 + Math.random() * 900000));

        let telMostrado = document.getElementById('recup-tel-mostrado');
        if (telMostrado) telMostrado.textContent = tel;

        let codigoVisible = document.getElementById('recup-codigo-visible');
        if (codigoVisible) codigoVisible.textContent = this.codigoGenerado;

        let inputCodigo = document.getElementById('recup-input-codigo');
        if (inputCodigo) inputCodigo.value = '';

        let codError = document.getElementById('recup-cod-error');
        if (codError) codError.style.display = 'none';

        let btnVerificar = document.getElementById('recup-btn-verificar');
        if (btnVerificar) btnVerificar.disabled = true;

        this.mostrarPaso(2);
    },

    validarCodigo: function(input) {
        let val = input.value.trim();
        let btnVerificar = document.getElementById('recup-btn-verificar');
        if (btnVerificar) btnVerificar.disabled = (val.length !== 6);
    },

    verificarCodigo: function() {
        let inputCodigo = document.getElementById('recup-input-codigo');
        if (!inputCodigo) return;

        let introducido = inputCodigo.value.trim();
        let codError = document.getElementById('recup-cod-error');

        if (introducido !== this.codigoGenerado) {
            if (codError) codError.style.display = 'block';
            inputCodigo.style.border = '2px solid red';
            return;
        }

        if (codError) codError.style.display = 'none';
        inputCodigo.style.border = '';

        let nuevaPass = document.getElementById('recup-nueva-pass');
        let confirmarPass = document.getElementById('recup-confirmar-pass');
        if (nuevaPass) nuevaPass.value = '';
        if (confirmarPass) confirmarPass.value = '';

        let btnGuardar = document.getElementById('recup-btn-guardar');
        if (btnGuardar) btnGuardar.disabled = true;

        this.mostrarPaso(3);
    },

    validarNuevaPass: function() {
        let nueva = document.getElementById('recup-nueva-pass');
        let confirmar = document.getElementById('recup-confirmar-pass');
        let passError = document.getElementById('recup-pass-error');
        let btnGuardar = document.getElementById('recup-btn-guardar');

        if (!nueva || !confirmar) return;

        let longOk = nueva.value.length >= 6;
        let coinciden = nueva.value === confirmar.value;
        let confirmarTocado = confirmar.value.length > 0;

        if (confirmarTocado && !coinciden) {
            if (passError) passError.style.display = 'block';
        } else {
            if (passError) passError.style.display = 'none';
        }

        if (btnGuardar) btnGuardar.disabled = !(longOk && coinciden && confirmarTocado);
    },

    guardarNuevaPass: function() {
        let nueva = document.getElementById('recup-nueva-pass');
        if (!nueva || nueva.value.length < 6) return;
        // En un sistema real aquí se llamaría a la API con this.emailVerificado
        this.mostrarPaso(4);
    },

    reiniciar: function() {
        this.codigoGenerado = null;
        this.telefonoValido = null;
        this.emailVerificado = null;

        let inputEmail = document.getElementById('recup-email');
        if (inputEmail) inputEmail.value = '';

        let inputTel = document.getElementById('recup-telefono');
        if (inputTel) inputTel.value = '';

        let btnEnviar = document.getElementById('recup-btn-enviar');
        if (btnEnviar) {
            btnEnviar.disabled = true;
            let t = (typeof gestorIdioma !== 'undefined') ? gestorIdioma.obtenerTexto('recup-btn-enviar') : 'Enviar código SMS';
            btnEnviar.textContent = t;
        }

        ['recup-tel-error', 'recup-email-error'].forEach(function(id) {
            let el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        this.mostrarPaso(1);
    },

    mostrarPaso: function(numero) {
        for (let i = 1; i <= 4; i++) {
            let paso = document.getElementById('recup-paso' + i);
            if (paso) paso.style.display = (i === numero) ? 'block' : 'none';
        }
    },

    iniciar: function() {
        this.codigoGenerado = null;
        this.telefonoValido = null;
        this.emailVerificado = null;
        this.mostrarPaso(1);

        ['recup-email', 'recup-telefono'].forEach(function(id) {
            let el = document.getElementById(id);
            if (el) el.value = '';
        });

        let btnEnviar = document.getElementById('recup-btn-enviar');
        if (btnEnviar) btnEnviar.disabled = true;

        ['recup-tel-error', 'recup-email-error'].forEach(function(id) {
            let el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }
};
