<?php
//GESTION ADMINISTRATIVA DE PRODUCTOS

//Endpoint que permite al administrador modificar y eliminar productos del catalogo
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

require_once '../config/database.php';

$metodo = $_SERVER['REQUEST_METHOD'];

//MODIFICAR UN PRODUCTO

//Actualiza el nombre, la descripcion y el precio de un producto existente
if ($metodo === 'PUT') {
    $datosRecibidos = json_decode(file_get_contents("php://input"));

    if (!empty($datosRecibidos->id) && !empty($datosRecibidos->nombre) && !empty($datosRecibidos->descripcion) && isset($datosRecibidos->precio)) {
        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();

        //Sentencia preparada que protege todos los campos contra inyeccion
        $query = "UPDATE productos SET nombre = :nombre, descripcion = :descripcion, precio = :precio WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":nombre", $datosRecibidos->nombre);
        $stmt->bindParam(":descripcion", $datosRecibidos->descripcion);
        $stmt->bindParam(":precio", $datosRecibidos->precio);
        $stmt->bindParam(":id", $datosRecibidos->id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo actualizar el producto."]);
        }

        $cacheFile = '../config/cache_productos.json';
        if (file_exists($cacheFile)) {
            unlink($cacheFile);
        }

        $db = null;
    } else {
        echo json_encode(["success" => false, "message" => "Datos incompletos para la actualizacion."]);
    }
}

//ELIMINAR UN PRODUCTO

//Borra el producto indicado por su identificador de la tabla productos
if ($metodo === 'DELETE') {
    $datosRecibidos = json_decode(file_get_contents("php://input"));

    if (!empty($datosRecibidos->id)) {
        $baseDatos = new BaseDatos();
        $db = $baseDatos->getConnection();

        //Sentencia preparada para borrar el registro de forma segura
        $query = "DELETE FROM productos WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $datosRecibidos->id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "message" => "No se pudo eliminar el producto."]);
        }

        $cacheFile = '../config/cache_productos.json';
        if (file_exists($cacheFile)) {
            unlink($cacheFile);
        }

        $db = null;
    } else {
        echo json_encode(["success" => false, "message" => "Falta el identificador del producto."]);
    }
}
?>
