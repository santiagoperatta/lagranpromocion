<?php
$servername = "localhost";
$username = "tclick";
$password = "paROrivo29";
$database = "tclick_bte";

// Crear la conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

// Verificar si la conexión se estableció correctamente
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['numero'])) {
        $numero = $data['numero'];
        $numeroEscapado = $conn->real_escape_string($numero);

        $query = "SELECT * FROM asociados WHERE id_asociado = $numeroEscapado";
        $resultado = $conn->query($query);

        // Verificar si se encontraron resultados
        if ($resultado) {
            if ($resultado->num_rows > 0) {
                // Convertir los resultados a un array asociativo y enviarlos como JSON al cliente
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