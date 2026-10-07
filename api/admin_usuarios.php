<?php
// GESTION ADMINISTRATIVA SECULAR DE USUARIOS

// Controlador backend habilitado para la manipulacion CRUD integral del directorio corporativo de clientes.
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];

// EXTRACCION DE CENSO DE USUARIOS

// Retorna una matriz comprensiva de todos los perfiles matriculables vinculados a la aplicacion actual.
if ($metodo === 'GET') {
    function getData() {
        $cacheFile = '../config/cache_usuarios.json';
        if (file_exists($cacheFile)) {
            $jsonContent = file_get_contents($cacheFile);
            $data = json_decode($jsonContent, true);
            if ($data !== null) {
                return $data;
            }
        }

        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();

        $query = "SELECT id, nombre, email, es_admin, creado_en FROM usuarios ORDER BY id ASC";
        $stmt = $db->prepare($query);
        $stmt->execute();

        $dataFetch = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $usuarios = array();

        // Itera la respuesta en bloque del controlador SQL inyectando los registros contiguos de memoria.
        foreach ($dataFetch as $fila) {
            $usuarios[] = $fila;
        }

        file_put_contents($cacheFile, json_encode($usuarios));
        $db = null; // Ejecuta el cierre anticipado minimizando la carga de ram conectiva del motor.

        return $usuarios;
    }

    echo json_encode(["success" => true, "usuarios" => getData()]);
}

// ELIMINACION SUPERVISADA DE USUARIO

// Suprime definitivamente las credenciales del cliente especificadas discriminadas por su clave foranea iterada.
if ($metodo === 'DELETE') {
    $datosRecibidos = json_decode(file_get_contents("php://input"));

    if (!empty($datosRecibidos->id)) {
        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();

        // Interpone una compilacion parametrizada limitando severamente la vulnerabilidad transversal por inyeccion.
        $query = "DELETE FROM usuarios WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $datosRecibidos->id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo eliminar el usuario."]);
        }

        $cacheFile = '../config/cache_usuarios.json';
        if (file_exists($cacheFile)) {
            unlink($cacheFile);
        }

        $db = null;
    } else {
        echo json_encode(["success" => false, "message" => "Falta el identificador del usuario."]);
    }
}

// ACTUALIZACION DE ATRIBUTOS PERSONALES

// Modifica bidireccionalmente las variables abstractas de nombre y correo identificando al objeto cliente.
if ($metodo === 'PUT') {
    $datosRecibidos = json_decode(file_get_contents("php://input"));

    if (!empty($datosRecibidos->id) && !empty($datosRecibidos->nombre) && !empty($datosRecibidos->email)) {
        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();

        // Vincula dinamicamente las variables pre-compiladas protegiendo la manipulacion externa de estado original.
        $query = "UPDATE usuarios SET nombre = :nombre, email = :email WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":nombre", $datosRecibidos->nombre);
        $stmt->bindParam(":email", $datosRecibidos->email);
        $stmt->bindParam(":id", $datosRecibidos->id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo actualizar el usuario."]);
        }

        $cacheFile = '../config/cache_usuarios.json';
        if (file_exists($cacheFile)) {
            unlink($cacheFile);
        }

        $db = null;
    } else {
        echo json_encode(["success" => false, "message" => "Datos incompletos para la actualizacion."]);
    }
}
?>
