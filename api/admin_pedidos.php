<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];

if ($metodo === 'GET') {
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    $query = "SELECT p.id, p.total_amount, p.direccion, p.metodo_pago, p.creado_en, 
                     p.estado, u.nombre AS nombre_cliente, u.email AS email_cliente 
              FROM pedidos p 
              LEFT JOIN usuarios u ON p.user_id = u.id 
              ORDER BY p.creado_en DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Limpiar cache
    $cacheFile = '../config/cache_pedidos.json';
    file_put_contents($cacheFile, json_encode($pedidos));

    echo json_encode(["success" => true, "pedidos" => $pedidos]);
    $db = null;
}

// Actualizar estado de un pedido
if ($metodo === 'PUT') {
    $datos = json_decode(file_get_contents("php://input"));
    if (!empty($datos->id) && !empty($datos->estado)) {
        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();
        $stmt = $db->prepare("UPDATE pedidos SET estado = :estado WHERE id = :id");
        $stmt->bindParam(":estado", $datos->estado);
        $stmt->bindParam(":id",     $datos->id);
        if ($stmt->execute()) {
            $cacheFile = '../config/cache_pedidos.json';
            if (file_exists($cacheFile)) unlink($cacheFile);
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo actualizar el estado."]);
        }
        $db = null;
    }
}
?>
