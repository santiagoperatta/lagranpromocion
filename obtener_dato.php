<?php
$servername = "localhost";
$username = "tclick";
$password = "paROrivo29";
$database = "tclick_bte";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['numero'])) {
        $numero = $data['numero'];
        $numeroEscapado = $conn->real_escape_string($numero);

		$query = "SELECT * FROM asociadosnew WHERE id_asociado = $numeroEscapado";
        $resultado = $conn->query($query);

        if ($resultado) {
            if ($resultado->num_rows > 0) {
                $datos = $resultado->fetch_assoc();
                echo json_encode($datos);
            } else {
                echo 'No se encontraron datos para el número especificado';
            }
        } else {
            echo 'Error en la consulta: ' . $conn->error;
        }
    } else {
        echo 'Número no válido';
    }
} else {
    echo 'Método de solicitud no permitido';
}

$conn->close();
?>