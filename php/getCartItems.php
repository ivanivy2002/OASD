<?php
session_start();
$userId = $_SESSION['userId']; // change this to actual userId

try {
    $conn = new PDO("mysql:host=localhost:3306;dbname=art", 'root', 'gansui');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare('SELECT paintings.* FROM cart INNER JOIN paintings ON cart.PaintingID = paintings.PaintingID WHERE cart.userId = :userId');
    $stmt->execute([':userId' => $userId]);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}

$conn = null;
