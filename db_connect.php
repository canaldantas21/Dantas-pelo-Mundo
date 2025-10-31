
<?php
// =======================================
// 📘 Ligação à Base de Dados
// =======================================
$host = "localhost";      // Servidor
$user = "root";           // Utilizador (muda se necessário)
$pass = "";               // Palavra-passe
$db   = "biblia_db";      // Nome da base de dados

$conn = new mysqli($host, $user, $pass, $db);

// Verifica ligação
if ($conn->connect_error) {
    die(json_encode(["error" => "Falha na ligação: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");
?>
