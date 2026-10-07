<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->usuario_id)) {
    require_once '../config/database.php';
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    $query = "SELECT id, total_amount, creado_en, metodo_pago, direccion, direccion_envio, estado 
              FROM pedidos WHERE user_id = :uid ORDER BY creado_en DESC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":uid", $data->usuario_id);
    $stmt->execute();

    $pedidos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["success" => true, "pedidos" => $pedidos]);
    $db = null;
} else {
    echo json_encode(["success" => false, "message" => "Usuario no identificado."]);
}
?>
