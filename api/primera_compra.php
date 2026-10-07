<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : 0;
if ($usuario_id < 1) {
    echo json_encode(['success' => false, 'es_primera' => false]);
    exit;
}

$baseDatos = new BaseDatos();
$db = $baseDatos->getConnection();
$stmt = $db->prepare("SELECT primera_compra FROM usuarios WHERE id = :uid");
$stmt->bindParam(':uid', $usuario_id);
$stmt->execute();
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$db = null;

// Si la columna no existe aún o vale 0 = es primera compra
echo json_encode(['success' => true, 'es_primera' => (!$row || $row['primera_compra'] == 0)]);
?>
