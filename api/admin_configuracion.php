<?php
// GESTION ADMINISTRATIVA DE PARAMETRIZACION SISTEMICA

// Interfaz de control habilitada para la manipulacion de variables de cotizacion dinamica de productos.
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];

// EXTRACCION METODICA DE CONFIGURACIONES

// Emite una copia relacional completa de los parametros activos formateada para el serializador JSON.
if ($metodo === 'GET') {
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    // Ejecuta una extraccion plana vinculando el par clave-valor corporativo de la base de datos.
    $query = "SELECT id, clave, valor FROM configuracion ORDER BY id ASC";
    $stmt = $db->prepare($query);
    $stmt->execute();

    $configuraciones = [];
    // Itera secuencialmente los registros devueltos para estructurar una matriz multidimensional acotada.
    $dataFetch = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($dataFetch as $fila) {
        $configuraciones[] = $fila;
    }

    echo json_encode(["success" => true, "configuraciones" => $configuraciones]);
    $db = null;
}

// ALTERACION DINAMICA DE CONFIGURACIONES

// Aplica una variacion de estado sobre un parametro persistente especifico en la base de datos.
if ($metodo === 'PUT') {
    $datosRecibidos = json_decode(file_get_contents("php://input"));

    if (!empty($datosRecibidos->clave) && isset($datosRecibidos->valor)) {
        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();

        // Interpone una clausula pre-compilada vinculando las variables externas para mitigar vulnerabilidades.
        $query = "UPDATE configuracion SET valor = :valor WHERE clave = :clave";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":valor", $datosRecibidos->valor);
        $stmt->bindParam(":clave", $datosRecibidos->clave);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo actualizar la configuracion."]);
        }

        $db = null;
    } else {
        echo json_encode(["success" => false, "message" => "Datos incompletos para la actualizacion."]);
    }
}
?>
