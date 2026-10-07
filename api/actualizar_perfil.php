<?php
// CONTROLADOR DE ALTERACION DEL PERFIL DE USUARIO

// Opera modificaciones atributivas sobre entidades de usuario consolidadas en el esquema relacional.
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

$data = json_decode(file_get_contents("php://input"));

// Impone una validacion cruzada sobre las componentes criticas mitigando peticiones defectuosas.
if (!empty($data->id) && !empty($data->nombre) && !empty($data->email)) {
    require_once '../config/database.php';
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    $passHash = null;
    if (!empty($data->password)) {
        // Ejecuta un algoritmo de derivacion criptografica bcrypt exclusivamente ante deteccion de parametro activo.
        $passHash = password_hash($data->password, PASSWORD_BCRYPT);
    }

    // Bifurca el control de flujo transaccional en funcion de la inclusion de un salto criptografico concurrente.
    if ($passHash != null) {
        $stmt = $db->prepare("UPDATE usuarios SET nombre = :nombre, email = :email, contrasena = :pass WHERE id = :id");
        $stmt->bindParam(":pass", $passHash);
    } else {
        $stmt = $db->prepare("UPDATE usuarios SET nombre = :nombre, email = :email WHERE id = :id");
    }
    
    $stmt->bindParam(":nombre", $data->nombre);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":id", $data->id);
    
    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
        
        $cacheFile = '../config/cache_usuarios.json';
        if (file_exists($cacheFile)) {
            unlink($cacheFile);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error concurrente en transaccion de alteracion MySQL."]);
    }
    $db = null;
} else {
    echo json_encode(["success" => false, "message" => "Parametrizacion defectuosa. Imposible operar cambio."]);
}
?>