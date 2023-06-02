<?php
// Fetch the request data
$data = json_decode(file_get_contents('php://input'), true);
$artworkId = $data['PaintingID'];

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=art", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Increase the visit count
    $stmt = $conn->prepare('UPDATE paintings SET Visited = Visited + 1 WHERE PaintingID = :PaintingID');
    $stmt->execute([':PaintingID' => $artworkId]);

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
