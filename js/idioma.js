// DICCIONARIO GLOBAL

// Contiene la enumeracion sistematica del vocabulario para extraccion en tiempo de ejecucion.
let gestorIdioma = {
    idiomaActual: 'es',
    textos: {
        es: {
            "nav-inicio": "Inicio",
            "nav-carta": "Carta",
            "nav-creador": "Crear Tarta",
            "nav-nosotros": "Sobre Nosotros",
            "nav-contacto": "Contacto",
            "nav-cuenta": "Mi Cuenta",
            "nav-iniciar": "Iniciar Sesión",
            "nav-registro": "Registrarse",
            "hero-titulo": "Bienvenidos a CheeseCakeHouse",
            "tag-clasica": "Receta Tradicional",
            "tag-pistacho": "Pistacho Ibérico",
            "tag-lotus": "Dulce de Lotus",
            "tag-arandanos": "Arándanos Naturales",
            "tag-oreo": "Tarta de Oreo",
            "tag-clasica-sg": "Sin Gluten · Receta Clásica",
            "tag-frambuesa-sg": "Sin Gluten · Frambuesa",
            "tag-limon-sg": "Sin Gluten · Limón",
            "tag-clasica-sa": "Sin Azúcar · Receta Clásica",
            "tag-frutos-rojos-sa": "Sin Azúcar · Frutos Rojos",
            "tag-vainilla-sa": "Sin Azúcar · Vainilla",
            "contacto-horario": "Horario: L-V 9:00–20:00, Sá 10:00–14:00",
            "envios-canarias-titulo": "Envíos a Canarias:",
            "envios-canarias-texto": "Realizamos envíos a todo el territorio nacional, incluidas las Islas Canarias. No obstante, al tratarse de un territorio extracomunitario a efectos del IVA, <strong>los pedidos con destino a Canarias no incluyen IVA peninsular</strong>. Una vez que el paquete llegue a las islas, puede estar sujeto a <strong>gastos de aduana y al pago del IGIC (Impuesto General Indirecto Canario)</strong> local, según la normativa vigente. Queremos informarle de ello con antelación para evitar cualquier sorpresa en el momento de la entrega.",
            "chk-solo-espana": "<strong>Solo realizamos envíos dentro de España.</strong> El IVA ya está incluido en todos los precios mostrados.",
            "chk-aviso-canarias": "<strong>Envío a Canarias:</strong> Al ser territorio extracomunitario, el pedido <strong>no lleva IVA peninsular</strong>. Sin embargo, puede estar sujeto a <strong>gastos de aduana y al pago del IGIC local</strong> en destino. Le informamos para evitar sorpresas en la entrega.",
            "chk-tus-puntos": "Tus Puntos:",
            "pago-tarjeta": "Tarjeta",
            "chk-iva-canarias": "0.00€ (Canarias: sin IVA peninsular)",
            "hero-tagline": "Las mejores tartas a domicilio a un clic en CheeseCake House",
            "contacto-ubicacion": "Nuestra ubicación",
            "lbl-piso": "Piso / Planta:",
            "lbl-puerta": "Puerta:",
            "lbl-tipo-inmueble": "Tipo de inmueble:",
            "placeholder-piso": "Ej: 3, Bajo, Ático...",
            "placeholder-puerta": "Ej: A, B, Izq., Dcha.",
            "opt-piso": "Piso",
            "opt-apartamento": "Apartamento",
            "opt-casa": "Casa / Chalet",
            "opt-empresa": "Empresa / Local comercial",
            "opt-otro": "Otro",
            "chk-puntos-gratis-desc": "Tienes <strong><span id=\"chk-puntos-compra-gratis\">0</span> puntos</strong> acumulados. Puedes canjear <strong>200 puntos</strong> para que este pedido sea completamente gratis.",
            "chk-canjear-label": "Canjear puntos (10 pts = 1€, máximo",
            "carta-titulo": "Nuestra Carta Artesanal",
            "nosotros-titulo": "Nuestra Historia",
            "texto-nosotros-1": "En CheeseCakeHouse nos dedicamos a crear las mejores tartas artesanales desde 2020. Buscamos el equilibrio perfecto entre texturas y sabores.",
            "texto-nosotros-2": "Seleccionamos rigurosamente cada ingrediente. Nuestro compromiso es ofrecer una experiencia culinaria inolvidable, fusionando repostería clásica y de vanguardia.",
            "contacto-titulo": "Contacto",
            "lbl-nombre": "Nombre y Apellidos:",
            "lbl-email": "Correo Electrónico:",
            "lbl-mensaje": "Mensaje:",
            "btn-enviar": "Enviar Mensaje",
            "titulo-resenas": "Reseñas Destacadas",
            "resena-1": "\"Las mejores tartas de Cantabria sin duda. La de pistacho es una obra de arte.\"",
            "resena-2": "\"El pedido llegó a la hora exacta y el empaquetado era perfecto. Repetiré seguro.\"",
            "resena-3": "\"Textura increíble. Se nota que utilizan ingredientes naturales y de primera calidad.\"",
            "err-obligatorio": "⚠️ Este campo es obligatorio.",
            "err-email": "⚠️ Por favor, introduzca un correo válido.",
            "login-titulo": "Iniciar Sesión",
            "registro-titulo": "Crear Cuenta",
            "lbl-pass": "Contraseña:",
            "lbl-pass-reg": "Contraseña (Mínimo 6 caracteres):",
            "lbl-usuario": "Nombre de Usuario:",
            "btn-login": "Entrar",
            "btn-registro": "Registrarse",
            "txt-no-cuenta": "¿No tienes cuenta? Regístrate aquí",
            "txt-si-cuenta": "¿Ya tienes cuenta? Inicia sesión aquí",
            "carrito-titulo": "Tu Carrito de la Compra",
            "carrito-subtotal": "Subtotal:",
            "btn-finalizar": "Finalizar Compra",
            "chk-titulo": "Finalizar Pedido",
            "chk-paso1": "Paso 1: Dirección de Envío",
            "lbl-pais": "País (Para cálculo de IVA):",
            "lbl-dir": "Dirección completa:",
            "lbl-ciudad": "Ciudad:",
            "lbl-cp": "Código Postal (5 dígitos):",
            "btn-sig-pago": "Siguiente: Método de Pago",
            "chk-paso2": "Paso 2: Método de Pago",
            "lbl-tarjeta": "Número de Tarjeta (16 dígitos):",
            "btn-atras": "Atrás",
            "btn-sig-conf": "Siguiente: Confirmación",
            "chk-paso3": "Paso 3: Resumen de su Pedido",
            "res-desc": "Descuento Promocional (10%):",
            "res-iva": "IVA Calculado:",
            "res-total": "TOTAL A PAGAR:",
            "btn-confirmar": "Confirmar Compra Segura",
            "perfil-titulo": "Mi Perfil Operativo",
            "perfil-editar": "Editar Información Personal",
            "lbl-dir-prin": "Dirección de Envío Principal:",
            "lbl-pass-nueva": "Nueva Contraseña (Opcional):",
            "btn-guardar": "Guardar Cambios en la Matriz",
            "perfil-pedidos": "Mis Pedidos Recientes",
            "perfil-no-pedidos": "El sistema de telemetría no detecta transacciones finalizadas recientes en este momento.",
            "admin-titulo": "Panel de Administración",
            "admin-prod": "Gestión de Productos",
            "admin-prod-desc": "Consola para visualizar y editar catálogo en tiempo real.",
            "btn-conectar": "Conectar con Base de Datos",
            "admin-cuentas": "Gestión de Cuentas",
            "admin-cuentas-desc": "Métricas de usuarios y niveles de privilegio en el sistema.",
            "footer-desc": "Artesanía en cada porción. Seleccionamos nuestros ingredientes con un estándar de calidad insuperable desde 2020.",
            "footer-enlaces": "Accesos Rápidos",
            "footer-legal": "Legal y Soporte",
            "footer-ayuda": "Centro de Ayuda",
            "footer-privacidad": "Política de Privacidad",
            "footer-terminos": "Términos del Servicio",
            "footer-contacto": "Contacto",
            "footer-copy": "© 2026 CheeseCakeHouse. Sistema operado bajo protocolos seguros.",
            "prod-titulo": "Nuestras Tartas", "prod-subtitulo": "Selección artesanal", 
            "nombreTarta1": "Tarta Clásica",
            "descripcionTarta1": "Base de galleta y queso crema puro.",
            "nombreTarta2": "Tarta de Pistacho",
            "descripcionTarta2": "Crema de pistacho artesanal y trozos tostados.",
            "nombreTarta3": "Tarta Lotus",
            "descripcionTarta3": "Sabor intenso a galleta caramelizada Lotus.",
            "nombreTarta4": "Tarta de Oreo",
            "descripcionTarta4": "Base de chocolate con crema de galleta Oreo.",
            "nombreTarta5": "Tarta de Fresa",
            "descripcionTarta5": "Con mermelada natural de fresas silvestres.",
            "nombreTarta6": "Tarta de Caramelo",
            "descripcionTarta6": "Toffee casero con un toque de sal marina.",
            "promo-titulo": "¡Oferta de Bienvenida!",
            "promo-desc": "Regístrate ahora y obtén un <strong>10% de descuento</strong> automático en tu primera tarta.",
            "creador-titulo": "Personaliza tu Tarta",
            "creador-desc": "Base de galleta y crema de queso incluida. Selecciona entre 2 y 4 complementos extra. ¡Los dos primeros son gratuitos! Los siguientes sumarán 0.50€ cada uno.",
            "creador-total": "Total a pagar:",
            "btn-añadir-carrito": "Añadir al Carrito",
            "btn-ver-carta": "Ver Carta",
            "err-sesion-creador": "Acceso denegado: Necesita iniciar sesión para crear tartas.",
            "tab-empresa": "La Empresa",
            "tab-legal": "Información Legal",
            "historia-titulo": "Nuestra Historia",
            "historia-texto": "Fundada en <strong>2020</strong>, CheeseCakeHouse nació de una pasión inquebrantable por la repostería artesanal. Lo que comenzó como un pequeño obrador familiar en Torrelavega se ha convertido en un referente de calidad y sabor. Nuestro objetivo siempre ha sido encontrar el equilibrio perfecto entre las <span style='font-style: italic;'>recetas tradicionales</span> y las texturas más innovadoras.",
            "obrador-titulo": "Producción y Obrador",
            "obrador-texto": "Cada una de nuestras tartas se elabora <strong>a mano</strong>, diariamente, en nuestro obrador central. No utilizamos procesos industriales ni conservantes artificiales. Seleccionamos rigurosamente cada ingrediente: desde el queso crema de granjas locales hasta los pistachos ibéricos más selectos y las mermeladas ecológicas.",
            "envios-titulo": "Gestión de Envíos y Empaquetado",
            "envios-texto": "Entendemos que una tarta es a menudo el centro de una celebración. Por ello, hemos diseñado un sistema de empaquetado <strong>isotérmico</strong> que mantiene la cadena de frío y protege la estructura del postre durante el transporte. Trabajamos con empresas logísticas especializadas, garantizando entregas en <span style='text-decoration: underline;'>menos de 24 horas</span>.",
            "legal-titulo": "Aviso Legal y Condiciones Generales",
            "legal-1": "<strong>1. Datos Identificativos:</strong> En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), a continuación se reflejan los siguientes datos: la empresa titular de dominio web es CheeseCakeHouse S.L., con domicilio a estos efectos en Pza. Baldomero Iglesias, Torrelavega, número de C.I.F.: B-12345678.",
            "legal-2": "<strong>2. Usuarios:</strong> El acceso y/o uso de este portal de CheeseCakeHouse S.L. atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.",
            "legal-3": "<strong>3. Uso del portal:</strong> cheesecakehouse.com proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, \"los contenidos\") en Internet pertenecientes a CheeseCakeHouse S.L. o a sus licenciantes a los que el USUARIO pueda tener acceso. El USUARIO asume la responsabilidad del uso del portal.",
            "privacidad-titulo": "Política de Privacidad (RGPD)",
            "privacidad-0": "De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo aplicable a partir del 25 de mayo de 2018 (RGPD), y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales...",
            "privacidad-1": "<strong>1. Finalidad del tratamiento:</strong> Sus datos serán utilizados para gestionar su registro como usuario, procesar sus pedidos de tartas, enviar notificaciones sobre el estado de sus envíos, y, si lo ha consentido, remitirle comunicaciones comerciales.",
            "privacidad-2": "<strong>2. Derechos del interesado:</strong> Los clientes tienen derecho a acceder, rectificar y suprimir sus datos, así como otros derechos reconocidos en la normativa vigente, dirigiéndose por escrito a admin@cheesecakehouse.com adjuntando copia de un documento identificativo.",
            "normativa-titulo": "Normativa de Consumo y Devoluciones",
            "normativa-0": "En base a la Ley General para la Defensa de los Consumidores y Usuarios, dado que los productos comercializados en esta web son alimentos perecederos (artículo 103 excepciones al derecho de desistimiento), <strong>no aplica el derecho de devolución o desistimiento</strong> una vez que el pedido ha entrado en fase de preparación.",
            "normativa-1": "<strong>Garantía de Calidad:</strong> Únicamente se aceptarán devoluciones si el producto entregado presenta defectos de calidad evidentes o daños severos durante el transporte. El cliente deberá notificarlo en un plazo máximo de 24 horas adjuntando fotografías para gestionar su reemplazo o reembolso.",
            "normativa-2": "<strong>Hoja de Reclamaciones:</strong> Existen hojas de reclamaciones a disposición del consumidor en nuestro establecimiento físico.",
            "admin-panel-titulo": "Panel de Administración",
            "admin-btn-usuarios": "Usuarios",
            "admin-btn-productos": "Productos",
            "admin-btn-pedidos": "Pedidos",
            "admin-btn-creador": "Crear Tarta",
            "admin-btn-mensajes": "Mensajes",
            "admin-btn-valoraciones": "Valoraciones",
            "admin-usuarios-h3": "Gestión de Usuarios Registrados",
            "admin-usuarios-desc": "Listado completo de cuentas del sistema. Puede editar o eliminar cualquier usuario.",
            "admin-usuarios-placeholder": "Pulse el botón \"Usuarios\" para cargar los datos.",
            "admin-productos-h3": "Gestión de Productos del Catálogo",
            "admin-productos-desc": "Consola para visualizar, editar y eliminar productos en tiempo real.",
            "admin-productos-placeholder": "Pulse el botón \"Productos\" para cargar los datos.",
            "admin-pedidos-h3": "Historial de Pedidos del Sistema",
            "admin-pedidos-desc": "Registro de todas las transacciones realizadas por los clientes.",
            "admin-pedidos-placeholder": "Pulse el botón \"Pedidos\" para cargar los datos.",
            "admin-creador-h3": "Configuración de Precios del Creador de Tartas",
            "admin-creador-desc": "Modifique el precio base y el coste por ingrediente extra de la sección \"Crear tu Tarta\".",
            "admin-creador-placeholder": "Pulse el botón \"Crear Tarta\" para cargar los datos.",
            "admin-mensajes-h3": "Mensajes de Contacto de Clientes",
            "admin-mensajes-desc": "Listado de todos los mensajes enviados por los clientes a través del formulario de contacto.",
            "admin-mensajes-placeholder": "Pulse el botón \"Mensajes\" para cargar los datos.",
            "admin-valoraciones-h3": "Valoraciones de Productos",
            "admin-valoraciones-desc": "Registro de todas las valoraciones y comentarios dejados por los clientes en los productos.",
            "admin-valoraciones-placeholder": "Pulse el botón \"Valoraciones\" para cargar los datos.",
            "modal-val-puntuacion": "Tu puntuación:",
            "modal-val-comentario-lbl": "Comentario (opcional):",
            "modal-val-placeholder": "Cuéntanos tu experiencia...",
            "modal-val-btn": "Enviar valoración",
            "modal-calc-titulo": "🍰 Calculadora de Porciones",
            "modal-calc-desc": "Dinos cuántas personas sois y te recomendamos el tamaño ideal.",
            "modal-calc-lbl": "Número de personas:",
            "modal-calc-btn": "Entendido",
            "modal-talla-titulo": "Elige el tamaño",
            "modal-talla-pequena": "🍰 Pequeña (70% del precio)",
            "modal-talla-mediana": "🎂 Mediana (100% del precio)",
            "modal-talla-grande": "🍰 Grande (140% del precio)",
            "modal-talla-btn": "Añadir al carrito",
            "chk-tarjeta-titulo": "💳 Datos de la Tarjeta",
            "lbl-tarjeta-num": "Número de Tarjeta (16 dígitos):",
            "lbl-caducidad": "Fecha de Caducidad:",
            "lbl-cvv": "CVV / CVC:",
            "chk-ssl": "🔒 Tus datos están protegidos con cifrado SSL de 256 bits.",
            "chk-bizum-titulo": "📱 Pago con Bizum",
            "lbl-telefono-bizum": "Número de Teléfono Móvil:",
            "chk-bizum-info": "📲 Recibirás una solicitud de pago en la app de tu banco. Acéptala para confirmar el pedido.",
            "chk-paypal-titulo": "🅿️ Pago con PayPal",
            "lbl-paypal-email": "Email de tu cuenta PayPal:",
            "chk-paypal-info": "🔗 Serás redirigido a PayPal para autorizar el pago de forma segura.",
            "chk-compra-gratis-titulo": "🎁 ¡Tienes una Compra Gratis disponible!",
            "chk-compra-gratis-btn": "Usar compra gratis (−200 puntos)",
            "chk-descuento-bienvenida": "🎉 Descuento Bienvenida (10%):",
            "chk-descuento-puntos": "💎 Descuento por Puntos:",
            "chk-compra-gratis-fila": "🎁 Compra Gratis (200 pts):"
        ,
            "btn-sorpresa": "🎲 ¡Sorpréndeme!",
            "btn-calculadora": "🍰 Calculadora de porciones",
            "cat-clasicas-titulo": "Tartas Artesanales",
            "cat-clasicas-desc": "Nuestras recetas originales elaboradas con los mejores ingredientes.",
            "cat-singluten-titulo": "Sin Gluten 🌾✗",
            "cat-singluten-badge": "Especial Celíacos",
            "cat-singluten-desc": "Elaboradas en obrador separado, con ingredientes certificados sin gluten. Aptas para celíacos.",
            "cat-sinazucar-titulo": "Sin Azúcar 🍬✗",
            "cat-sinazucar-badge": "Aptas para Diabéticos",
            "cat-sinazucar-desc": "Endulzadas con eritritol o stevia. Sin azúcares añadidos. Índice glucémico bajo.",
            "btn-comprar": "Comprar",
            "btn-valorar": "⭐ Valorar",
            "badge-singluten": "🌾 Sin Gluten",
            "badge-sinazucar": "🍬 Sin Azúcar",
            "talla-pequena": "Pequeña",
            "talla-mediana": "Mediana",
            "talla-grande": "Grande",
            "nombreTarta1": "Tarta Cl\u00e1sica",
            "descripcionTarta1": "Base de galleta y queso crema puro.",
            "nombreTarta2": "Tarta de Pistacho",
            "descripcionTarta2": "Crema artesanal de pistacho 100%.",
            "nombreTarta3": "Tarta Dulce de Loto",
            "descripcionTarta3": "Con crema y galletas de loto belga.",
            "nombreTarta4": "Tarta de Ar\u00e1ndanos",
            "descripcionTarta4": "Cobertura de mermelada natural de ar\u00e1ndanos.",
            "nombreTarta5": "Tarta de Oreo",
            "descripcionTarta5": "Base y trozos de galleta Oreo.",
            "nombreTarta6": "Tarta Cl\u00e1sica Sin Gluten",
            "descripcionTarta6": "Nuestra receta tradicional adaptada con base de almendra molida. 100% libre de gluten certificado.",
            "nombreTarta7": "Tarta de Frambuesa Sin Gluten",
            "descripcionTarta7": "Cremosa con cobertura de frambuesa natural. Base de avena certificada sin gluten.",
            "nombreTarta8": "Tarta de Lim\u00f3n Sin Gluten",
            "descripcionTarta8": "Refrescante crema de lim\u00f3n sobre base de coco rallado y d\u00e1tiles. Sin trigo ni derivados.",
            "nombreTarta9": "Tarta Cl\u00e1sica Sin Az\u00facar",
            "descripcionTarta9": "Elaborada con eritritol natural. Mismo sabor cremoso, sin az\u00facares a\u00f1adidos. Apta para diab\u00e9ticos.",
            "nombreTarta10": "Tarta de Frutos Rojos Sin Az\u00facar",
            "descripcionTarta10": "Mezcla de fresas, ar\u00e1ndanos y frambuesas frescas. Endulzada con stevia. Sin az\u00facar a\u00f1adido.",
            "nombreTarta11": "Tarta de Vainilla Sin Az\u00facar",
            "descripcionTarta11": "Vainilla de Madagascar con base de nuez. Endulzada con eritritol. \u00cdndice gluc\u00e9mico muy bajo.",
            "calc-individual": "Tarta Individual (400g)",
            "calc-individual-det": "Perfecta para una ocasi\u00f3n \u00edntima.",
            "calc-pequena": "Tarta Peque\u00f1a (600g)",
            "calc-pequena-det": "Ideal para una reuni\u00f3n de amigos.",
            "calc-mediana": "Tarta Mediana (1kg)",
            "calc-mediana-det": "La opci\u00f3n m\u00e1s popular para celebraciones.",
            "calc-grande": "Tarta Grande (1,5kg)",
            "calc-grande-det": "Para eventos y fiestas especiales.",
            "calc-multiples": " Tartas Grandes (1,5kg c/u)",
            "calc-multiples-det": "Para grupos grandes recomendamos varios pedidos.",
            "calc-aprox": "Aproximadamente ",
            "calc-aprox-2": "g de tarta en total.",
            "sin-resenas": "(sin rese\u00f1as)",
            "resenas": "rese\u00f1as",
            "creador-texto": "Crea tu propia tarta personalizada desde cero. La base incluye galleta y crema de queso fresco. Selecciona entre 1 y 3 complementos extra para darle tu toque especial. El primer complemento es totalmente gratuito. Cada complemento adicional sumar\u00e1 {precio}\u20ac al precio base de la tarta.",
            "ing-sirope-fresa": "Sirope de Fresa",
            "ing-sirope-choco": "Sirope de Chocolate",
            "ing-caramelo": "Caramelo Fundido",
            "ing-nuez": "Nuez Picada",
            "ing-almendra": "Almendra Tostada",
            "ing-coco": "Virutas de Coco",
            "ing-oreo": "Trozos de Oreo",
            "ing-arandanos": "Mermelada de Ar\u00e1ndanos",
            "ing-mango": "Trozos de Mango",
            "ing-cacahuete": "Crocanti de Cacahuete",
            "perfil-datos-cuenta": "Datos de la Cuenta",
            "perfil-mis-puntos": "Mis Puntos",
            "perfil-puntos-acum": "puntos acumulados",
            "perfil-nivel": "Nivel",
            "perfil-proximo-nivel": "Próximo nivel en",
            "perfil-proximo-nivel-2": "puntos",
            "perfil-sin-pedidos": "Aún no tienes pedidos realizados.",
            "perfil-pedido-num": "Pedido #",
            "perfil-total": "Total:",
            "perfil-repetir": "Repetir pedido",
            "estado-Pendiente": "Pendiente",
            "estado-En preparación": "En preparación",
            "estado-Enviado": "Enviado",
            "estado-Entregado": "Entregado",
            "nivel-Novato": "Novato",
            "nivel-Aficionado": "Aficionado",
            "nivel-Experto": "Experto",
            "nivel-Maestro Cheesecake": "Maestro Cheesecake",
            "txt-olvidado": "¿Olvidaste tu contraseña?",
            "recup-titulo": "Recuperar Contraseña",
            "recup-desc": "Introduce el correo electrónico de tu cuenta y tu número de teléfono. Te enviaremos un código de verificación por SMS.",
            "recup-lbl-email": "Correo electrónico de la cuenta:",
            "recup-email-error": "No existe ninguna cuenta con ese correo electrónico.",
            "recup-lbl-tel": "Número de teléfono (España):",
            "recup-tel-error": "Introduce un número español válido (9 dígitos, empieza por 6, 7 o 9).",
            "recup-btn-enviar": "Enviar código SMS",
            "recup-volver": "Volver al inicio de sesión",
            "recup-titulo-sms": "Código de Verificación",
            "recup-sms-enviado": "SMS enviado al número:",
            "recup-sms-nota": "Esto es una simulación. En un sistema real recibirías el SMS en tu móvil.",
            "recup-sms-simulado-label": "SMS simulado:",
            "recup-sms-caduca": "El código caduca en 5 minutos.",
            "recup-lbl-codigo": "Introduce el código de 6 dígitos:",
            "recup-cod-error": "Código incorrecto. Comprueba el SMS simulado.",
            "recup-btn-verificar": "Verificar código",
            "recup-reenviar": "Reenviar código o cambiar número",
            "recup-titulo-nueva": "Nueva Contraseña",
            "recup-nueva-desc": "¡Verificación completada! Introduce tu nueva contraseña.",
            "recup-lbl-nueva": "Nueva contraseña (mínimo 6 caracteres):",
            "recup-lbl-confirmar": "Confirmar nueva contraseña:",
            "recup-pass-error": "Las contraseñas no coinciden.",
            "recup-btn-guardar": "Guardar nueva contraseña",
            "recup-titulo-ok": "¡Contraseña actualizada!",
            "recup-ok-desc": "Tu contraseña ha sido cambiada correctamente. Ya puedes iniciar sesión con tu nueva contraseña.",
            "recup-btn-login": "Ir al inicio de sesión"
        },
        en: {
            "nav-inicio": "Home",
            "nav-carta": "Menu",
            "nav-creador": "Create Cake",
            "nav-nosotros": "About Us",
            "nav-contacto": "Contact",
            "nav-cuenta": "My Account",
            "nav-iniciar": "Log In",
            "nav-registro": "Register",
            "hero-titulo": "Welcome to CheeseCakeHouse",
            "tag-clasica": "Traditional Recipe",
            "tag-pistacho": "Iberian Pistachio",
            "tag-lotus": "Lotus Sweetness",
            "tag-arandanos": "Natural Blueberries",
            "tag-oreo": "Oreo Cheesecake",
            "tag-clasica-sg": "Gluten Free · Classic",
            "tag-frambuesa-sg": "Gluten Free · Raspberry",
            "tag-limon-sg": "Gluten Free · Lemon",
            "tag-clasica-sa": "Sugar Free · Classic",
            "tag-frutos-rojos-sa": "Sugar Free · Mixed Berries",
            "tag-vainilla-sa": "Sugar Free · Vanilla",
            "contacto-horario": "Hours: Mon–Fri 9:00–20:00, Sat 10:00–14:00",
            "envios-canarias-titulo": "Shipping to Canary Islands:",
            "envios-canarias-texto": "We ship throughout the national territory, including the Canary Islands. However, as it is an extra-community territory for VAT purposes, <strong>orders to the Canary Islands do not include mainland VAT</strong>. Once the package arrives on the islands, it may be subject to <strong>customs charges and payment of IGIC (General Indirect Canary Tax)</strong>, according to current regulations. We want to inform you in advance to avoid any surprises at delivery.",
            "chk-solo-espana": "<strong>We only ship within Spain.</strong> VAT is already included in all displayed prices.",
            "chk-aviso-canarias": "<strong>Shipping to Canary Islands:</strong> As an extra-community territory, the order <strong>does not include mainland VAT</strong>. However, it may be subject to <strong>customs charges and local IGIC</strong> at destination. We inform you to avoid surprises at delivery.",
            "chk-tus-puntos": "Your Points:",
            "pago-tarjeta": "Card",
            "chk-iva-canarias": "0.00€ (Canary Islands: no mainland VAT)",
            "hero-tagline": "The best cheesecakes delivered to your door at CheeseCake House",
            "contacto-ubicacion": "Our location",
            "lbl-piso": "Floor:",
            "lbl-puerta": "Door:",
            "lbl-tipo-inmueble": "Property type:",
            "placeholder-piso": "E.g: 3rd, Ground, Attic...",
            "placeholder-puerta": "E.g: A, B, Left, Right",
            "opt-piso": "Flat",
            "opt-apartamento": "Apartment",
            "opt-casa": "House / Chalet",
            "opt-empresa": "Business / Commercial",
            "opt-otro": "Other",
            "chk-puntos-gratis-desc": "You have <strong><span id=\"chk-puntos-compra-gratis\">0</span> points</strong> accumulated. You can redeem <strong>200 points</strong> to get this order completely free.",
            "chk-canjear-label": "Redeem points (10 pts = 1€, maximum",
            "carta-titulo": "Our Artisanal Menu",
            "nosotros-titulo": "Our History",
            "texto-nosotros-1": "At CheeseCakeHouse, we have been dedicated to creating the best artisanal cakes since 2020. We seek the perfect balance between textures and flavors.",
            "texto-nosotros-2": "We rigorously select each ingredient. Our commitment is to offer an unforgettable culinary experience, blending classic and avant-garde baking.",
            "contacto-titulo": "Contact Us",
            "lbl-nombre": "Full Name:",
            "lbl-email": "Email Address:",
            "lbl-mensaje": "Message:",
            "btn-enviar": "Send Message",
            "titulo-resenas": "Featured Reviews",
            "resena-1": "\"The best cakes in Cantabria without a doubt. The pistachio one is a work of art.\"",
            "resena-2": "\"The order arrived exactly on time and the packaging was perfect. I will definitely repeat.\"",
            "resena-3": "\"Incredible texture. You can tell they use natural, top-quality ingredients.\"",
            "err-obligatorio": "⚠️ This field is required.",
            "err-email": "⚠️ Please enter a valid email address.",
            "login-titulo": "Log In",
            "registro-titulo": "Create Account",
            "lbl-pass": "Password:",
            "lbl-pass-reg": "Password (Minimum 6 characters):",
            "lbl-usuario": "Username:",
            "btn-login": "Enter",
            "btn-registro": "Sign Up",
            "txt-no-cuenta": "Don't have an account? Register here",
            "txt-si-cuenta": "Already have an account? Log in here",
            "carrito-titulo": "Your Shopping Cart",
            "carrito-subtotal": "Subtotal:",
            "btn-finalizar": "Proceed to Checkout",
            "chk-titulo": "Finalize Order",
            "chk-paso1": "Step 1: Shipping Address",
            "lbl-pais": "Country (For VAT calculation):",
            "lbl-dir": "Full Address:",
            "lbl-ciudad": "City:",
            "lbl-cp": "Zip Code (5 digits):",
            "btn-sig-pago": "Next: Payment Method",
            "chk-paso2": "Step 2: Payment Method",
            "lbl-tarjeta": "Card Number (16 digits):",
            "btn-atras": "Back",
            "btn-sig-conf": "Next: Confirmation",
            "chk-paso3": "Step 3: Order Summary",
            "res-desc": "Promotional Discount (10%):",
            "res-iva": "Calculated VAT:",
            "res-total": "TOTAL TO PAY:",
            "btn-confirmar": "Confirm Secure Purchase",
            "perfil-titulo": "My Operative Profile",
            "perfil-editar": "Edit Personal Information",
            "lbl-dir-prin": "Main Shipping Address:",
            "lbl-pass-nueva": "New Password (Optional):",
            "btn-guardar": "Save Changes to Matrix",
            "perfil-pedidos": "My Recent Orders",
            "perfil-no-pedidos": "Telemetry system detects no recent completed transactions at this time.",
            "admin-titulo": "Administration Panel",
            "admin-prod": "Product Management",
            "admin-prod-desc": "Console to view and edit catalog in real time.",
            "btn-conectar": "Connect to Database",
            "admin-cuentas": "Account Management",
            "admin-cuentas-desc": "User metrics and privilege levels in the system.",
            "footer-desc": "Craftsmanship in every slice. We rigorously select our ingredients with an unsurpassed quality standard since 2020.",
            "footer-enlaces": "Quick Links",
            "footer-legal": "Legal & Support",
            "footer-ayuda": "Help Center",
            "footer-privacidad": "Privacy Policy",
            "footer-terminos": "Terms of Service",
            "footer-contacto": "Contact",
            "footer-copy": "© 2026 CheeseCakeHouse. System operated under secure protocols.",
            "prod-titulo": "Our Cheesecakes", "prod-subtitulo": "Artisanal selection",
            "nombreTarta1": "Classic Cake",
            "descripcionTarta1": "Cookie base and pure cream cheese.",
            "nombreTarta2": "Pistachio Cake",
            "descripcionTarta2": "Handcrafted pistachio cream and toasted bits.",
            "nombreTarta3": "Lotus Cake",
            "descripcionTarta3": "Intense Lotus caramelized cookie flavor.",
            "nombreTarta4": "Oreo Cake",
            "descripcionTarta4": "Chocolate base with Oreo cookie cream.",
            "nombreTarta5": "Strawberry Cake",
            "descripcionTarta5": "With natural wild strawberry jam.",
            "nombreTarta6": "Caramel Cake",
            "descripcionTarta6": "Homemade toffee with a hint of sea salt.",
            "promo-titulo": "Welcome Offer!",
            "promo-desc": "Register now and get an automatic <strong>10% discount</strong> on your first cake.",
            "creador-titulo": "Customize Your Cake",
            "creador-desc": "Biscuit base and cream cheese included. Select between 2 and 4 extra toppings. The first two are free! The next ones will add 0.50€ each.",
            "creador-total": "Total to pay:",
            "btn-añadir-carrito": "Add to Cart",
            "btn-ver-carta": "View Menu",
            "err-sesion-creador": "Access denied: You need to log in to create cakes.",
            "tab-empresa": "The Company",
            "tab-legal": "Legal Information",
            "historia-titulo": "Our History",
            "historia-texto": "Founded in <strong>2020</strong>, CheeseCakeHouse was born from an unwavering passion for artisanal baking. What started as a small family bakery in Torrelavega has become a benchmark for quality and flavor. Our goal has always been to find the perfect balance between <span style='font-style: italic;'>traditional recipes</span> and the most innovative textures.",
            "obrador-titulo": "Production and Bakery",
            "obrador-texto": "Each of our cakes is made <strong>by hand</strong>, daily, in our central bakery. We do not use industrial processes or artificial preservatives. We rigorously select each ingredient: from cream cheese from local farms to the most select Iberian pistachios and organic jams.",
            "envios-titulo": "Shipping and Packaging Management",
            "envios-texto": "We understand that a cake is often the center of a celebration. Therefore, we have designed an <strong>isothermal</strong> packaging system that maintains the cold chain and protects the structure of the dessert during transport. We work with specialized logistics companies, guaranteeing deliveries in <span style='text-decoration: underline;'>less than 24 hours</span>.",
            "legal-titulo": "Legal Notice and General Conditions",
            "legal-1": "<strong>1. Identifying Data:</strong> In compliance with the reporting duty contained in article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce (LSSICE), the following data are reflected below: the company owning the web domain is CheeseCakeHouse S.L., with address for these purposes at Pza. Baldomero Iglesias, Torrelavega, C.I.F. number: B-12345678.",
            "legal-2": "<strong>2. Users:</strong> Access and/or use of this CheeseCakeHouse S.L. portal attributes the condition of USER, who accepts, from said access and/or use, the General Conditions of Use reflected here. The aforementioned Conditions will apply regardless of the General Contracting Conditions which, in their case, are mandatory.",
            "legal-3": "<strong>3. Use of the portal:</strong> cheesecakehouse.com provides access to a multitude of information, services, programs or data (hereinafter, \"the contents\") on the Internet belonging to CheeseCakeHouse S.L. or its licensors to which the USER may have access. The USER assumes responsibility for the use of the portal.",
            "privacidad-titulo": "Privacy Policy (GDPR)",
            "privacidad-0": "In accordance with the provisions of Regulation (EU) 2016/679 of the European Parliament and of the Council applicable from May 25, 2018 (GDPR), and Organic Law 3/2018, of December 5, on Protection of Personal Data and guarantee of digital rights...",
            "privacidad-1": "<strong>1. Purpose of treatment:</strong> Your data will be used to manage your registration as a user, process your cake orders, send notifications about the status of your shipments, and, if you have consented, send you commercial communications.",
            "privacidad-2": "<strong>2. Rights of the interested party:</strong> Customers have the right to access, rectify and delete their data, as well as other rights recognized in current regulations, by writing to admin@cheesecakehouse.com attaching a copy of an identifying document.",
            "normativa-titulo": "Consumer and Return Regulations",
            "normativa-0": "Based on the General Law for the Defense of Consumers and Users, given that the products sold on this website are perishable foods (article 103 exceptions to the right of withdrawal), <strong>the right of return or withdrawal does not apply</strong> once the order has entered the preparation phase.",
            "normativa-1": "<strong>Quality Guarantee:</strong> Returns will only be accepted if the delivered product presents obvious quality defects or severe damage during transport. The customer must notify it within a maximum period of 24 hours attaching photographs to manage replacing it or a refund.",
            "normativa-2": "<strong>Complaint Form:</strong> There are complaint forms available to the consumer in our physical establishment.",
            "admin-panel-titulo": "Administration Panel",
            "admin-btn-usuarios": "Users",
            "admin-btn-productos": "Products",
            "admin-btn-pedidos": "Orders",
            "admin-btn-creador": "Create Cake",
            "admin-btn-mensajes": "Messages",
            "admin-btn-valoraciones": "Reviews",
            "admin-usuarios-h3": "Registered Users Management",
            "admin-usuarios-desc": "Full list of system accounts. You can edit or delete any user.",
            "admin-usuarios-placeholder": "Click the \"Users\" button to load data.",
            "admin-productos-h3": "Product Catalog Management",
            "admin-productos-desc": "Console to view, edit and delete products in real time.",
            "admin-productos-placeholder": "Click the \"Products\" button to load data.",
            "admin-pedidos-h3": "Order History",
            "admin-pedidos-desc": "Record of all transactions made by customers.",
            "admin-pedidos-placeholder": "Click the \"Orders\" button to load data.",
            "admin-creador-h3": "Cake Creator Price Configuration",
            "admin-creador-desc": "Modify the base price and cost per extra ingredient in the \"Create Your Cake\" section.",
            "admin-creador-placeholder": "Click the \"Create Cake\" button to load data.",
            "admin-mensajes-h3": "Customer Contact Messages",
            "admin-mensajes-desc": "List of all messages sent by customers through the contact form.",
            "admin-mensajes-placeholder": "Click the \"Messages\" button to load data.",
            "admin-valoraciones-h3": "Product Reviews",
            "admin-valoraciones-desc": "Record of all ratings and comments left by customers on products.",
            "admin-valoraciones-placeholder": "Click the \"Reviews\" button to load data.",
            "modal-val-puntuacion": "Your rating:",
            "modal-val-comentario-lbl": "Comment (optional):",
            "modal-val-placeholder": "Tell us about your experience...",
            "modal-val-btn": "Submit review",
            "modal-calc-titulo": "🍰 Portion Calculator",
            "modal-calc-desc": "Tell us how many people you are and we will recommend the ideal size.",
            "modal-calc-lbl": "Number of people:",
            "modal-calc-btn": "Got it",
            "modal-talla-titulo": "Choose the size",
            "modal-talla-pequena": "🍰 Small (70% of price)",
            "modal-talla-mediana": "🎂 Medium (100% of price)",
            "modal-talla-grande": "🍰 Large (140% of price)",
            "modal-talla-btn": "Add to cart",
            "chk-tarjeta-titulo": "💳 Card Details",
            "lbl-tarjeta-num": "Card Number (16 digits):",
            "lbl-caducidad": "Expiry Date:",
            "lbl-cvv": "CVV / CVC:",
            "chk-ssl": "🔒 Your data is protected with 256-bit SSL encryption.",
            "chk-bizum-titulo": "📱 Pay with Bizum",
            "lbl-telefono-bizum": "Mobile Phone Number:",
            "chk-bizum-info": "📲 You will receive a payment request in your bank app. Accept it to confirm the order.",
            "chk-paypal-titulo": "🅿️ Pay with PayPal",
            "lbl-paypal-email": "Your PayPal account email:",
            "chk-paypal-info": "🔗 You will be redirected to PayPal to securely authorise the payment.",
            "chk-compra-gratis-titulo": "🎁 You have a Free Purchase available!",
            "chk-compra-gratis-btn": "Use free purchase (−200 points)",
            "chk-descuento-bienvenida": "🎉 Welcome Discount (10%):",
            "chk-descuento-puntos": "💎 Points Discount:",
            "chk-compra-gratis-fila": "🎁 Free Purchase (200 pts):"
        ,
            "btn-sorpresa": "🎲 Surprise me!",
            "btn-calculadora": "🍰 Portion calculator",
            "cat-clasicas-titulo": "Artisanal Cheesecakes",
            "cat-clasicas-desc": "Our original recipes made with the finest ingredients.",
            "cat-singluten-titulo": "Gluten-Free 🌾✗",
            "cat-singluten-badge": "Coeliac-Friendly",
            "cat-singluten-desc": "Made in a separate bakery with certified gluten-free ingredients. Suitable for coeliacs.",
            "cat-sinazucar-titulo": "Sugar-Free 🍬✗",
            "cat-sinazucar-badge": "Diabetic-Friendly",
            "cat-sinazucar-desc": "Sweetened with erythritol or stevia. No added sugars. Low glycaemic index.",
            "btn-comprar": "Buy",
            "btn-valorar": "⭐ Review",
            "badge-singluten": "🌾 Gluten-Free",
            "badge-sinazucar": "🍬 Sugar-Free",
            "talla-pequena": "Small",
            "talla-mediana": "Medium",
            "talla-grande": "Large",
            "nombreTarta1": "Classic Cheesecake",
            "descripcionTarta1": "Biscuit base and pure cream cheese.",
            "nombreTarta2": "Pistachio Cheesecake",
            "descripcionTarta2": "100% artisanal pistachio cream.",
            "nombreTarta3": "Lotus Cheesecake",
            "descripcionTarta3": "With Belgian Lotus cream and biscuits.",
            "nombreTarta4": "Blueberry Cheesecake",
            "descripcionTarta4": "Topped with natural blueberry jam.",
            "nombreTarta5": "Oreo Cheesecake",
            "descripcionTarta5": "Oreo biscuit base with chunks.",
            "nombreTarta6": "Classic Gluten-Free Cheesecake",
            "descripcionTarta6": "Our traditional recipe adapted with an almond flour base. 100% certified gluten-free.",
            "nombreTarta7": "Raspberry Gluten-Free Cheesecake",
            "descripcionTarta7": "Creamy with natural raspberry topping. Certified gluten-free oat base.",
            "nombreTarta8": "Lemon Gluten-Free Cheesecake",
            "descripcionTarta8": "Refreshing lemon cream on a coconut and date base. Wheat-free.",
            "nombreTarta9": "Classic Sugar-Free Cheesecake",
            "descripcionTarta9": "Made with natural erythritol. Same creamy flavour, no added sugars. Suitable for diabetics.",
            "nombreTarta10": "Red Berry Sugar-Free Cheesecake",
            "descripcionTarta10": "A mix of fresh strawberries, blueberries and raspberries. Sweetened with stevia. No added sugar.",
            "nombreTarta11": "Vanilla Sugar-Free Cheesecake",
            "descripcionTarta11": "Madagascar vanilla with walnut base. Sweetened with erythritol. Very low glycaemic index.",
            "calc-individual": "Individual Cake (400g)",
            "calc-individual-det": "Perfect for an intimate occasion.",
            "calc-pequena": "Small Cake (600g)",
            "calc-pequena-det": "Ideal for a get-together with friends.",
            "calc-mediana": "Medium Cake (1kg)",
            "calc-mediana-det": "The most popular option for celebrations.",
            "calc-grande": "Large Cake (1.5kg)",
            "calc-grande-det": "For events and special parties.",
            "calc-multiples": " Large Cakes (1.5kg each)",
            "calc-multiples-det": "For large groups we recommend multiple orders.",
            "calc-aprox": "Approximately ",
            "calc-aprox-2": "g of cake in total.",
            "sin-resenas": "(no reviews)",
            "resenas": "reviews",
            "creador-texto": "Create your own personalised cake from scratch. The base includes biscuit and fresh cream cheese. Select between 1 and 3 extra toppings to give it your special touch. The first topping is completely free. Each additional topping will add {precio}\u20ac to the base price of the cake.",
            "ing-sirope-fresa": "Strawberry Syrup",
            "ing-sirope-choco": "Chocolate Syrup",
            "ing-caramelo": "Melted Caramel",
            "ing-nuez": "Chopped Walnuts",
            "ing-almendra": "Toasted Almonds",
            "ing-coco": "Coconut Flakes",
            "ing-oreo": "Oreo Chunks",
            "ing-arandanos": "Blueberry Jam",
            "ing-mango": "Mango Chunks",
            "ing-cacahuete": "Peanut Brittle",
            "perfil-datos-cuenta": "Account Details",
            "perfil-mis-puntos": "My Points",
            "perfil-puntos-acum": "accumulated points",
            "perfil-nivel": "Level",
            "perfil-proximo-nivel": "Next level in",
            "perfil-proximo-nivel-2": "points",
            "perfil-sin-pedidos": "You have no orders yet.",
            "perfil-pedido-num": "Order #",
            "perfil-total": "Total:",
            "perfil-repetir": "Repeat order",
            "estado-Pendiente": "Pending",
            "estado-En preparación": "In preparation",
            "estado-Enviado": "Shipped",
            "estado-Entregado": "Delivered",
            "nivel-Novato": "Novice",
            "nivel-Aficionado": "Amateur",
            "nivel-Experto": "Expert",
            "nivel-Maestro Cheesecake": "Cheesecake Master",
            "txt-olvidado": "Forgot your password?",
            "recup-titulo": "Password Recovery",
            "recup-desc": "Enter the email address of your account and your phone number. We will send you a verification code by SMS.",
            "recup-lbl-email": "Account email address:",
            "recup-email-error": "No account found with that email address.",
            "recup-lbl-tel": "Phone number (Spain):",
            "recup-tel-error": "Enter a valid Spanish number (9 digits, starting with 6, 7 or 9).",
            "recup-btn-enviar": "Send SMS code",
            "recup-volver": "Back to login",
            "recup-titulo-sms": "Verification Code",
            "recup-sms-enviado": "SMS sent to number:",
            "recup-sms-nota": "This is a simulation. In a real system you would receive the SMS on your phone.",
            "recup-sms-simulado-label": "Simulated SMS:",
            "recup-sms-caduca": "The code expires in 5 minutes.",
            "recup-lbl-codigo": "Enter the 6-digit code:",
            "recup-cod-error": "Incorrect code. Check the simulated SMS.",
            "recup-btn-verificar": "Verify code",
            "recup-reenviar": "Resend code or change number",
            "recup-titulo-nueva": "New Password",
            "recup-nueva-desc": "Verification complete! Enter your new password.",
            "recup-lbl-nueva": "New password (minimum 6 characters):",
            "recup-lbl-confirmar": "Confirm new password:",
            "recup-pass-error": "Passwords do not match.",
            "recup-btn-guardar": "Save new password",
            "recup-titulo-ok": "Password updated!",
            "recup-ok-desc": "Your password has been changed successfully. You can now log in with your new password.",
            "recup-btn-login": "Go to login"
        }
    },

    iniciar: function() {
        // MEMORIA DE NAVEGADOR
        // Lee el almacenamiento local para recuperar persitentemente el ultimo idioma seleccionado.
        let btnIdioma = document.getElementById('btn-idioma');
        let idiomaGuardado = localStorage.getItem('idiomaWeb');
        
        if (idiomaGuardado !== null) {
            this.idiomaActual = idiomaGuardado;
        }

        this.aplicarTraducciones();
        this.actualizarBoton();

        // DETECCION DE CLIC
        // Enlaza un manejador de eventos al boton superior para alternar diccionarios.
        if (btnIdioma !== null) {
            let self = this;
            btnIdioma.onclick = function() {
                if (self.idiomaActual === 'es') {
                    self.idiomaActual = 'en';
                } else {
                    self.idiomaActual = 'es';
                }
                localStorage.setItem('idiomaWeb', self.idiomaActual);
                self.aplicarTraducciones();
                self.actualizarBoton();
                // Re-renderiza el catalogo si ya estaba cargado, para traducir nombres y botones
                if (typeof gestorProductos !== 'undefined' && gestorProductos.cargados) {
                    gestorProductos.cargados = false;
                    gestorProductos.cargarCatalogo();
                }
                // Re-renderiza los ingredientes del creador si ya estaba cargado
                if (typeof gestorCreador !== 'undefined') {
                    let contenedorCreador = document.getElementById('opcionesExtras');
                    if (contenedorCreador && contenedorCreador.innerHTML.trim() !== '') {
                        gestorCreador.iniciar();
                    }
                }
                // Re-renderiza los puntos y pedidos del perfil si ya estaban cargados
                if (typeof gestorPuntos !== 'undefined' && document.getElementById('perfil-puntos-valor')) {
                    gestorPuntos.actualizarUI();
                }
                if (typeof gestorHistorialMejorado !== 'undefined') {
                    let listaPedidos = document.getElementById('listaPedidosPerfil');
                    if (listaPedidos && listaPedidos.querySelector('[onclick]')) {
                        let sesion = sessionStorage.getItem('usuarioApp');
                        if (sesion) {
                            try {
                                let usuario = JSON.parse(sesion);
                                gestorHistorialMejorado.cargar(usuario.id);
                            } catch(e) {}
                        }
                    }
                }
            };
        }
    },

    aplicarTraducciones: function() {
        // BUSQUEDA DE ETIQUETAS
        // Identifica iterativamente todos los nodos HTML provistos de un atributo de traduccion.
        let elementos = document.querySelectorAll('[data-i18n]');
        let diccionario = this.textos[this.idiomaActual];
        
        if (!diccionario) return;

        // INYECCION DE TEXTO
        // Aplica modificacion interna directa permitiendo elementos anidados como negritas.
        for (let i = 0; i < elementos.length; i++) {
            let el = elementos[i];
            let clave = el.getAttribute('data-i18n');
            if (diccionario[clave] !== undefined) {
                let texto = diccionario[clave];
                // Si la clave es creador-texto, sustituye {precio} con el precio real del gestor.
                if (clave === 'creador-texto') {
                    let precioExtra = (typeof gestorCreador !== 'undefined') ? gestorCreador.precioExtra.toFixed(2) : '0.50';
                    texto = texto.replace('{precio}', precioExtra);
                }
                el.innerHTML = texto;
            }
        }

        // TRADUCCION DE PLACEHOLDERS
        // Traduce los atributos placeholder de inputs y textareas marcados con data-i18n-placeholder.
        let elemPlaceholder = document.querySelectorAll('[data-i18n-placeholder]');
        for (let i = 0; i < elemPlaceholder.length; i++) {
            let el = elemPlaceholder[i];
            let clave = el.getAttribute('data-i18n-placeholder');
            if (diccionario[clave] !== undefined) {
                el.placeholder = diccionario[clave];
            }
        }

        // TRADUCCION DE OPTIONS EN SELECT
        let elemOptions = document.querySelectorAll('[data-i18n-option]');
        for (let i = 0; i < elemOptions.length; i++) {
            let el = elemOptions[i];
            let clave = el.getAttribute('data-i18n-option');
            if (diccionario[clave] !== undefined) {
                el.textContent = diccionario[clave];
            }
        }

        // TRADUCCION DEL PARRAFO DE PUNTOS GRATIS (mantiene el span dinamico)
        let elemPuntos = document.querySelectorAll('[data-i18n-puntos]');
        for (let i = 0; i < elemPuntos.length; i++) {
            let el = elemPuntos[i];
            let clave = el.getAttribute('data-i18n-puntos');
            if (diccionario[clave] !== undefined) {
                let spanVal = el.querySelector('#chk-puntos-compra-gratis');
                let valorActual = spanVal ? spanVal.innerText : '0';
                el.innerHTML = diccionario[clave];
                let spanNuevo = el.querySelector('#chk-puntos-compra-gratis');
                if (spanNuevo) spanNuevo.innerText = valorActual;
            }
        }
    },

    actualizarBoton: function() {
        // CAMBIO DE BANDERA
        // Intercambia el identificador visual de la insignia segun el idioma activo.
        let iconoBandera = document.getElementById('icono-bandera');
        if (iconoBandera !== null) {
            if (this.idiomaActual === 'es') {
                iconoBandera.src = "https://flagcdn.com/w40/us.png";
            } else {
                iconoBandera.src = "https://flagcdn.com/w40/es.png";
            }
        }
    },

    obtenerTexto: function(clave) {
        // EXTRACCION INDIVIDUAL
        // Retorna un segmento de cadena especifico para inyecciones en alertas de sistema.
        if (this.textos[this.idiomaActual] !== undefined && this.textos[this.idiomaActual][clave] !== undefined) {
            return this.textos[this.idiomaActual][clave];
        }
        return clave;
    }
};





