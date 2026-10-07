-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 16-04-2026 a las 08:26:02
-- Versión del servidor: 9.1.0
-- Versión de PHP: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cheesecakehouse`
--

CREATE DATABASE IF NOT EXISTS `cheesecakehouse` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `cheesecakehouse`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
CREATE TABLE IF NOT EXISTS `configuracion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clave` varchar(100) NOT NULL,
  `valor` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clave` (`clave`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`id`, `clave`, `valor`) VALUES
(1, 'precio_base_tarta', '20.00'),
(2, 'precio_extra_ingrediente', '5.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedido`
--

DROP TABLE IF EXISTS `detalles_pedido`;
CREATE TABLE IF NOT EXISTS `detalles_pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pedido_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`id`, `pedido_id`, `producto_id`, `cantidad`, `precio_unitario`) VALUES
(3, 3, 1, 1, 22.50),
(4, 3, 2, 1, 26.00),
(5, 3, 3, 1, 24.50),
(6, 4, 1, 1, 30.00),
(7, 5, 1, 1, 22.50),
(8, 5, 2, 1, 26.00),
(9, 5, 3, 1, 24.50),
(10, 5, 1, 1, 30.00),
(35, 10, 1, 1, 22.50),
(36, 10, 2, 1, 26.00),
(37, 11, 1, 1, 30.00),
(44, 13, 1, 1, 22.50),
(45, 13, 2, 1, 26.00),
(46, 13, 3, 1, 24.50),
(47, 13, 4, 1, 23.00),
(48, 14, 1, 1, 22.50),
(49, 14, 2, 1, 26.00),
(50, 14, 3, 1, 24.50),
(51, 14, 4, 1, 23.00),
(52, 14, 5, 1, 25.00),
(53, 15, 1, 1, 22.50),
(54, 15, 4, 1, 23.00),
(55, 15, 2, 1, 26.00),
(56, 15, 5, 1, 25.00),
(57, 15, 3, 1, 24.50),
(58, 15, 1, 1, 30.00),
(59, 16, 4, 1, 23.00),
(60, 16, 1, 1, 22.50),
(61, 17, 1, 1, 22.50),
(62, 17, 3, 1, 24.50),
(63, 18, 1, 1, 22.50),
(93, 32, 1, 1, 22.50),
(94, 32, 2, 1, 26.00),
(95, 32, 3, 1, 24.50),
(96, 32, 4, 1, 23.00),
(97, 32, 5, 1, 25.00),
(98, 33, 4, 1, 23.00),
(99, 34, 1, 1, 22.50),
(100, 34, 6, 1, 25.50),
(101, 34, 7, 1, 27.00),
(102, 34, 9, 1, 26.00),
(103, 35, 1, 1, 22.50),
(104, 35, 6, 1, 25.50),
(105, 35, 7, 1, 27.00),
(106, 35, 9, 1, 26.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes_contacto`
--

DROP TABLE IF EXISTS `mensajes_contacto`;
CREATE TABLE IF NOT EXISTS `mensajes_contacto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `asunto` varchar(200) NOT NULL,
  `mensaje` text NOT NULL,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mensajes_contacto`
--

INSERT INTO `mensajes_contacto` (`id`, `nombre`, `email`, `asunto`, `mensaje`, `creado_en`) VALUES
(1, 'Manolo Lama', 'manulama@gmail.com', 'Mensaje desde el formulario de contacto', 'La mejor tienda de tartas de queso que he visto en mi vida, simplemente TOP', '2026-04-15 08:16:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
CREATE TABLE IF NOT EXISTS `pedidos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `metodo_pago` varchar(50) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` varchar(50) DEFAULT 'Pendiente',
  `direccion_envio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `user_id`, `direccion`, `metodo_pago`, `total_amount`, `creado_en`, `estado`, `direccion_envio`) VALUES
(3, 1, 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))', 'Paypal', 72.27, '2026-04-10 10:58:26', 'Pendiente', 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))'),
(4, 1, 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 29.70, '2026-04-10 11:12:07', 'Pendiente', 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))'),
(5, 1, 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))', 'Bizum', 101.97, '2026-04-10 11:17:55', 'Pendiente', 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))'),
(10, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 48.02, '2026-04-10 11:30:14', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(11, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 29.70, '2026-04-10 11:30:48', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(13, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 146.52, '2026-04-10 11:31:46', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(14, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 119.79, '2026-04-10 11:32:02', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(15, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 149.49, '2026-04-10 11:32:30', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(16, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Bizum', 45.05, '2026-04-10 11:46:38', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(17, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 46.53, '2026-04-10 11:47:17', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(18, 35, 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))', 'Tarjeta', 22.27, '2026-04-13 07:38:42', 'Pendiente', 'Calle Pepe, 39300, Torrelavega (España (IVA 10%))'),
(32, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Paypal', 0.00, '2026-04-15 07:59:01', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(33, 35, 'Calle Pepe, 39330, Torrelavega (España (IVA 10%))', 'Tarjeta', 25.30, '2026-04-15 08:08:55', 'Pendiente', 'Calle Pepe, 39330, Torrelavega (España (IVA 10%))'),
(34, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Paypal', 111.10, '2026-04-16 07:46:19', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))'),
(35, 35, 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))', 'Bizum', 111.10, '2026-04-16 07:47:43', 'Pendiente', 'calle jesucristo, 39300, Torrelavega (España (IVA 10%))');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE IF NOT EXISTS `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) NOT NULL,
  `categoria` varchar(50) DEFAULT 'clasica',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `imagen`, `categoria`) VALUES
