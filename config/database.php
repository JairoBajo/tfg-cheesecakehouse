<?php
//CREADOR DE LA CONEXION

//Modulo de capa profunda que llama a los datos con usuario administrador
class BaseDatos {
    private $host = "localhost";
    private $db_name = "cheesecakehouse";
    private $username = "root";
    private $password = "";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            //Se une al servidor mysql obligando a codificar los caracteres españoles como la ñ
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Error de conexion: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>