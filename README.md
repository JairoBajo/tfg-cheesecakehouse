# 🧀 CheeseCakeHouse — Proyecto Intermodular

Aplicación web de una pastelería especializada en tartas de queso (*cheesecakes*). Es una SPA (*Single Page Application*) construida con **HTML5, CSS3 y JavaScript ES6 puro (vanilla)** en el cliente, y una **API REST en PHP + MySQL (PDO)** en el servidor.

El proyecto integra los contenidos de los módulos **DWEC** (Desarrollo Web en Entorno Cliente) y **DIW** (Diseño de Interfaces Web), y este README documenta cómo cada parte del código se corresponde con la teoría de clase.

---

## 1. Características principales

- **Catálogo de tartas** por categorías (clásicas, sin gluten, sin azúcar) cargado por AJAX.
- **Selección de tamaño** (pequeña / mediana / grande) con multiplicador de precio mediante *radio buttons*.
- **Carrito de la compra** con cálculo de totales y contador en la cabecera.
- **Creador de tartas personalizadas** (de 1 a 3 complementos, primero gratis) con precio dinámico.
- **Checkout en 3 pasos** con validación de dirección, código postal, tarjeta, Bizum y PayPal mediante expresiones regulares, IVA reducido para Canarias y sistema de puntos.
- **Autenticación** (registro / login / recuperación de contraseña simulada por SMS) con sesión persistente.
- **Área de perfil** e **historial de pedidos**.
- **Valoraciones y reseñas** con estrellas.
- **Panel de administración** (usuarios, productos, pedidos, valoraciones, mensajes, configuración).
- **Sistema multidioma** (i18n) con más de 200 etiquetas `data-i18n`.
- **Temas**: modo claro/oscuro y modo daltónico (alto contraste), guardados entre sesiones.

---

## 2. Estructura del proyecto

```
ProyectoIntermodular/
├── index.html              # Estructura única de la SPA (todas las "pantallas")
├── css/
│   ├── variables.css       # Custom properties (:root) y temas
│   ├── base.css            # Reset y estilos base
│   ├── cabecera.css        # Cabecera, menú y dropdown de acceso
│   ├── carrusel.css        # Hero / slideshow
│   ├── secciones.css       # Tarjetas, modales, formularios, grid
│   └── footer.css
├── js/
│   ├── idioma.js           # Diccionarios y traducción (i18n)
│   ├── tema.js             # Modo claro/oscuro y daltónico (localStorage)
│   ├── enrutador.js        # Navegación entre pantallas (router)
│   ├── api-productos.js    # Carga del catálogo (fetch) y modal de tallas
│   ├── autenticacion.js    # Login, registro y perfil (fetch + sessionStorage)
│   ├── recuperacion.js     # Recuperación de contraseña
│   ├── carrito.js          # Lógica del carrito
│   ├── extras.js           # Valoraciones, puntos, historial, mapa
│   ├── checkout.js         # Proceso de pago en 3 pasos
│   ├── creador.js          # Creador de tartas personalizadas
│   ├── admin.js            # Panel de administración
│   └── main.js             # Arranque (DOMContentLoaded), slideshow, validaciones
├── api/                    # Endpoints PHP (REST)
├── config/database.php     # Conexión PDO a MySQL
├── data/                   # JSON de respaldo (productos, usuarios)
└── cheesecakehouse (4).sql # Volcado de la base de datos
```

> **Nota sobre la arquitectura JS:** cada fichero define un *objeto literal* que actúa como "gestor" de una responsabilidad (`gestorCarrito`, `gestorCheckout`, `gestorNavegacion`…). Es el patrón de objetos predefinidos/propios visto en clase aplicado a la organización del código.

---

## 3. Correspondencia con la teoría de clase

### UD2 — Sintaxis de JavaScript (ES6)

- **`let` / `const` en lugar de `var`.** Todo el código usa declaración con ámbito de bloque.
- **Comparación estricta `===` / `!==`.** Se evita la coerción implícita de `==`. Donde el tipo del dato podía variar (id que llega como número o como cadena desde PHP, rol `es_admin`), se normaliza con `String()` o `Number()` antes de comparar.
- **Funciones y *arrow functions*** (`.map`, `.filter`, `.forEach`, `.find`, `.reduce`): por ejemplo en `api-productos.js` se separan las categorías con `datosJSON.filter(...)`.
- **Objetos literales y *getters*:** `creador.js` define `get ingredientes()` para devolver la lista traducida bajo demanda.
- **Operador ternario `? :`** y plantillas de texto para construir HTML dinámico.
- **`parseInt` / `parseFloat` / `.toFixed()`** para el tratamiento numérico de precios.

### UD3 — Objetos predefinidos

- **`String`:** `.trim()`, `.replace()`, `.split()`, `.includes()`, `.toLowerCase()` (validaciones de formularios y limpieza de teléfonos en `recuperacion.js`).
- **`Array`:** `.push()`, `.filter()`, `.find()`, `.join()`, `.forEach()`, `.length` (carrito, catálogo, creador).
- **`Math`:** `Math.floor`, `Math.round`, `Math.max`, `Math.random` (cálculo de puntos, descuentos y generación del código SMS).
- **`Date`:** validación de caducidad de la tarjeta en `checkout.js` (`getFullYear`, `getMonth`).
- **`window`:** `setTimeout` y `setInterval` para el *slideshow* del hero y los indicadores de carga; `alert`, `confirm`.

