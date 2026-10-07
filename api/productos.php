<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

require_once '../config/database.php';

function getData() {
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    $query = "SELECT id, nombre, descripcion, precio, imagen, categoria FROM productos";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $productos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $db = null;
    return $productos;
}

echo json_encode(getData());
?>
