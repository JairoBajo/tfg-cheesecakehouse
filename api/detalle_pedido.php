<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$pedido_id = isset($_GET['pedido_id']) ? intval($_GET['pedido_id']) : 0;
if ($pedido_id < 1) {
    echo json_encode(['success' => false, 'message' => 'ID de pedido inválido']);
    exit;
}

$baseDatos = new BaseDatos();
$db = $baseDatos->getConnection();

// Obtener los productos del pedido con su nombre e imagen
$query = "SELECT dp.producto_id AS id, dp.cantidad, dp.precio_unitario AS precio, 
                 p.nombre, p.imagen
          FROM detalles_pedido dp
          JOIN productos p ON dp.producto_id = p.id
          WHERE dp.pedido_id = :pedido_id";

$stmt = $db->prepare($query);
$stmt->bindParam(':pedido_id', $pedido_id);
$stmt->execute();
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['success' => true, 'items' => $items]);
$db = null;
?>
