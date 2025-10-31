
<?php
header('Content-Type: application/json; charset=utf-8');

// ID fixo do canal do YouTube (coloca o teu aqui)
$channelId = 'UCvE6QtzRRlSevMCqs7iLj1w';  // <-- Este é o teu canal "Dantas pelo Mundo"

// Verifica se o ID está definido
if (!$channelId) {
    echo json_encode(['error' => 'Falta o parâmetro channel_id']);
    exit;
}

// Monta o URL do feed RSS
$url = "https://www.youtube.com/feeds/videos.xml?channel_id={$channelId}";

// Obtém o conteúdo XML do YouTube
$xml = @file_get_contents($url);

if ($xml === false) {
    echo json_encode(['error' => 'Não foi possível obter o feed do YouTube']);
    exit;
}

// Converte o XML em objeto
$feed = simplexml_load_string($xml, "SimpleXMLElement", LIBXML_NOCDATA);

// Converte XML em JSON
$json = json_encode($feed, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

echo $json;
