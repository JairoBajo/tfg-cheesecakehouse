<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

$datosRecibidos = json_decode(file_get_contents("php://input"));

if (!empty($datosRecibidos->nombre) && !empty($datosRecibidos->email) && !empty($datosRecibidos->password)) {
    require_once '../config/database.php';
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    // Comprueba si el email ya existe
    $queryCheck = "SELECT id FROM usuarios WHERE email = :email";
    $stmtCheck = $db->prepare($queryCheck);
    $stmtCheck->bindParam(":email", $datosRecibidos->email);
    $stmtCheck->execute();

    if ($stmtCheck->rowCount() > 0) {
        echo json_encode(["success" => false, "message" => "Este correo electrónico ya está registrado. Prueba a iniciar sesión."]);
        exit;
    }

    $passHash = password_hash($datosRecibidos->password, PASSWORD_BCRYPT);

    $query = "INSERT INTO usuarios (nombre, email, contrasena) VALUES (:nom, :email, :pass)";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":nom", $datosRecibidos->nombre);
    $stmt->bindParam(":email", $datosRecibidos->email);
    $stmt->bindParam(":pass", $passHash);

    try {
        if ($stmt->execute()) {
            $nuevoId = $db->lastInsertId();

            // --- Guardar también en data/usuarios.json ---
            $archivoJson = __DIR__ . '/../data/usuarios.json';
            $usuariosJson = [];
            if (file_exists($archivoJson)) {
                $contenido = file_get_contents($archivoJson);
                $decodificado = json_decode($contenido, true);
                if (is_array($decodificado)) {
                    $usuariosJson = $decodificado;
                }
            }
            $usuariosJson[] = [
                "id" => (int)$nuevoId,
                "nombre" => $datosRecibidos->nombre,
                "email" => $datosRecibidos->email,
                "contrasena" => $passHash,
                "es_admin" => false
            ];
            file_put_contents($archivoJson, json_encode($usuariosJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

            echo json_encode(["success" => true]);
            $cacheFile = '../config/cache_usuarios.json';
            if (file_exists($cacheFile)) unlink($cacheFile);
        } else {
            $errorInfo = $stmt->errorInfo();
            echo json_encode(["success" => false, "message" => "Error al registrar: " . $errorInfo[2]]);
        }
    } catch(PDOException $e) {
        echo json_encode(["success" => false, "message" => "Excepción: " . $e->getMessage()]);
    }

    $db = null;
} else {
    echo json_encode(["success" => false, "message" => "Por favor, rellena todos los campos."]);
}
?>
