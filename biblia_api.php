
<?php
header("Content-Type: application/json; charset=UTF-8");
include "db_connect.php";

// Define o tipo de pedido (livros, capítulos, versículos, pesquisa)
$type = $_GET["type"] ?? "";

switch ($type) {
    case "livros":
        $result = $conn->query("SELECT id, nome FROM livros ORDER BY ordem ASC");
        $livros = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($livros);
        break;

    case "capitulos":
        $livro_id = intval($_GET["livro_id"] ?? 0);
        $result = $conn->query("SELECT id, numero FROM capitulos WHERE livro_id = $livro_id ORDER BY numero ASC");
        $caps = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($caps);
        break;

    case "versiculos":
        $cap_id = intval($_GET["cap_id"] ?? 0);
        $result = $conn->query("SELECT numero, texto FROM versiculos WHERE capitulo_id = $cap_id ORDER BY numero ASC");
        $versos = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($versos);
        break;

    case "pesquisa":
        $query = $conn->real_escape_string($_GET["q"] ?? "");
        $sql = "SELECT l.nome AS livro, c.numero AS cap, v.numero AS vers, v.texto
                FROM versiculos v
                JOIN capitulos c ON v.capitulo_id = c.id
                JOIN livros l ON c.livro_id = l.id
                WHERE v.texto LIKE '%$query%'
                LIMIT 50";
        $result = $conn->query($sql);
        $dados = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($dados);
        break;

    default:
        echo json_encode(["error" => "Pedido inválido."]);
}
$conn->close();
?>
