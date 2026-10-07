<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];
$baseDatos = new BaseDatos();
$db = $baseDatos->getConnection();

// GET: obtener valoraciones de un producto
if ($metodo === 'GET') {
    $producto_id = isset($_GET['producto_id']) ? intval($_GET['producto_id']) : 0;
    $stmt = $db->prepare("SELECT v.estrellas, v.comentario, v.creado_en, u.nombre FROM valoraciones v JOIN usuarios u ON v.usuario_id = u.id WHERE v.producto_id = :pid ORDER BY v.creado_en DESC");
    $stmt->bindParam(':pid', $producto_id);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total = count($rows);
    $media = $total > 0 ? round(array_sum(array_column($rows, 'estrellas')) / $total, 1) : 0;
    echo json_encode(['success' => true, 'valoraciones' => $rows, 'media' => $media, 'total' => $total]);
}

// POST: guardar valoracion
if ($metodo === 'POST') {
    $datos = json_decode(file_get_contents('php://input'));
    if (!empty($datos->usuario_id) && !empty($datos->producto_id) && !empty($datos->estrellas)) {
        try {
            $stmt = $db->prepare("INSERT INTO valoraciones (usuario_id, producto_id, estrellas, comentario) VALUES (:uid, :pid, :est, :com) ON DUPLICATE KEY UPDATE estrellas=:est2, comentario=:com2");
            $stmt->bindParam(':uid', $datos->usuario_id);
            $stmt->bindParam(':pid', $datos->producto_id);
            $stmt->bindParam(':est', $datos->estrellas);
            $stmt->bindParam(':com', $datos->comentario);
            $stmt->bindParam(':est2', $datos->estrellas);
            $stmt->bindParam(':com2', $datos->comentario);
            $stmt->execute();
            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
    }
}
$db = null;
?>
