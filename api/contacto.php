<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);
require_once '../config/database.php';

$datos = json_decode(file_get_contents("php://input"));

if (!empty($datos->nombre) && !empty($datos->email) && !empty($datos->mensaje)) {
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    // El JS no envía asunto, usamos un valor por defecto
    $asunto = !empty($datos->asunto) ? $datos->asunto : 'Consulta desde la web';

    $query = "INSERT INTO mensajes_contacto (nombre, email, asunto, mensaje) VALUES (:nombre, :email, :asunto, :mensaje)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":nombre",  $datos->nombre);
    $stmt->bindParam(":email",   $datos->email);
    $stmt->bindParam(":asunto",  $asunto);
    $stmt->bindParam(":mensaje", $datos->mensaje);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "No se pudo guardar el mensaje."]);
    }
    $db = null;
} else {
    echo json_encode(["success" => false, "message" => "Por favor rellena todos los campos."]);
}
?>
