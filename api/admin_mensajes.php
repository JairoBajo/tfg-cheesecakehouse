<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

// Solo se permiten peticiones GET
$metodo = $_SERVER['REQUEST_METHOD'];
$baseDatos = new BaseDatos();
$db = $baseDatos->getConnection();

if ($metodo === 'GET') {
    $query = "SELECT id, nombre, email, asunto, mensaje, creado_en FROM mensajes_contacto ORDER BY creado_en DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $mensajes = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "mensajes" => $mensajes]);
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

$db = null;
?>
