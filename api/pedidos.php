<?php
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR | E_PARSE);

$datosRecibidos = file_get_contents("php://input");
$data = json_decode($datosRecibidos);

if (!empty($data->usuario_id) && !empty($data->items)) {
    require_once '../config/database.php';
    $baseDatos = new BaseDatos();
    $db = $baseDatos->getConnection();

    try {
        $db->beginTransaction();

        // Comprobar si es primera compra
        $esPrimera = false;
        try {
            $stmtCheck = $db->prepare("SELECT primera_compra FROM usuarios WHERE id = :uid");
            $stmtCheck->bindParam(":uid", $data->usuario_id);
            $stmtCheck->execute();
            $usr = $stmtCheck->fetch(PDO::FETCH_ASSOC);
            $esPrimera = ($usr && $usr['primera_compra'] == 0);
        } catch (Exception $e) {
            // La columna puede no existir todavía, ignorar
        }

        $queryPedido = "INSERT INTO pedidos (user_id, total_amount, direccion, direccion_envio, metodo_pago) VALUES (:user_id, :total, :dir, :dir2, :pago)";
        $stmtP = $db->prepare($queryPedido);
        $stmtP->bindParam(":user_id", $data->usuario_id);
        $stmtP->bindParam(":total",   $data->total);
        $stmtP->bindParam(":dir",     $data->direccion);
        $stmtP->bindParam(":dir2",    $data->direccion);
        $stmtP->bindParam(":pago",    $data->metodo_pago);
        $stmtP->execute();

        $pedido_id = $db->lastInsertId();

        $queryDetalle = "INSERT INTO detalles_pedido (pedido_id, producto_id, cantidad, precio_unitario) VALUES (:pid, :prod_id, :cant, :precio)";
        $stmtD = $db->prepare($queryDetalle);

        for ($i = 0; $i < count($data->items); $i++) {
            $item = $data->items[$i];
            // El id puede ser "1_pequena" si tiene tamaño — extraer solo la parte numérica
            $prod_id = intval($item->id);
            $stmtD->bindParam(":pid",     $pedido_id);
            $stmtD->bindParam(":prod_id", $prod_id);
            $stmtD->bindParam(":cant",    $item->cantidad);
            $stmtD->bindParam(":precio",  $item->precio);
            $stmtD->execute();
        }

        // Marcar primera compra como usada
        if ($esPrimera) {
            try {
                $stmtU = $db->prepare("UPDATE usuarios SET primera_compra = 1 WHERE id = :uid");
                $stmtU->bindParam(":uid", $data->usuario_id);
                $stmtU->execute();
            } catch (Exception $e) {}
        }

        $db->commit();

        $cacheFile = '../config/cache_pedidos.json';
        if (file_exists($cacheFile)) unlink($cacheFile);

        echo json_encode(["success" => true, "primera_compra" => $esPrimera]);

    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(["success" => false, "message" => "Error al procesar el pedido: " . $e->getMessage()]);
    }

    $db = null;
}
?>