(1, 'Tarta Clásica', 'Base de galleta y queso crema puro.', 22.50, 'img/tarta_clasica.png', 'clasica'),
(2, 'Tarta de Pistacho', 'Crema artesanal de pistacho 100%.', 26.00, 'img/tarta_pistacho.png', 'clasica'),
(3, 'Tarta Dulce de Loto', 'Con crema y galletas de loto belga.', 24.50, 'img/tarta_lotus.png', 'clasica'),
(4, 'Tarta de Arándanos', 'Cobertura de mermelada natural de arándanos.', 23.00, 'img/tarta_arandanos.png', 'clasica'),
(5, 'Tarta de Oreo', 'Base y trozos de galleta Oreo.', 25.00, 'img/tarta_oreo.png', 'clasica'),
(6, 'Tarta Clásica Sin Gluten', 'Nuestra receta tradicional adaptada con base de almendra molida. 100% libre de gluten certificado.', 25.50, 'img/clasica_sin_gluten.png', 'sin_gluten'),
(7, 'Tarta de Frambuesa Sin Gluten', 'Cremosa con cobertura de frambuesa natural. Base de avena certificada sin gluten.', 27.00, 'img/frambuesa_sin_gluten.png', 'sin_gluten'),
(8, 'Tarta de Limón Sin Gluten', 'Refrescante crema de limón sobre base de coco rallado y dátiles. Sin trigo ni derivados.', 26.50, 'img/limon_sin_gluten.png', 'sin_gluten'),
(9, 'Tarta Clásica Sin Azúcar', 'Elaborada con eritritol natural. Mismo sabor cremoso, sin azúcares añadidos. Apta para diabéticos.', 26.00, 'img/clasica_sin_azucar.png', 'sin_azucar'),
(10, 'Tarta de Frutos Rojos Sin Azúcar', 'Mezcla de fresas, arándanos y frambuesas frescas. Endulzada con stevia. Sin azúcar añadido.', 27.50, 'img/frutos_rojos_sin_azucar.png', 'sin_azucar'),
(11, 'Tarta de Vainilla Sin Azúcar', 'Vainilla de Madagascar con base de nuez. Endulzada con eritritol. Índice glucémico muy bajo.', 25.50, 'img/vainilla_sin_azucar.png', 'sin_azucar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos_usuario`
--

DROP TABLE IF EXISTS `puntos_usuario`;
CREATE TABLE IF NOT EXISTS `puntos_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `puntos` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unico_usuario` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `puntos_usuario`
--

INSERT INTO `puntos_usuario` (`id`, `usuario_id`, `puntos`) VALUES
(1, 35, 333);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `es_admin` tinyint(1) DEFAULT '0',
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `primera_compra` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `contrasena`, `es_admin`, `creado_en`, `primera_compra`) VALUES
(1, 'Admin', 'admin@cheesecakehouse.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1, '2026-03-05 08:55:04', 0),
(2, 'raul', 'raul@gmail', '$2y$10$D0KuqhBlH/jhWh.LDGkmEObZ3AMpUsgp1FE9DIUFu0hi7naH1UE3i', 0, '2026-03-05 10:27:46', 0),
(8, 'jairo', 'jairo@gmail.com', '$2y$10$o4eo0Psk8q1iMgm.bxTWLO7gAdK00H0CC.XSSvSSRePMDC24kj1/C', 0, '2026-03-20 11:53:08', 0),
(11, 'Jairo', 'jairo1@gmail.com', '$2y$10$3lFTCsn0XYAXfRo0tAdxNOoCnzv1RmEgdVj1T3dU1VUtLnnpn8nxO', 0, '2026-04-10 09:37:23', 0),
(35, 'Jairzinho', 'jairzinho@gmail.com', '$2y$10$2jAyFT2zdespGvdx3aO03uJoWBiq1HvWGEM8v2mmcPG/DdXVSjv6C', 0, '2026-04-10 11:28:06', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
CREATE TABLE IF NOT EXISTS `valoraciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `producto_id` int NOT NULL,
  `estrellas` tinyint(1) NOT NULL,
  `comentario` text,
  `creado_en` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unica_valoracion` (`usuario_id`,`producto_id`),
  KEY `producto_id` (`producto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `valoraciones`
--

INSERT INTO `valoraciones` (`id`, `usuario_id`, `producto_id`, `estrellas`, `comentario`, `creado_en`) VALUES
(1, 35, 3, 5, 'la mejor tarta que he probado en mi vida, increible', '2026-04-13 07:48:40'),
(2, 35, 2, 5, 'tarta innovadora, buenisima', '2026-04-13 07:59:51'),
(3, 35, 1, 4, 'increible', '2026-04-14 07:10:41'),
(4, 35, 8, 5, 'La mejor tarta para celiacos que he probado en mi vida', '2026-04-14 09:38:23');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `detalles_pedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalles_pedido_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `puntos_usuario`
--
ALTER TABLE `puntos_usuario`
  ADD CONSTRAINT `puntos_usuario_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD CONSTRAINT `valoraciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `valoraciones_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