### UD5 — Formularios

- **Evento `onsubmit`** que devuelve `true`/`false` y uso de `evento.preventDefault()` para procesar el envío de forma asíncrona (login, registro, contacto).
- **Acceso a elementos:** `.value` en inputs de texto, `:checked` en *radio buttons* (`name="talla"`, `name="pago"`), *checkboxes* en el creador y `selectedIndex`/opciones en selects.
- **Expresiones regulares con `RegExp`/literal y `.test()`:** correo, código postal de 5 dígitos, tarjeta de 16 dígitos, CVV, MM/AA, móvil español y cuenta PayPal.
- **Deshabilitar el botón** durante el envío para evitar envíos dobles (`boton.disabled = true`).

### UD6 — Almacenamiento

- **`localStorage`** para las preferencias persistentes de tema y modo daltónico (`tema.js`).
- **`sessionStorage`** para la sesión del usuario (`usuarioApp`), que se borra al cerrar la ventana.
- **`JSON.stringify` / `JSON.parse`** para guardar y recuperar el objeto de usuario como cadena de texto, exactamente como indica el tema (el almacenamiento solo guarda *strings*).

### UD7 — JavaScript asíncrono (AJAX)

- **`fetch`** sustituyendo a `XMLHttpRequest` (el propio apunte recomienda esta vía moderna) con métodos **GET** y **POST**.
- **Cabeceras** `Content-Type: application/json` y cuerpo con `JSON.stringify`.
- **Promesas encadenadas** con `.then()` y manejo de errores de red con `.catch()`.
- **Recepción y parseo de JSON** (`response.json()`) y *fallback* a `data/productos.json` si la API no responde.

### DIW — CSS avanzado, display y temas

- **Custom Properties (`:root`)** con `var()` para colores, fuentes y transiciones (`variables.css`).
- **Tematización dinámica** con **selectores de atributo** `[data-theme="dark"]` y `[data-daltonico="true"]` que sobrescriben las variables, alternados desde JS con `setAttribute` sobre `document.documentElement` — el patrón exacto del apunte de *Custom Properties + temas*.
- **`display`:** uso de `flex`, `grid` (con `repeat(auto-fill, minmax(...))`), `inline-block` y `none` para mostrar/ocultar secciones.
- **Transiciones, `transform`, `filter` (`brightness`, `blur`) y `object-fit`** en el hero y las imágenes.
- **Menú desplegable** (`dropdown-acceso`) con alternancia de clase, y **slideshow** automático.
- ***Media queries*** para adaptación responsive.

> **Sobre jQuery (UD Introducción a jQuery):** el proyecto **no** usa jQuery y resuelve manipulación del DOM, eventos, animaciones y AJAX con JavaScript nativo. Esto es coherente con el propio apunte, que señala que jQuery "está quedando en desuso por la irrupción de la programación reactiva".

---

## 4. Instalación y puesta en marcha

Requisitos: **PHP 8.x**, **MySQL/MariaDB** y un servidor web (Apache/Nginx o XAMPP/Laragon).

1. **Copia el proyecto** en la carpeta pública del servidor (p. ej. `htdocs/`).
2. **Crea la base de datos** importando el volcado:
   ```bash
   mysql -u root -p < "cheesecakehouse (4).sql"
   ```
   Crea la BD `cheesecakehouse` con las tablas `usuarios`, `productos`, `pedidos`, `detalles_pedido`, `valoraciones`, `puntos_usuario`, `mensajes_contacto` y `configuracion`.
3. **Ajusta la conexión** en `config/database.php` si tus credenciales no son `root` sin contraseña en `localhost`.
4. **Abre** `http://localhost/ProyectoIntermodular/index.html`.

> Si la API PHP no está disponible, el catálogo se carga automáticamente desde `data/productos.json` gracias al *fallback* del `fetch`, por lo que la interfaz sigue funcionando para demostración del cliente.

### Servicios externos
- **Leaflet** (mapa de localización de la tienda).
- **reCAPTCHA** de Google en el login.

---

## 5. Endpoints de la API (PHP)

Todos devuelven JSON. Los principales:

| Endpoint | Método | Función |
|---|---|---|
| `api/productos.php` | GET | Lista de productos |
| `api/login.php` | POST | Autenticación |
| `api/registro.php` | POST | Alta de usuario |
| `api/pedidos.php` | POST | Crear pedido |
| `api/historial_pedidos.php` | POST | Pedidos del usuario |
| `api/valoraciones.php` | GET/POST | Reseñas |
| `api/puntos.php` | POST | Puntos del usuario |
| `api/contacto.php` | POST | Mensajes de contacto |
| `api/admin_*.php` | GET/POST | Gestión del panel de administración |

---

## 6. Usuarios de la web

Adjuntamos dos usuarios para poder hacer pruebas en la web, uno de ellos con permiso de Administrador:

- admin@cheesecakehouse.com --> admin1234 (usuario con permisos de administrador)
- jairzinho@gmail.com --> 123456789 (usuario normal)

*Proyecto académico. Las pasarelas de pago, el envío de SMS y el correo son simulaciones con fines didácticos.*
