<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$baseDatos = new BaseDatos();
$db = $baseDatos->getConnection();

// GET: obtener puntos de un usuario
if ($metodo === 'GET') {
    $usuario_id = isset($_GET['usuario_id']) ? intval($_GET['usuario_id']) : 0;
    $stmt = $db->prepare("SELECT puntos FROM puntos_usuario WHERE usuario_id = :uid");
    $stmt->bindParam(':uid', $usuario_id);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode(['success' => true, 'puntos' => $row ? intval($row['puntos']) : 0]);
}

// POST: sumar puntos tras pedido
if ($metodo === 'POST') {
    $datos = json_decode(file_get_contents('php://input'));
    if (!empty($datos->usuario_id) && isset($datos->puntos_ganados)) {
        $stmt = $db->prepare("INSERT INTO puntos_usuario (usuario_id, puntos) VALUES (:uid, :pts) ON DUPLICATE KEY UPDATE puntos = puntos + :pts2");
        $stmt->bindParam(':uid', $datos->usuario_id);
        $stmt->bindParam(':pts', $datos->puntos_ganados);
        $stmt->bindParam(':pts2', $datos->puntos_ganados);
        $stmt->execute();
        // Asegurar que los puntos no bajen de 0
        $db->exec("UPDATE puntos_usuario SET puntos = 0 WHERE puntos < 0 AND usuario_id = " . intval($datos->usuario_id));
        // Obtener total actualizado
        $stmt2 = $db->prepare("SELECT puntos FROM puntos_usuario WHERE usuario_id = :uid");
        $stmt2->bindParam(':uid', $datos->usuario_id);
        $stmt2->execute();
        $row = $stmt2->fetch(PDO::FETCH_ASSOC);
        echo json_encode(['success' => true, 'puntos_totales' => intval($row['puntos'])]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    }
}
$db = null;
?>
