<?php
$servername = "localhost"; 
$username = "sa"; 
$password = "santiagoperatta"; 
$database = "bajatuentrada";

$conn = new mysqli($servername, $username, $password, $database);

// Verificar si se recibió un número válido en la solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar si se recibió un número válido en el cuerpo de la solicitud
    if (isset($data['numero'])) {
        $numero = $data['numero'];

        // Realizar la conexión a la base de datos (ajusta los detalles según tu configuración)
        $conexion = new mysqli('localhost', 'usuario', 'contraseña', 'basededatos');

        // Verificar la conexión
        if ($conexion->connect_error) {
            die('Error de conexión: ' . $conexion->connect_error);
        }

        // Escapar el número para evitar inyección SQL
        $numeroEscapado = $conexion->real_escape_string($numero);

        // Consultar la base de datos para obtener los datos correspondientes al número
        $query = "SELECT * FROM tu_tabla WHERE id = $numeroEscapado";
        $resultado = $conexion->query($query);

        // Verificar si se encontraron resultados
        if ($resultado->num_rows > 0) {
            // Convertir los resultados a un array asociativo y enviarlos como JSON al cliente
            $datos = $resultado->fetch_assoc();
            echo json_encode($datos);
        } else {
            echo 'No se encontraron datos para el número especificado';
        }

        // Cerrar la conexión a la base de datos
        $conexion->close();
    } else {
        echo 'Número no válido';
    }
} else {
    echo 'Método de solicitud no permitido';
}
?>