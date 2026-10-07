<?php
session_start();
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

$datosRecibidos = json_decode(file_get_contents("php://input"));

if (!empty($datosRecibidos->identificador) && !empty($datosRecibidos->password)) {
    $autenticado = false;
    $usuarioAprobado = null;

    // --- Intento 1: Autenticar contra la base de datos ---
    require_once '../config/database.php';
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    if ($db) {
        // Busca el usuario por email o nombre en la base de datos
        $query = "SELECT id, nombre, email, contrasena, es_admin FROM usuarios WHERE email = :identificador OR nombre = :identificador2";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":identificador", $datosRecibidos->identificador);
        $stmt->bindParam(":identificador2", $datosRecibidos->identificador);
        $stmt->execute();

        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario && password_verify($datosRecibidos->password, $usuario['contrasena'])) {
            $autenticado = true;
            $usuarioAprobado = [
                "id"     => $usuario['id'],
                "nombre" => $usuario['nombre'],
                "email"  => $usuario['email'],
                "rol"    => ($usuario['es_admin'] == 1) ? "Administrador" : "Cliente"
            ];
        }
        $db = null;
    }

    // --- Intento 2: Fallback al archivo usuarios.json ---
    if (!$autenticado) {
        $archivoJson = __DIR__ . '/../data/usuarios.json';
        if (file_exists($archivoJson)) {
            $contenido = file_get_contents($archivoJson);
            $usuariosJson = json_decode($contenido, true);
            if (is_array($usuariosJson)) {
                foreach ($usuariosJson as $uJson) {
                    // Compara por email o nombre
                    $coincide = (
                        (isset($uJson['email']) && strtolower($uJson['email']) === strtolower($datosRecibidos->identificador)) ||
                        (isset($uJson['nombre']) && strtolower($uJson['nombre']) === strtolower($datosRecibidos->identificador))
                    );
                    if ($coincide && isset($uJson['contrasena'])) {
                        // Soporta contraseñas tanto hasheadas (bcrypt) como en texto plano
                        $passOk = false;
                        if (strpos($uJson['contrasena'], '$2y$') === 0 || strpos($uJson['contrasena'], '$2a$') === 0) {
                            $passOk = password_verify($datosRecibidos->password, $uJson['contrasena']);
                        } else {
                            $passOk = ($uJson['contrasena'] === $datosRecibidos->password);
                        }
                        if ($passOk) {
                            $autenticado = true;
                            $usuarioAprobado = [
                                "id"     => isset($uJson['id']) ? $uJson['id'] : 0,
                                "nombre" => $uJson['nombre'],
                                "email"  => isset($uJson['email']) ? $uJson['email'] : "",
                                "rol"    => (!empty($uJson['es_admin'])) ? "Administrador" : "Cliente"
                            ];
                            break;
                        }
                    }
                }
            }
        }
    }

    if ($autenticado && $usuarioAprobado) {
        echo json_encode(["success" => true, "user" => $usuarioAprobado]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas o usuario inexistente."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Por favor, rellena todos los campos."]);
}
?>

