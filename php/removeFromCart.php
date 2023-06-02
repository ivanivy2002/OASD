<?php
session_start();
$userId = $_SESSION['userId']; // change this to actual userId
$data = json_decode(file_get_contents('php://input'), true);
$itemId = $data['itemId'];

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=art", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('DELETE FROM cart WHERE userId = :userId AND PaintingID = :itemId');
    $stmt->execute([':userId' => $userId, ':itemId' => $itemId]);

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
