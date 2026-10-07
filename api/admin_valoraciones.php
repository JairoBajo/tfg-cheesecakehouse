<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$baseDatos = new BaseDatos();
$db = $baseDatos->getConnection();

if ($metodo === 'GET') {
    $query = "SELECT v.id, v.estrellas, v.comentario, v.creado_en,
                     u.nombre AS nombre_usuario, u.email AS email_usuario,
                     p.nombre AS nombre_producto
              FROM valoraciones v
              JOIN usuarios u ON v.usuario_id = u.id
              JOIN productos p ON v.producto_id = p.id
              ORDER BY v.creado_en DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $valoraciones = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "valoraciones" => $valoraciones]);
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

$db = null;
?>
